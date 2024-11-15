import axios from "axios";

// const URL = "http://localhost:5001/gopopme-7353a/europe-west3/api2";
const URL = "https://europe-west3-gopopme-7353a.cloudfunctions.net/api2";

export const functionsFetch = (config) => {
  //interceptors handle network error
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (!error.message) {
        error.message = "net work error";
      }
      return Promise.reject(error);
    }
  );
  config.baseURL = URL;
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer aOrQKFDn4gekjya2u0qn7YbdWnw2`;
  return axios(config);
};
