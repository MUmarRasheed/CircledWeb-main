import React, { useState } from "react";
import Button from "./Button";
import Loading from "./Loading";
import "./PicChooser.scss";

function PicChooser({
  initial,
  onUpload,
  uploading,
  deleteImage,
  message,
}: {
  initial: string;
  onUpload: any;
  uploading: boolean;
  deleteImage?: () => void;
  message?: string;
}) {
  const [image, setImage] = useState<any>();

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="pic-chooser">
      <div className="img-container">
        {image || initial ? (
          <img src={image || initial} alt="" />
        ) : (
          <p className="center">No image selected</p>
        )}
      </div>
      {uploading ? (
        <>
          <p className="bold center">{message || "Updating. Please wait..."}</p>
          <Button loading={true}></Button>
        </>
      ) : (
        <div className="wrap-btn flex wrap">
          {initial && (
            <button className="outline-btn danger-btn" onClick={deleteImage}>
              Delete My Picture
            </button>
          )}
          <div className="btn-wrapper">
            <label className="custom-file-upload outline-btn">
              <input type="file" onChange={onImageChange} accept="image/*" />
              Choose Image
            </label>
            {image && <Button onClick={() => onUpload(image)}>Upload</Button>}
          </div>
        </div>
      )}
    </div>
  );
}

export default PicChooser;
