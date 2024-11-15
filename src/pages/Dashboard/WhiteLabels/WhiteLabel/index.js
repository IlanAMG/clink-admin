import { useState } from "react";
import { CardWithTabs } from "../../../../components/CardWithTabs";
import { useNavigate, useParams } from "react-router-dom";
import { whitelabelListSelector } from "../../../../store/Whitelabel/WhitelabelList";
import { useDispatch, useSelector } from "react-redux";
import EditTab from "./components/EditTab";
import OptionTab from "./components/OptionTab";
import { updateWhitelabelBySlug } from "../../../../modules/whitelabels";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { fetchWhitelabelList } from "../../../../store/Whitelabel/WhitelabelList/features";
import { storage } from "../../../../firebase";

export default function WhiteLabel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { whiteLabelList } = useSelector(whitelabelListSelector);
  const [selectedWhiteLabel, setSelectedWhitelabel] = useState(
    whiteLabelList.find((wl) => wl.id === id)
  );

  const [logosBlob, setLogosBlob] = useState({
    logoSmall: null,
    logoBig: null,
  });

  const handleAddImageToStorage = async (logoBlob) => {
    if (!logoBlob) return null;
    const fileName = Date.now().toString();
    const metadata = {
      contentType: logoBlob?.type || "image/jpeg",
    };

    const imageRef = ref(storage, "images/" + fileName);
    await uploadBytes(imageRef, logoBlob, metadata);

    return getDownloadURL(imageRef).then((downloadURL) => {
      return downloadURL;
    });
  };

  const onUpdateWhitelabel = async () => {
    try {
      if (!selectedWhiteLabel.whiteLabelName.length)
        return alert("Veuillez remplir le champ Nom.");

      const dataRequest = {
        ...selectedWhiteLabel,
        logoBig:
          (await handleAddImageToStorage(logosBlob.logoBig)) ||
          selectedWhiteLabel.logoBig,
        logoSmall:
          (await handleAddImageToStorage(logosBlob.logoSmall)) ||
          selectedWhiteLabel.logoSmall,
        layout: selectedWhiteLabel.campaign ? selectedWhiteLabel.layout : null,
        defaultLanguage: selectedWhiteLabel.defaultLanguage || "",
      };

      await updateWhitelabelBySlug(selectedWhiteLabel.slug, dataRequest);
      dispatch(fetchWhitelabelList());
      navigate("/dashboard/whitelabels");
    } catch (err) {
      console.log(err);
    }
  };
  if (!selectedWhiteLabel) return null;
  return (
    <>
      <CardWithTabs
        name={selectedWhiteLabel.whiteLabelName}
        tabs={[
          {
            name: "Edit",
            component: (
              <EditTab
                selectedWhiteLabel={selectedWhiteLabel}
                setSelectedWhiteLabel={setSelectedWhitelabel}
                onUpdateWhitelabel={onUpdateWhitelabel}
                logosBlob={logosBlob}
                setLogosBlob={setLogosBlob}
              />
            ),
          },

          ...(selectedWhiteLabel.type !== "BUSINESS_CARDS"
            ? [
                {
                  name: "Options",
                  component: (
                    <OptionTab
                      selectedWhiteLabel={selectedWhiteLabel}
                      setSelectedWhiteLabel={setSelectedWhitelabel}
                      onUpdateWhitelabel={onUpdateWhitelabel}
                    />
                  ),
                },
              ]
            : []),
        ]}
      />
    </>
  );
}
