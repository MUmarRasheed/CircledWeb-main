import { Address } from "../store/slices/addressSlice";
import { User } from "../store/slices/userSlice";
import { get, post } from "./helpers";
import { Product } from "./products";
const { VITE_API_URL } = import.meta.env;

export const getOrders = async () => {
  try {
    const response = await get(`${VITE_API_URL}/shop/orders`);
    return { error: false, data: response.data };
  } catch (error: any) {
    console.log(error);
    return {
      error: true,
      message: error.data.message || "Error fetching orders",
    };
  }
};

export interface orderData {
  product: string;
  address: string;
  seller: string;
  size: string;
  color: string;
  quantity: number;
  from: string | null;
  to: string | null;
  type: string;
}

export const placeOrders = async (data: orderData[]) => {
  try {
    const response = await post(`${VITE_API_URL}/shop/orders/place-multiple`, {
      orders: data,
    });
    return { error: false, data: response.data };
  } catch (error: any) {
    console.log(error);

    return {
      error: true,
      message: error?.data?.message || "Error buying item",
    };
  }
};

export const createStripeSession = async (amount: number) => {
  try {
    const response = await get(`${VITE_API_URL}/shop/stripe-token/${amount}`);
    return { error: false, data: response.data };
  } catch (error: any) {
    console.log(error);
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Error creating stripe session",
    };
  }
};

export const updateOrderStatus = async (id: string, status: number) => {
  try {
    const response = await post(`${VITE_API_URL}/shop/orders/update`, {
      id,
      status,
    });
    return { error: false, data: response.data };
  } catch (error: any) {
    console.log(error);
    return {
      error: true,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Error updating order status",
    };
  }
};

export const cancelUserOrder = async (orderId: string) => {
  return updateOrderStatus(orderId, 4);
};

export interface Order {
  address: Address;
  color: string;
  createdAt: string;
  from: string;
  grandTotal: number;
  product: Product;
  quantity: number;
  seller: string;
  size: string;
  status: number;
  subTotal: number;
  tax: number;
  to: string;
  type: "rent" | "buy";
  updatedAt: string;
  user: User;
  _id: string;
}

export const OrderStatus: any = {
  0: "Order Placed and awaits confirmation from seller",
  1: "Seller Confirmed",
  2: "Seller Shipped",
  3: "Delivered",
  4: "Cancelled by user",
  5: "Cancelled by seller",
};

export const getClientOrders = async () => {
  try {
    const response = await get(`${VITE_API_URL}/shop/seller/orders`);
    return { error: false, data: response.data };
  } catch (error: any) {
    console.log(error);
    return {
      error: true,
      message: error.data.message || "Error fetching orders",
    };
  }
};
