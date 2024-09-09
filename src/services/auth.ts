import axios from "axios";
import { get, post } from "./helpers";
const { VITE_API_URL } = import.meta.env;

export function signIn(data: { email: string; password: string }) {
  return axios.post(`${VITE_API_URL}/user/login`, {
    ...data,
    type: "user",
  });
}

export function signUp(data: {
  email: string;
  password: string;
  name: string;
  phone: string;
}) {
  return axios.post(`${VITE_API_URL}/user/register`, data);
}

export function updateProfile(data: {
  name?: string;
  email?: string;
  address?: string;
  description?: string;
  image?: string;
}) {
  return axios.post(`${VITE_API_URL}/user/update`, data);
}

export function getAddresses() {
  return get(`${VITE_API_URL}/address`);
}

export function addAddress(data: {
  street: string;
  phone: string;
  city: string;
  pinCode: string;
}) {
  return post(`${VITE_API_URL}/address`, data);
}

export function deleteAddress(id: string) {
  return axios.delete(`${VITE_API_URL}/address/${id}`);
}

export function changePassword(data: {
  oldPassword: string;
  newPassword: string;
}) {
  return post(`${VITE_API_URL}/user/change-password`, data);
}

export function getUsers(page: number) {
  return get(`${VITE_API_URL}/user/users?page=${page}&limit=${12}`);
}

export async function getPublicProfile(id: string) {
  const res = await Promise.all([
    await get(`${VITE_API_URL}/user/public-profile/${id}`),
    await get(`${VITE_API_URL}/products?user=${id}&type=buy&limit=4`),
    await get(`${VITE_API_URL}/products?user=${id}&type=rent&limit=4`),
  ]);

  return {
    user: res[0].data.data,
    buy: res[1].data.data,
    rent: res[2].data.data,
  };
}

export function getUserProfile(id: string) {
  return get(`${VITE_API_URL}/user/public-profile/${id}`);
}

export async function uploadProfilePicture(image: any, id: string) {
  let formData = new FormData();
  let blob = await fetch(image).then((r) => r.blob());
  let fileName = id + "." + blob.type.split("/")[1];
  let file = new File([blob], fileName);
  formData.append("image", file, fileName);

  const res = await axios.post(
    `${VITE_API_URL}/user/upload/profile-pic`,
    formData,
    {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    }
  );

  return res;
}
