import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { ToastContainer } from 'react-toastify';
import { IoMdClose } from "react-icons/io";

// props for the EditUserBio component
export interface EditUserBioProps {
    userBio: string;
    setEditBio: (editBio: boolean) => void;
}


export const EditUserBio: React.FC<EditUserBioProps> = ({userBio, setEditBio}) => {
  const { user } = useAuth();
  const [bio, setBio] = useState(user?.bio);
  const [loading, setLoading] = useState(false);

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 200) {
      setBio(inputValue);
    }
  };

  const handleSave = async () => {
    try {
      await requestHandler(
        async () => await authApi.updateUserBio(bio),
        setLoading,
        (response) => {
          console.log(response);
          toast.success(response.data.message);
        },
        (error) => {
          console.log(error);
          toast.error(error.response.data.message);
        }
      );
    } catch (error) {
      toast.error("An error occurred");
      console.log(error);
    }
  };

  return (
    <Conatiner className="edit-bio">
      <div className="box">
        <div className="header">
            <h2>Edit Bio</h2>
            <IoMdClose onClick={() => setEditBio(false)} size={30} color="#fff" />
        </div>
        <div className="bioTextArea">
          <textarea
            value={bio}
            onChange={handleBioChange}
            placeholder="Tell us about yourself"
          ></textarea>
          <div className="footer">
            <p>Characters left: {bio?.length}/200</p>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
<ToastContainer />
    </Conatiner>
  );
};

const Conatiner = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: grid;
  place-items: center;
  top: 0;
  left: 0;
  background-color: #00000056;
  backdrop-filter: blur(5px);

  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;

    >*:nth-child(2){
        cursor: pointer;
    }
  }

  > div {
    padding: 20px;
    border-radius: 10px;
    width: 40%;

    .edit-bio {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }

    .bioTextArea {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;

      .footer{
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 10px;
      }
    }

    textarea {
      width: 100%;
      height: 100px;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
      border: 1px solid #6e0606;
      background-color: #000;
      color: #fff;
      font-family: inherit;
      resize: none;
      outline: none;
    }

    button {
      padding: 10px 20px;
      background-color: #000;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;
