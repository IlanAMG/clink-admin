import { useState, useEffect } from "react";
import { Modale } from "../Modale";
import {
  ButtonFile,
  ContainerAllEdition,
  ContainerInputColor,
  ContainerUploadLogo,
  Input,
  LabelInput,
} from "./ModalWhiteLabelStyle";
import { PickerOverlay } from "filestack-react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createWhitelabel } from "../../modules/whitelabels";
import { v4 as uuidv4 } from "uuid";
import InputAutocomplete from "../InputAutocomplete";
import { Picker } from "./components/Picker";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

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

export default function ModalWhiteLabel({
  selectedWhitelabel,
  setSelectedWhitelabel,
  refetch,
}) {
  const [values, setValues] = useState({
    color1: "#000000",
    color2: "#000000",
    color3: "#000000",
    slug: "",
    whiteLabelName: "",
    email: "",
    logoSmall: "",
    logoBig: "",
    hasCustomStickers: false,
    hasCustomCards: false,
    shopDisabled: false,
    plansDisabled: false,
    campaign: false,
    programFidelityEnabled: false,
    networkDisabled: false,
    analyticsDisabled: false,
    benefitsDisabled: false,
    affiliateDisabled: false,
    codeEnabled: false,
    locations: [],
    layout: "SPLIT",
  });
  const [openFileStackBig, setOpenFileStackBig] = useState(false);
  const [openFileStackSmall, setOpenFileStackSmall] = useState(false);
  const [logosBlob, setLogosBlob] = useState({
    logoSmall: null,
    logoBig: null,
  });

  const onChangeLogo = async (res, type) => {
    console.log("res", res);
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

  const handleChangeColor = (color, key) => {
    setValues((Values) => ({
      ...Values,
      [key]: color,
    }));
  };

  const handleAddImageToStorage = async (logoBlob) => {
    if (!logoBlob) return null;
    const fileName = Date.now().toString();
    const metadata = {
      contentType: logoBlob?.type || "image/jpeg",
    };
    console.log("logoBlob", logoBlob);
    const imageRef = ref(storage, "images/" + fileName);
    await uploadBytes(imageRef, logoBlob, metadata);

    return getDownloadURL(imageRef).then((downloadURL) => {
      return downloadURL;
    });
  };

  const onCreateWhitelabel = async () => {
    try {
      const sanitizedSlug = values?.slug
        .replace(/[^A-Za-z0-9-]+/g, "")
        .toLowerCase();
      if (!values?.whiteLabelName?.length)
        return alert("Veuillez remplir le champ Nom.");
      if (!values?.email?.length)
        return alert("Veuillez remplir le champ Email.");
      if (!sanitizedSlug.length)
        return alert("Veuillez remplir le champ Slug.");
      const logoBig =
        (await handleAddImageToStorage(logosBlob.logoBig)) || values.logoBig;
      const logoSmall =
        (await handleAddImageToStorage(logosBlob.logoSmall)) ||
        values.logoSmall;
      if (!logoBig || !logoSmall) return alert("Veuillez remplir les logos.");
      const dataRequest = {
        ...values,
        id: uuidv4(),
        slug: sanitizedSlug,
        logoBig,
        logoSmall,
      };

      await createWhitelabel(dataRequest);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setValues((values) => ({
      ...values,
      logoBig: logosBlob.logoBig
        ? URL.createObjectURL(logosBlob.logoBig)
        : values.logoBig,
      logoSmall: logosBlob.logoSmall
        ? URL.createObjectURL(logosBlob.logoSmall)
        : values.logoSmall,
    }));
  }, [logosBlob]);

  return (
    <>
      {openFileStackSmall && (
        <PickerOverlay
          apikey="A31MqJVcLQvuKQVlsYc0xz"
          onSuccess={(res) => onChangeLogo(res, "logoSmall")}
          onUploadDone={(res) => console.log("onUploadDone", res)}
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
      <Modale
        title={"Créer un whitelabel"}
        isOpen={selectedWhitelabel !== null}
        close={() => setSelectedWhitelabel(null)}
        actions={[
          {
            title: "Sauvegarder",
            click: () => onCreateWhitelabel(),
          },
        ]}
      >
        <ContainerAllEdition>
          <LabelInput htmlFor="slug">
            Slug
            <Input
              type="text"
              id="slug"
              placeholder="Slug"
              value={values.slug}
              onChange={(e) => setValues({ ...values, slug: e.target.value })}
              name="slug"
            />
          </LabelInput>
          <LabelInput htmlFor="email">
            Email
            <Input
              type="text"
              id="email"
              placeholder="Email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              name="email"
            />
          </LabelInput>
          <LabelInput htmlFor="whiteLabelName">
            Whitelabel name
            <Input
              type="text"
              id="whiteLabelName"
              placeholder="Nom du whitelabel"
              value={values.whiteLabelName}
              onChange={(e) =>
                setValues({ ...values, whiteLabelName: e.target.value })
              }
              name="name"
            />
          </LabelInput>
          <ContainerInputColor color>
            <LabelInput htmlFor="">Your colors</LabelInput>
            <div className="wrapper-collor-btn">
              {colorFields.map((colorField, i) => (
                <Picker
                  key={i}
                  values={values}
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
                  {values.logoBig && (
                    <img alt="logo big" src={values.logoBig} />
                  )}
                </div>
                <div className="btn-logo-small">
                  <input
                    type="file"
                    id="hiddenfile"
                    style={{ display: "none" }}
                  />
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
                  {values.logoSmall && (
                    <img alt="logo big" src={values.logoSmall} />
                  )}
                </div>
                <div className="btn-logo-small">
                  <input
                    type="file"
                    id="hiddenfile"
                    style={{ display: "none" }}
                  />
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
              value={values.locations}
              onChange={(value) => setValues({ ...values, locations: value })}
            />
          </LabelInput>
        </ContainerAllEdition>
      </Modale>
    </>
  );
}
