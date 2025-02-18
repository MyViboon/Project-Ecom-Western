import axios from "axios";

export const createCategory = async (token, form) => {
  return axios.post("http://localhost:5000/api/catagory", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listCategory = async (token, form) => {
  return axios.get("http://localhost:5000/api/catagory", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeCategory = async (token, id) => {
  return axios.delete(`http://localhost:5000/api/catagory/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
