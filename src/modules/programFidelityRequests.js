import { functionsFetch } from "../utils/functionsFetch";

export const getAllProgramFidelityUsers = async () => {
  try {
    const res = await functionsFetch({
      method: "GET",
      url: `/users/program/fidelity`,
    });
    return res.data;
  } catch (err) {
    alert(err);
    return Promise.reject(err);
  }
};

export const acceptProgramFidelityUsers = async (data, action) => {
  try {
    await functionsFetch({
      method: "PUT",
      url: `/users/program/fidelity/accept/${data.id}`,
      data,
    });
    return action();
  } catch (err) {
    alert(err);
    return Promise.reject(err);
  }
};
export const refuseProgramFidelityUsers = async (data, action) => {
  try {
    await functionsFetch({
      method: "PUT",
      url: `/users/program/fidelity/refuse/${data.id}`,
      data,
    });
    return action();
  } catch (err) {
    alert(err);
    return Promise.reject(err);
  }
};
