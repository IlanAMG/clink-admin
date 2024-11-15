import { functionsFetch } from "../utils/functionsFetch";

export const createGift = async gift => {
  try {
    const response = await functionsFetch({
      method: "POST",
      url: `/gifts/`,
      data: gift,
    });
    const data = await response.data;
    return data;
  } catch (err) {
    alert(err);
    return Promise.reject(err.response.data);
  }
};

export const getAllGifts = async () => {
  try {
    const res = await functionsFetch({
      method: "GET",
      url: `/gifts/`,
    });
    return res.data;
  } catch (err) {
    alert(err);
    return Promise.reject(err.response.data);
  }
};

export const updateGiftById = async ({ id, data }) => {
  try {
    const res = await functionsFetch({
      method: "PUT",
      url: `/gifts/${id}`,
      data,
    });
    console.log(res.data);
  } catch (err) {
    alert(err);
    return Promise.reject(err);
  }
};

export const deleteGiftById = async id => {
  try {
    const res = await functionsFetch({
      method: "DELETE",
      url: `/gifts/${id}`,
    });
    console.log(res.data);
  } catch (err) {
    alert(err);
    return Promise.reject(err);
  }
};
