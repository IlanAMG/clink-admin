import React, { useState } from "react";
import ImageUpload from "../../../../components/ImageUpload";
import { Modale } from "../../../../components/Modale";
import {
  Input,
  LabelInput,
  Select,
} from "../../../../components/ModalWhiteLabel/ModalWhiteLabelStyle";
import {
  createGift,
  updateGiftById,
  deleteGiftById,
} from "../../../../modules/gifts";
import { storage } from "../../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { fetchGifts } from "../../../../store/Gifts/features";
import { useEffect } from "react";
import Autocomplete from "../../../../components/Autocomplete";
import { WhitelabelSelection } from "../../../../components/WhitelabelSelection";
import { CheckBox } from "../../../../components/CheckBox";
import { ConfirmationModal } from "../../../../components/ConfirmationModal";

const types = ["Coupon", "Offer"];
const initialGiftState = {
  name: "",
  promotion: "",
  code: "",
  type: types[0],
  banner: "",
  url: "",
  category: "",
  visibleInTaxi: false,
};

export const GiftModal = ({ close, selectedGift, whitelabels, ...props }) => {
  const categoryNames = useSelector((state) =>
    state.gifts.value.map((gift) => {
      return gift.category || "";
    })
  );
  const [gift, setGift] = useState(initialGiftState);
  const [bannerBlob, setBannerBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  //const [categoryInputValue, setCategoryInputValue] = useState("");
  //const [categoryValue, setCategoryValue] = useState("");

  const onClose = () => {
    setLoading(false);
    setGift(initialGiftState);
    setBannerBlob(null);
    close();
  };

  const handleCreateGift = async () => {
    try {
      setLoading(true);
      await createGift({
        ...gift,
        banner: bannerBlob
          ? await handleAddImageToStorage(bannerBlob)
          : gift.banner,
      });
      dispatch(fetchGifts());
      onClose();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleUpdateGift = async () => {
    try {
      setLoading(true);
      await updateGiftById({
        id: gift.id,
        data: {
          ...gift,
          banner: bannerBlob
            ? await handleAddImageToStorage(bannerBlob)
            : gift.banner,
        },
      });
      dispatch(fetchGifts());
      onClose();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleDeleteGift = async () => {
    try {
      setLoading(true);
      await deleteGiftById(gift.id);
      dispatch(fetchGifts());
      onClose();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const onSubmit = async () => {
    if (loading) return null;
    if (checkValidity()) {
      if (!selectedGift) {
        return handleCreateGift();
      }
      return handleUpdateGift();
    }
    return alert("An error has occurred");
  };

  const onDelete = async () => {
    if (loading) return null;
    setDeleteModalOpen(true);
  };

  const checkValidity = () => {
    if (gift.name.length < 3) return false;
    if (gift.promotion.length < 1) return false;
    if (gift.code.length < 3 && gift.type === "Coupon") return false;
    return true;
  };

  const handleAddImageToStorage = async (bannerBlob) => {
    if (!bannerBlob) return null;
    const fileName = Date.now().toString();
    const metadata = {
      contentType: bannerBlob?.type || "image/jpeg",
    };

    const imageRef = ref(storage, "images/" + fileName);
    await uploadBytes(imageRef, bannerBlob, metadata);

    return getDownloadURL(imageRef).then((downloadURL) => {
      return downloadURL;
    });
  };

  useEffect(() => {
    console.log("selectedGift:", selectedGift);
    if (selectedGift) {
      const category = selectedGift.category || "";
      return setGift({ ...selectedGift, category });
    }
    return setGift(initialGiftState);
  }, [selectedGift]);

  useEffect(() => {
    dispatch(fetchGifts());
  }, []);

  return (
    <Modale
      title={selectedGift ? "Edit Gift" : "Create a Gift"}
      close={onClose}
      actions={
        selectedGift
          ? [
              {
                title: "Delete",
                click: onDelete,
              },
              {
                title: "Submit",
                click: onSubmit,
              },
            ]
          : [
              {
                title: "Submit",
                click: onSubmit,
              },
            ]
      }
      disabled={loading}
      {...props}
    >
      <ConfirmationModal
        title="Delete gift"
        content={`Do you realy want to delete «${gift.name}» ?`}
        isOpen={deleteModalOpen}
        close={() => setDeleteModalOpen(false)}
        onConfirmation={async () => {
          setDeleteModalOpen(false);
          handleDeleteGift();
        }}
      />

      <WhitelabelSelection
        multiple
        value={gift.whitelabel || []}
        onChange={(newValue) => setGift({ ...gift, whitelabel: newValue })}
      />

      <LabelInput style={{ minWidth: "360px" }} htmlFor="name">
        Name*
        <Input
          type="text"
          id="name"
          placeholder="Enter a name"
          value={gift.name}
          onChange={(e) => setGift({ ...gift, name: e.target.value })}
          name="name"
          required
        />
      </LabelInput>
      <LabelInput style={{ minWidth: "360px" }} htmlFor="category">
        Category
        <Autocomplete
          items={categoryNames}
          value={gift.category}
          onChange={(value) => {
            setGift({ ...gift, category: value });
          }}
        />
      </LabelInput>
      <LabelInput style={{ minWidth: "360px" }} htmlFor="promotion">
        Promotion*
        <Input
          type="text"
          id="promotion"
          placeholder="Enter promotion"
          value={gift.promotion}
          onChange={(e) => setGift({ ...gift, promotion: e.target.value })}
          name="promotion"
          required
        />
      </LabelInput>
      {!selectedGift && (
        <LabelInput style={{ minWidth: "360px" }} htmlFor="type">
          Type*
          <Select
            onChange={(e) => setGift({ ...gift, type: e.target.value })}
            value={gift.type}
            name="type"
            required
          >
            {types?.map((t) => {
              return <option value={t}>{t}</option>;
            })}
          </Select>
        </LabelInput>
      )}
      {gift.type === "Coupon" && (
        <LabelInput style={{ minWidth: "360px" }} htmlFor="code">
          Code*
          <Input
            type="text"
            id="code"
            placeholder="Enter code"
            value={gift.code}
            onChange={(e) => setGift({ ...gift, code: e.target.value })}
            name="code"
            required
          />
        </LabelInput>
      )}
      <ImageUpload
        title="Banner"
        initialPreview={
          bannerBlob ? URL.createObjectURL(bannerBlob) : gift.banner || ""
        }
        setBlob={setBannerBlob}
        ratio={3 / 1}
      />
      <LabelInput style={{ minWidth: "360px" }} htmlFor="url">
        URL
        <Input
          type="url"
          id="url"
          placeholder="Enter URL"
          value={gift.url}
          onChange={(e) => setGift({ ...gift, url: e.target.value })}
          name="url"
        />
      </LabelInput>
      <LabelInput style={{ minWidth: "360px" }} htmlFor="url">
        Visible in taxi
        <CheckBox
          checked={gift.visibleInTaxi}
          onChange={(e) =>
            setGift({
              ...gift,
              visibleInTaxi: e.target.checked,
            })
          }
        />
      </LabelInput>
    </Modale>
  );
};
