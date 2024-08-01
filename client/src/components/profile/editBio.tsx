import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { authApi } from "../../api";
import { requestHandler } from "../../utils";
import { UserInterface } from "../../interfaces/user";

// props for the EditUserBio component
export interface EditUserBioProps {
  setStreamer: (streamer: UserInterface) => void;
  setEditBio: (editBio: boolean) => void;
  streamer: UserInterface;
}

interface MyObject {
  [key: string]: MyObject | string;
}



export const EditUserBio: React.FC<EditUserBioProps> = ({
  setEditBio,
  setStreamer,
  streamer,
}) => {
  const { user } = useAuth();
  // const [isLoading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    fullName: streamer?.fullName,
    username: streamer?.username,
    profession: streamer?.profession,
    bio: streamer?.bio,
    password: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 200) {
      setUserData({ ...userData, bio: inputValue });
    }
  };

  function removeEmpty(obj: MyObject) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] && typeof obj[key] === "object") removeEmpty(obj[key] as MyObject);
      else if (obj[key] === "") delete obj[key];
    });
  }

 

  const handleSave = async () => {
    try {
      removeEmpty(userData);
      await requestHandler(
        async () => await authApi.updateUserData(user?._id as string, userData),
        null,
        (response) => {
          setEditBio(false);
          setStreamer(response.data as UserInterface);
        },
        (error: string) => {
          console.log(error);
          toast.error("Error Occured, Please try again");
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
          <h2>Edit My Info</h2>
          <IoMdClose onClick={() => setEditBio(false)} size={30} color="#fff" />
        </div>
        <div className="editFullname">
          <input onChange={handleOnChange} name="fullName" type="text" placeholder={user?.fullName} value={userData.fullName}/>
        </div>
        <div className="editusername">
          <input onChange={handleOnChange}  name="username" type="text" placeholder={user?.username} value={userData.username}/>
        </div>
        <div  className="editProfession">
          <input onChange={handleOnChange} name="profession" type="text" placeholder={user?.profession} value={userData.profession}/>
        </div>
        <div  className="editpassword">
          <input onChange={handleOnChange} name="password" type="password" placeholder="Enter new password" value={userData.password}/>
        </div>
        <div className="bioTextArea">
          <textarea
            name="bio"
            onChange={handleBioChange}
            value={userData.bio}
            placeholder="Tell us about yourself"
          ></textarea>
        </div>
        <div className="footer">
          <p>Characters left: {userData.bio?.length}/200</p>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
      {/* <ToastContainer /> */}
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
  background-color: #00000093;
  backdrop-filter: blur(5px);

  > div {
    position: relative;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .4rem;
    width: 300px;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      > *:nth-child(2) {
        cursor: pointer;
      }
    }

    > div {      
      position: relative; 
      width: 100%;


      input,
      textarea {
        position: relative;
        width: 100%;
        padding:1rem;
        background-color: #201f1fbf;
        color: #fff;
        font-family: inherit;
        outline: none;
        border: none;
        font-family: inherit;
        border-left: 5px solid red;
      }
    }

    .edit-bio {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 10px;
    }

    textarea {
      height: 100px;
      resize: none;
    }

    button {
      padding: 10px 20px;
      background-color: #a50808;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;
