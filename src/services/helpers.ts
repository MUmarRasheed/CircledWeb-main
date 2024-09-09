import axios from "axios";

// get token from store

function getConfig() {
  let token = "";

  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    token = user?.token;
  } catch (error) {
    console.log(error);
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export function get(url: string) {
  return axios.get(url, getConfig());
}

export function post(url: string, data: any) {
  return axios.post(url, data, getConfig());
}

export function put(url: string, data: any) {
  return axios.put(url, data, getConfig());
}

export function del(url: string) {
  return axios.delete(url, getConfig());
}
