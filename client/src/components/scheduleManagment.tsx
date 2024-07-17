import { FC } from "react";
import styled from "styled-components";
import { TfiTimer } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

interface ScheduleManagmentProps {
  event: Event;
  manageSchedule: boolean;
  setManageSchedule: (value: boolean) => void;
}

export const ScheduleManagment: FC<ScheduleManagmentProps> = ({
  event,
  manageSchedule,
  setManageSchedule,
}) => {
  return (
    <Container>
      <div className="scheduleContainer">
        <h1>Schedule Managment</h1>
        <div className="close">
          <IoMdClose onClick={() => setManageSchedule(false)} />
        </div>
        <div className="container">
          <div className="currentScheduleList">
            <h2>Current Schedule</h2>
            <div className="scheduleList">
              <div className="schedule">
                <div className="Scheduleheader">
                  <h3>
                    <TfiTimer />
                    10:00am - 11:00am
                  </h3>
                  <div className="actions">
                    <CiEdit />
                    <MdDeleteOutline />
                  </div>
                </div>
                <p>Introduction to Python</p>
              </div>
              <div className="schedule">
                <div className="Scheduleheader">
                  <h3>
                    <TfiTimer />
                    11:00am - 12:00pm
                  </h3>
                  <div className="actions">
                    <CiEdit />
                    <MdDeleteOutline />
                  </div>
                </div>
                <p>Introduction to React</p>
              </div>
              <div className="schedule">
                <div className="Scheduleheader">
                  <h3>
                    <TfiTimer />
                    12:00pm - 1:00pm
                  </h3>
                  <div className="actions">
                    <CiEdit />
                    <MdDeleteOutline />
                  </div>
                </div>
                <p>Introduction to Node.js</p>
              </div>
              <div className="schedule">
                <div className="Scheduleheader">
                  <h3>
                    <TfiTimer />
                    1:00pm - 2:00pm
                  </h3>
                  <div className="actions">
                    <CiEdit />
                    <MdDeleteOutline />
                  </div>
                </div>
                <p>Introduction to Express.js</p>
              </div>
              <div className="schedule">
                <div className="Scheduleheader">
                  <h3>
                    <TfiTimer />
                    2:00pm - 3:00pm
                  </h3>
                  <div className="actions">
                    <CiEdit />
                    <MdDeleteOutline />
                  </div>
                </div>
                <p>Introduction to MongoDB</p>
              </div>
              <div className="schedule">
                <div className="Scheduleheader">
                  <h3>
                    <TfiTimer />
                    3:00pm - 4:00pm
                  </h3>
                  <div className="actions">
                    <CiEdit />
                    <MdDeleteOutline />
                  </div>
                </div>
                <p>Introduction to SQL</p>
              </div>
            </div>
          </div>
          <div className="addNewSchedule">
            <h2>Add New Schedule</h2>
            <form action="">
              <input type="text" placeholder="e.g 10:00 AM - 10:30 AM" />
              <textarea
                name=""
                rows={7}
                id=""
                placeholder="Enter Schedule Description"
              ></textarea>
              <button>Add Schedule</button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
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
      background-color: red;
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

          .Scheduleheader{
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

          button {
            padding: 10px;
            border: none;
            border-radius: 5px;
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
