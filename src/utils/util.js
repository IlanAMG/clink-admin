import { toast } from "react-toastify";

export const checkIsUrl = (value) => {
  return (
    value &&
    /^(https?):\/\/(\w+:?\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@\-/]))?$/.test(
      value
    )
  );
};

export const whitelabelTypeByUser = (whitelabel, whitelabels) => {
  return whitelabels.find((wl) => wl.slug === whitelabel)?.type || "BUSINESS";
};

export const redirectToProfileOrCard = (user, whiteLabelList) => {
  const whitelabelType = whitelabelTypeByUser(user.whiteLabel, whiteLabelList);
  if (whitelabelType !== "BUSINESS_CARDS") {
    window.open(`https://www.gpm.business/${user.whiteLabel}/u/${user.id}`);
    return null;
  }

  if (!user.businessCardId) {
    return toast.error(
      "Whitelabel of business Card type but still no business card created"
    );
  }

  window.open(`https://www.gpm.business/c/${user.businessCardId}`);
};

export const businessCardByUser = (userId, businessCards) => {
  return businessCards?.find((card) => card.userId === userId);
};
