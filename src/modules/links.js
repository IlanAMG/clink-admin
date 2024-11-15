import { functionsFetch } from "../utils/functionsFetch";

export const deleteLinkById = async (linkId, action) => {
  try {
    await functionsFetch({
      method: "DELETE",
      url: `/links/${linkId}`,
    });
    action();
  } catch (err) {
    alert(err.response.data.message);
    return Promise.reject(err.response.data);
  }
};


export const generateLinksAction = async ({ nbValue, whitelabel, product }) => {
  try {
    return await functionsFetch({
      method: 'GET',
      url: `/links/generate/${nbValue}?whitelabelSlug=${whitelabel}&productId=${product}`,
    })
  } catch (err) {
    alert(err);
    return Promise.reject(err);
  }
}

export const getProductByLinkId = async (id) => {
  try {
    const res = await functionsFetch({
      method: 'GET',
      url: `/links/${id}/product`,
    })
    return res.data
  } catch (err) {
    console.log(err.response.data.error)
    return Promise.reject(err);
  }
}