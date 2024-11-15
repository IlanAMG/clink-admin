import { functionsFetch } from "../utils/functionsFetch";

export const getAllReports = async () => {
    try {
      const res = await functionsFetch({
        method: "GET",
        url: `/report`,
      });
      return res.data;
    } catch (err) {
      alert(err);
      return Promise.reject(err);
    }
  };