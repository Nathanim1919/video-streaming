import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { requestHandler } from "../../utils";
import { authApi } from "../../api";
import Loader from "../Loader";
import { IoMdClose } from "react-icons/io";

interface Props {
  profilePic: string;
  setUploadProfile: (value: boolean) => void;
}

export const UploadProfileImage: React.FC<Props> = ({
  setUploadProfile,
  profilePic,
}) => {
  const [userProfilePic, setUserProfilePic] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(profilePic); // Use state to hold the preview URL
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  // use form data to upload image
  const formData = new FormData();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Cleanup URL.createObjectURL
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const handleProfilePicUpload = async (e: React.ChangeEvent<HTMLInputElement>, file: File) => {
    // const file = e.target.files && e.target.files[0];
    e.preventDefault();
    console.log("Selected Image is: ", file);
    if (file) {
      formData.append("profileImage", file);
      setUserProfilePic(file);
    }
    await requestHandler(
      async () => await authApi.uploadProfile(formData),
      setIsLoading,
      (data) => {
        console.log(data);
        // setUploadProfile(false);
        // set progress
        setUploadProgress(100);
      },
      (error) => console.log(error)
    );
  };

  // const setFileToBase64 = (file: File) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setUserProfilePic(reader.result);
  //   };
  //   reader.onerror = (error) => {
  //     console.log("Error: ", error);
  //   };
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setUserProfilePic(file);
      const fileUrl = URL.createObjectURL(file);
      setImagePreviewUrl(fileUrl); // Set the created URL for preview
    }
  };

  return (
    <Container>
      <div className="conatnier">
        <div className="header">
          <h1>Upload Profile Image</h1>
          <div className="close" onClick={() => setUploadProfile(false)}>
            <IoMdClose />
          </div>
        </div>
        <div className="content">
          <div className="image">
            <img src={imagePreviewUrl || profilePic} alt="profile" />
          </div>
          <div className="form">
            <form
              encType="multipart/form-data"
              onSubmit={(e) =>
                userProfilePic && handleProfilePicUpload(e, userProfilePic)
              }
            >
              <label htmlFor="profilePic">Browse Image</label>
              <input
                type="file"
                hidden
                id="profilePic"
                onChange={handleFileChange}
                name="profileImage"
              />
              <button type="submit">Upload</button>{" "}
            </form>
           {isLoading && <div className="progress">
              <h2>Uploading....</h2>
            </div>}
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
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1 {
        color: #f3f3f3;
        font-size: 1.3rem;
      }

      .close {
        cursor: pointer;
        color: #f3f3f3;
        font-size: 1.5rem;
        width: 30px;
        height: 30px;
        display: grid;
        place-items: center;
        background-color: #333;
        border-radius: 50%;
      }
    }

    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;

      @media screen and (max-width: 800px) {
        flex-direction: column;
      }

      .progress {
        width: 100%;
        height: 10px;
        background-color: #f3f3f3;
        border-radius: 5px;
        overflow: hidden;

        .inner {
          height: 100%;
          background-color: blue;
        }
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
        flex-direction: column;

        > * {
          margin: 1rem 0;
          width: 100%;
        }

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
