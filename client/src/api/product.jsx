import axios from "axios";

export const createProducr = async (token, form) => {
  return axios.post("http://localhost:5000/api/product", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listProduct = async (token, count = 20) => {
  return axios.get("http://localhost:5000/api/products/" + count, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
