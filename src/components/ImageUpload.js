import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { ButtonFile, LabelInput } from "./ModalWhiteLabel/ModalWhiteLabelStyle";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { PickerOverlay } from "filestack-react";

const ContainerUploadLogo = styled.div`
  width: 100%;
  .wrapper-upload-logo {
    width: 100%;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    .wrapper_img {
      width: ${({ size }) => size};
      aspect-ratio: ${(props) => props.ratio || "auto"};
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgb(172, 176, 183);
      background: #dee0e652;
      border-radius: 8px;
      overflow: hidden;
    }
    .wrapper-logo {
      width: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      span {
        font-size: 10px;
      }
    }
  }
`;

export default function ImageUpload({
  title,
  initialPreview,
  setBlob,
  width,
  height,
  ratio,
  size = "72px",
}) {
  const [preview, setPreview] = useState("");
  const [fileStackOpen, setFileStackOpen] = useState(false);

  const onChangeImage = async (res) => {
    if (res.filesUploaded[0]?.url !== null) {
      var obj = res.filesUploaded[0];
      await fetch(obj.url)
        .then((r) => r.arrayBuffer())
        .then((buffer) => {
          const blob = new Blob([buffer], { type: "image/jpeg" });
          console.log("blob", blob);
          setBlob(blob);
        });
    }
  };

  useEffect(() => {
    setPreview(initialPreview ? initialPreview : "");
  }, [initialPreview]);

  return (
    <ContainerUploadLogo size={size} ratio={ratio}>
      {fileStackOpen && (
        <PickerOverlay
          apikey="AtxLFzAlXRsmjnJW7WNNmz"
          onSuccess={(res) => onChangeImage(res)}
          pickerOptions={{
            accept: "image/*",
            maxSize: 1024 * 1024,
            maxFiles: 1,
            transformations: {
              crop: {
                aspectRatio: ratio,
                force: true,
              },
              circle: false,
            },
            onClose: () => {
              setFileStackOpen(false);
            },
          }}
        />
      )}
      <LabelInput htmlFor="">{title}</LabelInput>
      <div className="wrapper-upload-logo">
        <div className="wrapper-logo">
          <span>{height && width && `(${width}px/${height}px)`}</span>
          {preview && (
            <div className="wrapper_img">
              {preview && <img alt="upload" src={preview} />}
            </div>
          )}
          <div className="btn-logo-small">
            <input type="file" id="hiddenfile" style={{ display: "none" }} />
            <ButtonFile type="button" onClick={() => setFileStackOpen(true)}>
              <FileUploadOutlinedIcon />
              Change
            </ButtonFile>
          </div>
        </div>
      </div>
    </ContainerUploadLogo>
  );
}
