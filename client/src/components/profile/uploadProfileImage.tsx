import styled from "styled-components";
import { useState } from "react";
import { requestHandler } from "../../utils";
import { authApi } from "../../api";

interface Props {
  profilePic: string;
}

export const UploadProfileImage: React.FC<Props> = ({ profilePic }) => {
  const [userProfilePic, setUserProfilePic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    setFileToBase64(file);
    await requestHandler(
      async () => await authApi.uploadProfile(userProfilePic),
      setIsLoading,
      (data) => console.log(data),
      (error) => console.log(error)
    );
  };

  const setFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUserProfilePic(reader.result as string);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  return (
    <Container>
      <div className="conatnier">
        <h1>Upload Profile Image</h1>
        <div className="content">
          <div className="image">
            <img src={profilePic || userProfilePic} alt="profile" />
          </div>
          <div className="form">
            <form>
              <label htmlFor="profilePic">Browse Image</label>
              <input
                type="file"
                hidden
                id="profilePic"
                onChange={(e) => setUserProfilePic(e.target.files[0])}
                name="profilePic"
              />
              <button onClick={}>Upload</button>
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
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: #00000040;
  backdrop-filter: blur(5px);

  .conatnier {
    width: 50%;
    height: 50%;
    background-color: #242323;
    margin: 10% auto;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 10px #00000040;

    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;

      @media screen and (max-width: 800px) {
        flex-direction: column;
      }

      .image {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background-color: #f3f3f3;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @media screen and (max-width: 800px) {
          width: 100px;
          height: 100px;
        }
      }

      .form {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        form {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          label {
            padding: 1rem 2rem;
            background-color: #f3f3f3;
            color: #242323;
            border-radius: 5px;
            cursor: pointer;
          }

          button {
            padding: 1rem 2rem;
            background-color: #f3f3f3;
            color: #242323;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 1rem;
          }
        }
      }
    }
  }
`;
