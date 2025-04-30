import axios from "axios";

const URL = "http://localhost:5000";
export const userLogin = async (userName, password) => {
  const response = await axios.post(`${URL}/userLogin`, {
    userName,
    password,
  });

  return response.data;
};

export const userSignUp = async (userName, password) => {
  const response = await axios.post(`${URL}/usersignup`, {
    userName,
    password,
  });
  return response.data;
};

export const getStats = async (userName) => {
  const response = await axios.get(`${URL}/getStats/${userName}`);

  return response.data;
};
export const addStat = async (userName, wpm) => {
  try {
    const response = await axios.post(`${URL}/addStat/${userName}`, { wpm });
    return response.data;
  } catch (e) {}
};

export const allStats = async () => {
  const response = await axios.get(`${URL}/allUsers/`);

  return response.data;
};

export const deleteUser = async (userName) => {
  const response = await axios.delete(`${URL}/deleteUser/${userName}`);
  return response.data;
};
