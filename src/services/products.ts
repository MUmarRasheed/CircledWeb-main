import axios from "axios";
import { User } from "../store/slices/userSlice";
import { get } from "./helpers";
const { VITE_API_URL } = import.meta.env;
import nextId from "react-id-generator";

export interface Category {
  _id: string;
  name: string;
  image: string;
  description: string;
}

export interface Product {
  _id: string;
  category: Category;
  colors: string[] | null;
  costPrice: number;
  description: string;
  images: string[];
  isDeleted: boolean;
  name: string;
  rentPrice: number;
  retailPrice: number;
  sizes: string[] | null;
  stock: number;
  styleNotes: string;
  type: "rent" | "buy" | "both";
  user: User;
  relatedProducts?: Product[];
}

export const getProductById = async (id: string) => {
  try {
    const response = await get(`${VITE_API_URL}/products/${id}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async () => {
  try {
    const response = await get(`${VITE_API_URL}/category`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getProducts = async (
  page = 0,
  limit = 12,
  type = "both",
  search = "",
  user = ""
) => {
  try {
    let url = `${VITE_API_URL}/products?page=${page}&limit=${limit}&type=${type}`;
    if (search) url += `&search=${search}`;
    if (user) url += `&user=${user}`;
    // console.log(url);
    const response = await get(url);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByUser = async (userId: string) => {
  try {
    const response = await get(`${VITE_API_URL}/products/user/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDashboard = async () => {
  try {
    const response = await get(`${VITE_API_URL}/app/dashboard`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (product: Product) => {
  const response = await axios.post(`${VITE_API_URL}/products/add`, product);

  if (response.status !== 200) {
    throw new Error(response.data.message);
  }

  return response.data;
};

export const updateProductById = async (id: string, product: Product) => {
  const response = await axios.post(
    `${VITE_API_URL}/products/update/${id}`,
    product
  );

  if (response.status !== 200) {
    throw new Error(response.data.message);
  }

  return response.data;
};

export const getProductsByCategory = async (category: string) => {
  try {
    const response = await get(`${VITE_API_URL}/products/category/${category}`);

    if (response.status !== 200) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const archiveProduct = async (id: string) => {
  try {
    const response = await axios.delete(`${VITE_API_URL}/products/${id}`);

    if (response.status !== 200) {
      throw new Error(response.data.message);
    }

    return { error: false, data: response.data };
  } catch (error: any) {
    console.log(error);
    return { error: true, message: error.message || "Couldn't delete product" };
  }
};

export const uploadProductPicture = async (image: any) => {
  let formData = new FormData();
  let blob = await fetch(image).then((r) => r.blob());
  let fileName = nextId() + "." + blob.type.split("/")[1];
  let file = new File([blob], fileName);
  formData.append("image", file, fileName);

  const res = await axios.post(`${VITE_API_URL}/products/upload`, formData, {
    headers: {
      "Content-Type": `multipart/form-data`,
    },
  });

  return res;
};

export function checkProductAvailability(product: Product) {
  return !product.isDeleted && product.stock > 0;
}
