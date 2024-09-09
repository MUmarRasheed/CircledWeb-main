import { Form, useActionData, useNavigation } from "react-router-dom";
import LoginImage from "/assets/login-image.png";
import Button from "./common/Button";
import Input from "./common/Input";
import "./Login.scss";
import { updateProfile, uploadProfilePicture } from "../services/auth";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUserProfile } from "../store/slices/userSlice";
import "./EditProfile.scss";
import AvatarIcon from "/assets/avtar.png";
import Popup from "./common/Popup";
import PicChooser from "./common/PicChooser";

function EditProfile() {
  let actionData: any = useActionData();
  const navigation = useNavigation();
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [popupOpen, setPopupOpen] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  // const [profilePic, setProfilePic] = useState("");
  const [uploadErr, setUploadErr] = useState("");

  function closePopup() {
    if (imageUploading) return;
    setPopupOpen(false);
  }

  useEffect(() => {
    if (actionData?.error) {
      return;
    }

    if (!actionData?.data) {
      return;
    }

    const profile = actionData?.data?.data;
    dispatch(setUserProfile(profile));
  }, [actionData]);

  async function handleFileUpload(image: any) {
    setUploadErr("");
    setImageUploading(true);
    try {
      const res = await uploadProfilePicture(image, user!._id);
      // setProfilePic(res.data.url);
      dispatch(setUserProfile({ ...(user as any), image: res.data.url }));
      closePopup();
      // setProfilePic("");
    } catch (e: any) {
      setUploadErr(
        e?.data?.message ||
          e?.message ||
          "Something went wrong with the upload. Please try again"
      );
    }
    setImageUploading(false);
  }

  async function handleDelete() {
    setImageUploading(true);
    try {
      const res = await updateProfile({ image: "" });
      dispatch(setUserProfile({ ...(user as any), image: "" }));
      // setProfilePic("");
      closePopup();
    } catch (e) {
      setUploadErr("Delete Image failed. Please try again.");
    }
    setImageUploading(false);
  }

  return (
    <div id="login">
      <div className="wrapper edit-wrap">
        <div className="login-container">
          <h1 className="advent center">Edit Profile</h1>
          {actionData?.error && (
            <p className="error-msg">{actionData?.data?.message}</p>
          )}
          {!actionData?.error && actionData?.data && (
            <p className="error-msg success-msg">{actionData?.data?.message}</p>
          )}
          <Form method="post" action="">
            <input type="hidden" name="_id" value={user?._id} />
            <Input
              name="email"
              type="email"
              required
              label="Email"
              defaultValue={user?.email}
            ></Input>
            <Input
              name="name"
              type="text"
              required
              label="Name"
              defaultValue={user?.name}
            ></Input>
            <Input
              name="address"
              type="text"
              required
              label="Address"
              defaultValue={user?.address}
            ></Input>
            <input type="hidden" name="image" value={user?.image || ""} />

            <div className="field-desc">
              <p>Description</p>
              <textarea
                name="description"
                className="textarea-desc"
                maxLength={1000}
                defaultValue={user?.description || ""}
              ></textarea>
              <div className="pic-wrap">
                <div className="profile-pic-update flex">
                  <p>Profile Picture</p>
                  <button
                    type="button"
                    className="outline-btn bold-500"
                    onClick={() => setPopupOpen(true)}
                  >
                    Change
                  </button>
                </div>
                {user?.image ? (
                  <img src={user?.image} alt="" />
                ) : (
                  <p className="error-msg">
                    No picture found. Upload a picture!
                  </p>
                )}
              </div>
            </div>
            <Button loading={navigation.state === "submitting"}>Update</Button>
          </Form>
        </div>
      </div>
      <div className="img-container">
        <img src={LoginImage} alt="" />
      </div>
      <Popup open={popupOpen} close={closePopup}>
        <h1 className="advent">Upload Profile Picture</h1>
        <p>Select an picture to upload!</p>
        {uploadErr && (
          <>
            <br />
            <p className="error-msg">{uploadErr}</p>
          </>
        )}
        {popupOpen && (
          <PicChooser
            uploading={imageUploading}
            initial={user?.image || ""}
            onUpload={handleFileUpload}
            deleteImage={handleDelete}
          ></PicChooser>
        )}
      </Popup>
    </div>
  );
}

export default EditProfile;

export async function updateProfileAction({ request }: any) {
  let formData = await request.formData();
  let email = formData.get("email");
  let name = formData.get("name");
  let address = formData.get("address");
  let image = formData.get("image");
  let description = formData.get("description");

  try {
    const response = await updateProfile({
      email,
      name,
      address,
      description,
      image,
    });
    return { error: false, data: response.data };
  } catch (error) {
    return { error: true, data: error };
  }
}
