import axios from "axios";
import { get, post } from "./helpers";
const { VITE_API_URL } = import.meta.env;

export function getCart() {
  return get(`${VITE_API_URL}/shop/cart`);
}

export function addToCart(data: {
  product: string;
  color: string;
  size: string;
}) {
  // console.log(data);
  return post(`${VITE_API_URL}/shop/cart`, data);
}

export function deleteFromCart(id: string) {
  return axios.delete(`${VITE_API_URL}/shop/cart/${id}`);
}

export function clearFromCart() {
  return axios.delete(`${VITE_API_URL}/shop/cart/clear`);
}
