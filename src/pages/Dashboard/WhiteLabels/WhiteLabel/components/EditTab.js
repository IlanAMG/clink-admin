import { useEffect, useState } from "react";
import InputAutocomplete from "../../../../../components/InputAutocomplete";
import { Picker } from "../../../../../components/ModalWhiteLabel/components/Picker";
import {
  ButtonFile,
  ContainerInputColor,
  ContainerUploadLogo,
  Input,
  LabelInput,
  Select,
} from "../../../../../components/ModalWhiteLabel/ModalWhiteLabelStyle";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { PickerOverlay } from "filestack-react";
import { deleteWhitelabelById } from "../../../../../modules/whitelabels";
import { useDispatch } from "react-redux";
import { fetchWhitelabelList } from "../../../../../store/Whitelabel/WhitelabelList/features";
import { Button } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ConfirmationModal } from "../../../../../components/ConfirmationModal";

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const colorFields = [
  {
    title: "Couleur principale",
    position: "toLeft",
    key: "color1",
  },
  {
    title: "Couleur secondaire",
    position: "center",
    key: "color2",
  },
  {
    title: "Couleur tertiaire",
    position: "toRight",
    key: "color3",
  },
];

const EditTab = ({
  selectedWhiteLabel,
  setSelectedWhiteLabel,
  onUpdateWhitelabel,
  logosBlob,
  setLogosBlob,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openFileStackBig, setOpenFileStackBig] = useState(false);
  const [openFileStackSmall, setOpenFileStackSmall] = useState(false);

  const handleChangeColor = (color, key) => {
    setSelectedWhiteLabel((selectedWhiteLabel) => ({
      ...selectedWhiteLabel,
      [key]: color,
    }));
  };

  const onChangeLogo = async (res, type) => {
    if (res.filesUploaded[0]?.url !== null) {
      var obj = res.filesUploaded[0];
      await fetch(obj.url)
        .then((r) => r.arrayBuffer())
        .then((buffer) => {
          const blob = new Blob([buffer], { type: "image/jpeg" });
          setLogosBlob({ ...logosBlob, [type]: blob });
        });
    }
  };

  useEffect(() => {
    setSelectedWhiteLabel((selectedWhiteLabel) => ({
      ...selectedWhiteLabel,
      logoBig: logosBlob.logoBig
        ? URL.createObjectURL(logosBlob.logoBig)
        : selectedWhiteLabel.logoBig,
      logoSmall: logosBlob.logoSmall
        ? URL.createObjectURL(logosBlob.logoSmall)
        : selectedWhiteLabel.logoSmall,
    }));
  }, [logosBlob]);

  return (
    <>
      <ConfirmationModal
        title="Supprimer le whitelabel"
        content={`Voulez-vous vraiment supprimer le whitelabel «${selectedWhiteLabel.whiteLabelName}» ?`}
        isOpen={isDeleteModalOpen}
        close={() => setIsDeleteModalOpen(false)}
        onConfirmation={() =>
          deleteWhitelabelById(selectedWhiteLabel.id, () => {
            dispatch(fetchWhitelabelList());
            setIsDeleteModalOpen(false);
            navigate("/dashboard/whitelabels");
          })
        }
      />
      {openFileStackSmall && (
        <PickerOverlay
          apikey="A31MqJVcLQvuKQVlsYc0xz"
          onSuccess={(res) => onChangeLogo(res, "logoSmall")}
          pickerOptions={{
            accept: "image/*",
            maxSize: 1024 * 1024,
            maxFiles: 1,

            transformations: {
              crop: {
                aspectRatio: 1,
                force: true,
              },
              circle: false,
            },
            onClose: () => {
              setOpenFileStackSmall(false);
            },
          }}
        />
      )}
      {openFileStackBig && (
        <PickerOverlay
          apikey="A31MqJVcLQvuKQVlsYc0xz"
          onSuccess={(res) => onChangeLogo(res, "logoBig")}
          pickerOptions={{
            accept: "image/*",
            maxSize: 1024 * 1024,
            maxFiles: 1,

            transformations: {
              crop: {
                aspectRatio: 270 / 56,
                force: true,
              },
              circle: false,
            },
            onClose: () => {
              setOpenFileStackBig(false);
            },
          }}
        />
      )}
      <LabelInput htmlFor="slug">
        Slug
        <Input
          type="text"
          id="slug"
          placeholder="Slug"
          value={selectedWhiteLabel.slug}
          onChange={(e) =>
            setSelectedWhiteLabel({
              ...selectedWhiteLabel,
              slug: e.target.value,
            })
          }
          name="slug"
          disabled={true}
        />
      </LabelInput>
      <LabelInput htmlFor="email">
        Email
        <Input
          type="text"
          id="email"
          placeholder="Email"
          value={selectedWhiteLabel.email}
          onChange={(e) =>
            setSelectedWhiteLabel({
              ...selectedWhiteLabel,
              email: e.target.value,
            })
          }
          name="email"
          disabled={true}
        />
      </LabelInput>
      <LabelInput htmlFor="customDomain">
        Custom domain
        <Input
          type="text"
          id="customDomain"
          placeholder=""
          value={selectedWhiteLabel.customDomain}
          onChange={(e) =>
            setSelectedWhiteLabel({
              ...selectedWhiteLabel,
              customDomain: e.target.value,
            })
          }
          name="email"
          disabled={true}
        />
      </LabelInput>
      <LabelInput htmlFor="whiteLabelName">
        Whitelabel name
        <Input
          type="text"
          id="whiteLabelName"
          placeholder="Nom du whitelabel"
          value={selectedWhiteLabel.whiteLabelName}
          onChange={(e) =>
            setSelectedWhiteLabel({
              ...selectedWhiteLabel,
              whiteLabelName: e.target.value,
            })
          }
          name="name"
        />
      </LabelInput>

      <LabelInput htmlFor="whiteLabelName">
        Whitelabel type
        <Select
          value={selectedWhiteLabel.type || "BUSINESS"}
          onChange={(e) =>
            setSelectedWhiteLabel({
              ...selectedWhiteLabel,
              type: e.target.value,
              plansDisabled:
                e.target.value === "BUSINESS_CARDS"
                  ? true
                  : selectedWhiteLabel.plansDisabled,
            })
          }
        >
          {["BUSINESS", "RESSELLER", "BUSINESS_CARDS"].map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </Select>
      </LabelInput>

      <LabelInput htmlFor="whiteLabelName">
        Default language
        <Select
          value={selectedWhiteLabel.defaultLanguage || ""}
          onChange={(e) =>
            setSelectedWhiteLabel({
              ...selectedWhiteLabel,
              defaultLanguage: e.target.value,
            })
          }
        >
          <option key="default" value="">
            --Select Language--
          </option>
          {["EN", "FR", "ES", "AR"].map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </Select>
      </LabelInput>

      <LabelInput htmlFor="livechat-token">
        Livechat Token
        <Input
          type="text"
          id="livechat-token"
          placeholder="example : 0000-0000-0000-0000-0000"
          value={selectedWhiteLabel.livechatToken}
          onChange={(e) =>
            setSelectedWhiteLabel({
              ...selectedWhiteLabel,
              livechatToken: e.target.value,
            })
          }
          name="livechatToken"
        />
      </LabelInput>

      <ContainerInputColor color>
        <LabelInput htmlFor="">Your colors</LabelInput>
        <div className="wrapper-collor-btn">
          {colorFields.map((colorField, i) => (
            <Picker
              key={i}
              values={selectedWhiteLabel}
              onChange={handleChangeColor}
              options={colorField}
            />
          ))}
        </div>
      </ContainerInputColor>
      <ContainerUploadLogo>
        <LabelInput htmlFor="">Your logos</LabelInput>
        <div className="wrapper-upload-logo">
          <div className="wrapper-logobig">
            <span>Logo Big | (540px / 112px)</span>
            <div className="wrapper_img">
              {selectedWhiteLabel.logoBig && (
                <img alt="logo big" src={selectedWhiteLabel.logoBig} />
              )}
            </div>
            <div className="btn-logo-small">
              <input type="file" id="hiddenfile" style={{ display: "none" }} />
              <ButtonFile
                type="button"
                onClick={() => setOpenFileStackBig(true)}
              >
                <FileUploadOutlinedIcon />
                Change
              </ButtonFile>
            </div>
          </div>
          <div className="wrapper-logosmall">
            <span>Logo Small | (480px / 480px)</span>
            <div className="wrapper_img">
              {selectedWhiteLabel.logoSmall && (
                <img alt="logo big" src={selectedWhiteLabel.logoSmall} />
              )}
            </div>
            <div className="btn-logo-small">
              <input type="file" id="hiddenfile" style={{ display: "none" }} />
              <ButtonFile
                type="button"
                onClick={() => setOpenFileStackSmall(true)}
              >
                <FileUploadOutlinedIcon />
                Change
              </ButtonFile>
            </div>
          </div>
        </div>
      </ContainerUploadLogo>
      <LabelInput htmlFor="locations">
        Localisations
        <InputAutocomplete
          id="locations"
          name="locations"
          placeholder="Ajouter"
          value={selectedWhiteLabel.locations || []}
          onChange={(value) => {
            setSelectedWhiteLabel({
              ...selectedWhiteLabel,
              locations: value,
            });
          }}
        />
      </LabelInput>
      <Buttons>
        <Button onClick={() => navigate("/dashboard/whitelabels")}>Back</Button>
        <Button onClick={() => setIsDeleteModalOpen(true)}>Delete</Button>
        <Button onClick={() => onUpdateWhitelabel()}>Save</Button>
      </Buttons>
    </>
  );
};

export default EditTab;
