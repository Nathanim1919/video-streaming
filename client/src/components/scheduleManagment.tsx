import { FC, useState } from "react";
import styled from "styled-components";
import { TfiTimer } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { addSchedule, editSchedule } from "../api/event";
import { addStreamSchedule, editStreamSchedule } from "../api/stream";
import { requestHandler } from "../utils";
import { Event } from "../interfaces/event";
import { FaPlus } from "react-icons/fa";
import Loader from "./Loader";

interface ScheduleManagmentProps {
  event: Event;
  manageSchedule: boolean;
  setManageSchedule: (value: boolean) => void;
}

export const ScheduleManagment: FC<ScheduleManagmentProps> = ({
  event,
  setManageSchedule,
}) => {
  const [time, setTime] = useState("");
  const [activity, setActivity] = useState("");
  const [scheduleIndex, setScheduleIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddSchedule = async () => {
    const endPoint = event.isOnline ? addStreamSchedule : addSchedule;
    await requestHandler(
      async () => await endPoint(event._id, { time, activity }),
      setIsLoading,
      (res) => {
        setActivity("");
        setTime("");
        event.schedule.push({ time, activity });
        alert(res.message);
      },
      (error) => {
        alert(error);
      }
    );
  };

  const handleEditSchedule = async (index: number) => {
    const updatedSchedule = event.schedule.map((schedule, i) => {
      if (i === index) {
        return { time, activity };
      }
      return schedule;
    });
    const endPoint = !event.isOnline ? editSchedule : editStreamSchedule;
    await requestHandler(
      async () => await endPoint(event._id, updatedSchedule),
      setIsLoading,
      (res) => {
        event.schedule = updatedSchedule;
        alert(res.message);
      },
      (error) => {
        alert(error);
      }
    );
  };

  const populateSchduleDataForEdit = (
    item: { time: string; activity: string },
    index: number
  ) => {
    setTime(item.time);
    setActivity(item.activity);
    setIsEditing(true);
    setScheduleIndex(index);
  };

  return (
    <Container isEditing={isEditing}>
      <div className="scheduleContainer">
        <h1>Schedule Managment</h1>
        <div className="close">
          <IoMdClose onClick={() => setManageSchedule(false)} />
        </div>
        <div className="container">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="currentScheduleList">
              <div className="scheduleList">
                {event.schedule?.map((item, index) => (
                  <div className="schedule">
                    <div className="Scheduleheader">
                      <h3>
                        <TfiTimer />
                        {item.time}
                      </h3>
                      <div className="actions">
                        <CiEdit
                          onClick={() =>
                            populateSchduleDataForEdit(item, index)
                          }
                        />
                        <MdDeleteOutline />
                      </div>
                    </div>
                    <p>{item.activity}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="addNewSchedule">
            <h2>{!isEditing ? "Add New" : "Edit"} Schedule</h2>
            <form action="">
              <input
                onChange={(e) => setTime(e.target.value)}
                type="text"
                value={time}
                placeholder="e.g 10:00 AM - 10:30 AM"
              />
              <textarea
                name=""
                rows={7}
                value={activity}
                id=""
                placeholder="Enter Schedule Description"
                onChange={(e) => setActivity(e.target.value)}
              ></textarea>
              <div className="btns">
                <button
                  type="button"
                  onClick={
                    isEditing
                      ? () => handleEditSchedule(scheduleIndex)
                      : handleAddSchedule
                  }
                >
                  {isEditing ? "Edit" : "Add"} Schedule
                </button>
                {isEditing && (
                  <FaPlus
                    onClick={() => {
                      setIsEditing(false);
                      setActivity("");
                      setTime("");
                    }}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};


interface ContainerProps {
  isEditing: boolean;
}

const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000022;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);

  > * {
    margin: 0;
  }

  .scheduleContainer {
    width: 80%;
    height: 80%;
    background-color: #212020;
    border-radius: 10px;
    color: #fff;
    position: relative;
    animation: animate 0.3s ease;

    @keyframes animate {
      from {
        transform: translateY(30%);
      }
      to {
        transform: translateY(0%);
      }
    }

    .close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 10px;
      cursor: pointer;
      font-size: 2rem;
    }

    > h1 {
      text-align: center;
      padding: 20px;
      font-size: 1.5rem;
      border-bottom: 1px solid #333131;
      /* background-color: red; */
    }

    .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-content: space-between;
      overflow: hidden;
      height: 100%;

      .currentScheduleList {
        height: 80%;
        overflow-y: auto;

        h2 {
          text-align: center;
          padding: 10px;
          position: sticky;
          top: 0;

          background-color: #212020;
          border-bottom: 1px solid #333131;
        }

        .scheduleList {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-top: 20px;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 0 0.5rem;
        }

        .schedule {
          background-color: #161515;
          border-radius: 5px;
          box-shadow: 0 0 5px #0000001c;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;

          .Scheduleheader {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
            border-bottom: 1px solid #333131;
            h3 {
              display: flex;
              align-items: center;
              gap: 5px;
              width: 100%;
              padding: 0.7rem;
              margin: 0;
            }

            .actions {
              display: flex;
              gap: 10px;
              padding: 0.7rem;
              margin: 0;
              font-size: 1.2rem;

              svg {
                cursor: pointer;
                padding: 7px;
                background-color: #2e2c2c;
                border-radius: 50%;

                &:hover {
                  background-color: #3e3c3c;
                }
              }
            }
          }

          p {
            margin: 0;
            padding: 1rem;
            color: #a8a1a1;
          }
        }
      }

      .addNewSchedule {
        height: 100%;

        h2 {
          text-align: center;
          padding: 10px;
          position: sticky;
          top: 0;
          background-color: #212020;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 50%;
          margin: 0 auto;

          input {
            padding: 10px;
            border: none;
            border-radius: 5px;
            box-shadow: 0 0 5px #0000001c;
            background-color: #1c1717;
            font-family: inherit;
            color: #fff;
          }

          textarea {
            padding: 10px;
            border: none;
            border-radius: 5px;
            box-shadow: 0 0 5px #0000001c;
            background-color: #1c1717;
            resize: none;
            color: #fff;
          }

          .btns {
            display: grid;
            // lets use isEditing as props
            grid-template-columns: ${(props) =>
              props.isEditing ? "1fr .1fr" : "1fr"};
            align-items: center;
            gap: 0.3rem;
            width: 100%;

            > svg {
              background-color: #fff;
              color: #333;
              padding: 10px;
              cursor: pointer;

              &:hover {
                background-color: #eee;
              }
            }
          }

          button {
            padding: 10px;
            border: none;
            /* border-radius: 5px; */
            background-color: #d02a2a;
            box-shadow: 0 0 5px #3130301c;
            cursor: pointer;
            color: #fff;
          }
        }
      }
    }
  }
`;
