import axios from "axios";

export default {
  register: async (newUser) => {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_HOST_API}/users`,
      newUser,
    )
    .then(res => res)
    .catch(err => err)
  },
  login: async (data) => {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_HOST_API}/users/login`,
      data,
    )
    .then(res => res)
    .catch(err => err)
  },
  authenToken: async (data) => {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_HOST_API}/users/authen-token`,
      data,
    )
  },
  resend: async (data) => {
    return await axios.get(
      `${process.env.REACT_APP_SERVER_HOST_API}/users/resend`,
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
    )
    .then(res => res)
    .catch(err => err)
  },
  changePassword: async (data) => {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_HOST_API}/users/change-password`,
      data,
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
    )
    .then(res => res)
    .catch(err => err)
  },
  find: async () => {
    return await axios.get(`${process.env.REACT_APP_SERVER_HOST_API}/users`);
  },
  findMany: async () => {
    return await axios.get(
      `${process.env.REACT_APP_SERVER_HOST_API}/users`
    )
  },
  delete: async (user_id) => {
    return await axios.delete(`${process.env.REACT_APP_SERVER_HOST_API}/users/${user_id}`)
},
};
