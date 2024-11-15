import { functionsFetch } from "../utils/functionsFetch";

export const getUserByCustomField = async ({ key, value }) => {
  try {
    const res = await functionsFetch({
      method: "GET",
      url: `/users/${key}/where/${value}?whitelabel=gpm`,
    });
    return res.data;
  } catch (err) {
    Promise.reject(err);
    return null;
  }
};

export const updateUserByUid = async (data, uid, action) => {
  try {
    const res = await functionsFetch({
      method: "PUT",
      url: `/users/${uid}`,
      data,
    });
    await action();
    return res.data;
  } catch (err) {
    alert(err);
    return Promise.reject(err);
  }
};

export const verifyUserByUid = async (uid) => {
  try {
    const res = await functionsFetch({
      method: "PUT",
      url: `/users/verify/${uid}`,
    });
    return res.data;
  } catch (err) {
    alert(err);
    return Promise.reject(err);
  }
};

export const deleteUserByUid = async (uid) => {
  try {
    const res = await functionsFetch({
      method: "DELETE",
      url: `/users/${uid}`,
    });
  } catch (err) {
    alert(err);
    return Promise.reject(err);
  }
};
