import { functionsFetch } from "../utils/functionsFetch";

export const refuseWhitelabelRequest = async (slug, action) => {
  try {
    const response = await functionsFetch({
      method: "PUT",
      url: `/whitelabel/request/${slug}/refuse`,
    });
    const data = await response.data;
    if (response.data.status === 404) {
      return Promise.reject({
        message: data.message,
      });
    }
    return action();
  } catch (err) {
    alert(err.response.data.message);
    return Promise.reject(err.response.data);
  }
};

export const acceptWhitelabelRequest = async (slug, action) => {
  try {
    const response = await functionsFetch({
      method: "POST",
      url: `/whitelabel/request/${slug}/accept`,
    });
    const data = await response.data;
    if (response.data.status === 404 || response.data.status === 400) {
      return Promise.reject({
        message: data.message,
      });
    }
    return action();
  } catch (err) {
    alert(err.response.data.message);
    return Promise.reject(err.response.data);
  }
};
