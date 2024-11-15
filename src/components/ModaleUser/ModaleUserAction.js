import { useState, useEffect, useCallback } from "react";
import { Modale } from "../Modale";
import { ContainerButton } from "./ModaleUserActionStyle";
import { CheckOutlined, DeleteOutlined } from "@mui/icons-material";
import {
  deleteUserByUid,
  getUserByCustomField,
  updateUserByUid,
  verifyUserByUid,
} from "../../modules/user";
import { CheckBox } from "../CheckBox";
import InputSelect from "../InputSelect";
import { Input } from "../Input";
import { ConfirmationModal } from "../ConfirmationModal";
import { Chip } from "@mui/material";
import { format } from "date-fns";
import { RotatingLines } from "react-loader-spinner";
import { LabeledContent } from "../LabeledContent";

export default function ModaleUserAction({
  selectedUser,
  setSelectedUser,
  refetch,
  setSecondaryProfils,
}) {
  const [openModalDelete, setOpenModalDelete] = useState(null);
  const [dataUpdateUser, setDataUpdateUser] = useState({
    admin: "",
    isCertified: false,
    plan: "",
    nbProfilesMax: 0,
  });
  const [isVerifyingUser, setIsVerifyingUser] = useState(false);
  const [sponsorCustomUrl, setSponsorCustomUrl] = useState("");

  const onOpenModaleDelete = () => {
    setOpenModalDelete(selectedUser);
    setSelectedUser(null);
  };

  const onDelete = async () => {
    const id = openModalDelete.uid;
    setOpenModalDelete(null);
    await deleteUserByUid(id);
    refetch();
  };

  const onVerifyUser = async () => {
    setIsVerifyingUser(true);
    await verifyUserByUid(selectedUser.uid);
    setIsVerifyingUser(false);
    refetch();
    setSelectedUser(null);
    if (setSecondaryProfils) setSecondaryProfils(null);
  };

  const handleChangeCertification = (e) => {
    setDataUpdateUser({
      ...dataUpdateUser,
      isCertified: e.target.checked,
    });
  };

  const handleChangeAdmin = (e) => {
    const admin = !e.target.checked ? "" : selectedUser.whiteLabel;
    setDataUpdateUser({
      ...dataUpdateUser,
      admin,
    });
  };

  const handleChangeNbProfilesMax = (e) => {
    const plan = e.target.value > 1 ? "PRO" : dataUpdateUser.plan;
    setDataUpdateUser({
      ...dataUpdateUser,
      nbProfilesMax: e.target.value,
      plan,
    });
  };

  const handleChangeValue = (e) => {
    const plan = e.target.value;
    if (selectedUser.isPro) return;
    if (plan === "FREE") {
      return setDataUpdateUser({
        ...dataUpdateUser,
        plan,
        nbProfilesMax: 1,
      });
    } else {
      return setDataUpdateUser({
        ...dataUpdateUser,
        plan: "PRO",
        nbProfilesMax: dataUpdateUser.nbProfilesMax || 1,
      });
    }
  };

  const getSponsorCustomUrl = useCallback(async () => {
    if (!selectedUser) setSponsorCustomUrl("");
    if (!selectedUser.sponsorId) {
      return setSponsorCustomUrl("");
    }
    console.log(selectedUser.sponsorId);
    const sponsor = await getUserByCustomField({
      key: "id",
      value: selectedUser.sponsorId,
    });
    if (!sponsor?.customUrl) {
      return setSponsorCustomUrl("");
    }
    return setSponsorCustomUrl(sponsor.customUrl);
  }, [selectedUser]);

  const getSponsorId = useCallback(async () => {
    if (!sponsorCustomUrl) return selectedUser.sponsorId;
    const sponsor = await getUserByCustomField({
      key: "customUrl",
      value: sponsorCustomUrl,
    });
    if (!sponsor) {
      alert("Aucun parrain trouvé avec le customUrl " + sponsorCustomUrl);
      return selectedUser.sponsorId;
    }
    return sponsor.id;
  }, [sponsorCustomUrl, selectedUser?.sponsorId]);

  useEffect(() => {
    getSponsorCustomUrl();
  }, [getSponsorCustomUrl]);

  useEffect(() => {
    if (selectedUser) {
      setDataUpdateUser({
        admin: selectedUser.admin ?? "",
        nbProfilesMax: selectedUser.nbProfilesMax || 1,
        plan: selectedUser.isPro === true ? "PRO" : selectedUser.plan,
        isCertified: selectedUser.isCertified ?? false,
        sponsorId: selectedUser.sponsorId || "",
      });
    }
  }, [selectedUser]);

  const onSubmit = async () => {
    const sponsorId = await getSponsorId();
    await updateUserByUid(
      {
        ...dataUpdateUser,
        nbProfilesMax: dataUpdateUser.nbProfilesMax || 1,
        sponsorId,
      },
      selectedUser.uid,
      async () => {
        await refetch();
        setSelectedUser(null);
        setSponsorCustomUrl("");
        if (setSecondaryProfils) setSecondaryProfils(null);
      }
    );
  };

  return (
    <>
      <Modale
        title={`Les actions sur l'utilisateur `}
        isOpen={Boolean(selectedUser)}
        close={() => {
          setSelectedUser(null);
        }}
        actions={[
          {
            title: "Sauvegarder",
            click: onSubmit,
          },
        ]}
        style={{ width: "380px" }}
      >
        <CheckBox
          title="Administrateur"
          checked={Boolean(dataUpdateUser.admin)}
          onChange={(e) => handleChangeAdmin(e)}
        />
        <CheckBox
          title="Certifier ce profil"
          checked={dataUpdateUser.isCertified}
          onChange={(e) => handleChangeCertification(e)}
        />
        {!selectedUser?.main_uid && (
          <>
            <InputSelect
              id={"choose-plan"}
              options={["FREE", "PRO"]}
              onChange={(e) => handleChangeValue(e)}
              value={dataUpdateUser.plan}
              title={"Choose plan"}
            />

            <Input
              style={{
                padding: "12px 8px",
                width: "80px",
              }}
              title="Profiles max"
              id="profiles"
              value={dataUpdateUser.nbProfilesMax || ""}
              onChange={(e) => handleChangeNbProfilesMax(e)}
            />

            <LabeledContent label="About">
              <p>{selectedUser?.about || "Empty"}</p>
            </LabeledContent>

            <LabeledContent label="Birthday">
              <p>
                {selectedUser?.birthday
                  ? format(selectedUser.birthday, "dd-MM-yyyy")
                  : "Empty"}
              </p>
            </LabeledContent>

            <Input
              style={{
                padding: "12px 8px",
                width: "80px",
              }}
              type="text"
              title="Parrain"
              id="parrain"
              value={sponsorCustomUrl}
              onChange={(e) => setSponsorCustomUrl(e.target.value)}
            />

            <LabeledContent label="Tags">
              {selectedUser?.tags[0] ? (
                selectedUser.tags.map((tag, index) => {
                  return <Chip key={index} label={tag} />;
                })
              ) : (
                <p>Empty</p>
              )}
            </LabeledContent>
          </>
        )}
        <ContainerButton>
          {!selectedUser?.needToActiveAccount === false && (
            <button className="primary" onClick={onVerifyUser}>
              {!isVerifyingUser ? (
                <>
                  <CheckOutlined />
                  Verifier cet utilisateur
                </>
              ) : (
                <div className="center">
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                  />
                </div>
              )}
            </button>
          )}
          <button onClick={onOpenModaleDelete}>
            <DeleteOutlined />
            Supprimer cet utilisateur
          </button>
        </ContainerButton>
      </Modale>
      {openModalDelete && (
        <ConfirmationModal
          title="Supprimer l'utilisateur"
          content={`Voulez vous vraiment supprimer «${openModalDelete.firstName} ${openModalDelete.lastName}»`}
          isOpen={openModalDelete !== null}
          close={() => setOpenModalDelete(null)}
          onConfirmation={() => onDelete()}
        />
      )}
    </>
  );
}
