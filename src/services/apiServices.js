import axios from "../utils/axiosCustomize";

// post create new user
const postCreateNewUser = (email, password, userName, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", userName);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("api/v1/participant", data);
};

// get all user
const getAllUser = () => {
  return axios.get(`api/v1/participant/all`);
};

// put user
const putUpdateUser = (id, userName, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", userName);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("api/v1/participant", data);
};

// delete user
const deleteUser = (id) => {
  return axios.delete("api/v1/participant", {
    data: {
      id: id,
    },
  });
};

// get paginate users
const getUserPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

// LOGIN
const postLogin = (email, password) => {
  return axios.post(`api/v1/login`, { email, password, delay: "5000" });
};

// REGISTER
const postRegister = (email, password, username) => {
  return axios.post(`api/v1/register`, { email, password, username });
};

// GET QUIZZ DATA
const getQuizzByUser = () => {
  return axios.get(`api/v1/quiz-by-participant`);
};

// GET QUIZZ DATA DETAILS
const getDataDetailQuizz = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

export {
  postCreateNewUser,
  getAllUser,
  putUpdateUser,
  deleteUser,
  getUserPaginate,
  postLogin,
  postRegister,
  getQuizzByUser,
  getDataDetailQuizz,
};
