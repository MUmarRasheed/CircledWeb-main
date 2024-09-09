import "./App.scss";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home";
import RootLayout from "./Layouts/RootLayout";
import Login, { loginAction } from "./components/Login";
import Signup, { registerAction } from "./components/Signup";
import ViewProduct, { productLoader } from "./components/ViewProduct";
import EditProfile, { updateProfileAction } from "./components/EditProfile";
import React, { Suspense, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setUnauthorized, setUser } from "./store/slices/userSlice";
import { getCategories } from "./services/products";
import { setCategories } from "./store/slices/categorySlice";
import Products from "./components/Products";
import AddProduct, { addProductAction } from "./components/AddProduct";
import AddressForm from "./components/common/AddressForm";
import { getAddresses } from "./services/auth";
import { setAddress } from "./store/slices/addressSlice";
import AddressList from "./components/AddressList";
import MyProducts from "./components/MyProducts";
import Categories from "./components/Categories";
import Profile from "./components/Profile";
import CategoryView, { categoryLoader } from "./components/CategoryView";
import AllCategories from "./components/AllCategories";
import OrderConfirmation from "./components/OrderConfirmation";
import _404 from "./components/404";
import PrivateRoute from "./PrivateRoute";
import Terms from "./TextPages/Terms";
import DataProtection from "./TextPages/DataProtection";
import ScrollToTop from "./ScrollToTop";
import CookiePolicy from "./TextPages/CookieConsent";
import ImprintPolicy from "./TextPages/ImprintPolicy";
import RevocationPolicy from "./TextPages/RevocationPolicy";
import FAQ from "./TextPages/FAQ";
import AboutUs from "./TextPages/ContactUs";
import WhyCW from "./TextPages/WhyCW";
import HowItWorks from "./TextPages/HowItWorks";
import ContactUs from "./TextPages/ContactUs";
import MyOrders from "./components/MyOrders";
import PaymentWrapper from "./components/Payment";
import CompleteOrder from "./components/CompleteOrder";
import ClientOrders from "./components/ClientOrders";
import ChangePassword, {
  changePasswordAction,
} from "./components/ChangePassword";
import Loading from "./components/common/Loading";
import Designers from "./components/Designers";
import PublicProfile from "./components/PublicProfile";
import { getCart } from "./services/cart";
import { setCartItems } from "./store/slices/cartSlice";
import MyCart from "./components/MyCart";
import News from "./TextPages/News";
import Insurance from "./TextPages/Insurance";

const Chat = React.lazy(() => import("./components/chat/Chat"));
const StartChat = React.lazy(() => import("./components/chat/StartChat"));
const Messaging = React.lazy(() => import("./components/chat/Messaging"));
const EmptyChat = React.lazy(() => import("./components/chat/EmptyChat"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <>
          <ScrollToTop></ScrollToTop>
          <RootLayout />
        </>
      }
    >
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} action={loginAction}></Route>
      <Route path="designers" element={<Designers />}></Route>
      <Route
        path="register"
        element={<Signup />}
        action={registerAction}
      ></Route>
      <Route
        path="products/:id"
        element={<ViewProduct />}
        loader={productLoader}
      ></Route>
      <Route path="users/:id" element={<PublicProfile />}></Route>
      <Route
        path="profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="profile/edit"
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
        action={updateProfileAction}
      ></Route>
      <Route
        path="chat"
        element={
          <PrivateRoute>
            <Suspense fallback={<Loading />}>
              <Chat />
            </Suspense>
          </PrivateRoute>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<Loading />}>
              <EmptyChat />
            </Suspense>
          }
        ></Route>
        <Route
          path="start/:id"
          element={
            <Suspense fallback={<Loading />}>
              <StartChat />
            </Suspense>
          }
        ></Route>
        <Route
          path="user/:id"
          element={
            <Suspense fallback={<Loading />}>
              <Messaging />
            </Suspense>
          }
        ></Route>
      </Route>
      <Route
        path="profile/change-password"
        element={
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        }
        action={changePasswordAction}
      ></Route>
      <Route path="products" element={<Products />}></Route>
      <Route
        path="profile/my-products/new"
        element={
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        }
        action={addProductAction}
      ></Route>
      <Route
        path="profile/my-products/:id"
        element={
          <PrivateRoute>
            <AddProduct edit={true} />
          </PrivateRoute>
        }
        action={addProductAction}
      ></Route>
      <Route
        path="browse/:id"
        element={<CategoryView />}
        loader={categoryLoader}
      ></Route>
      <Route path="browse" element={<AllCategories />}></Route>
      <Route path="news" element={<News n={12} />}></Route>

      <Route
        path="profile/address/new"
        element={
          <PrivateRoute>
            <AddressForm />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="profile/address"
        element={
          <PrivateRoute>
            <AddressList />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="profile/my-products"
        element={
          <PrivateRoute>
            <MyProducts />
          </PrivateRoute>
        }
      ></Route>
      <Route path="categories" element={<Categories />}></Route>
      <Route
        path="orders/confirmation"
        element={
          <PrivateRoute>
            <OrderConfirmation />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="profile/my-orders"
        element={
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="orders/confirmation/payment"
        element={
          <PrivateRoute>
            <PaymentWrapper />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="cart"
        element={
          <PrivateRoute>
            <MyCart />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="insurance"
        element={
          <PrivateRoute>
            <Insurance />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="orders/confirmation/complete"
        element={
          <PrivateRoute>
            <CompleteOrder />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="profile/orders"
        element={
          <PrivateRoute>
            <ClientOrders />
          </PrivateRoute>
        }
      ></Route>

      {/* TEXT PAGES */}
      <Route path="terms" element={<Terms />}></Route>
      <Route path="data-protection" element={<DataProtection />}></Route>
      <Route path="cookie-policy" element={<CookiePolicy />}></Route>
      <Route path="imprint" element={<ImprintPolicy />}></Route>
      <Route path="revocation-policy" element={<RevocationPolicy />}></Route>
      <Route path="faq" element={<FAQ />}></Route>
      <Route path="about" element={<AboutUs />}></Route>
      <Route path="about-us" element={<WhyCW />}></Route>
      <Route path="how-to" element={<HowItWorks />}></Route>
      <Route path="how-it-works" element={<HowItWorks />}></Route>
      <Route path="contact" element={<ContactUs />}></Route>

      <Route path="loading" element={<Loading />}></Route>
      <Route path="*" element={<_404 />}></Route>
    </Route>
  )
);

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    // read user from local storage

    async function fetchCategories() {
      const categories = await getCategories();
      if (categories?.data) {
        dispatch(setCategories({ category: categories.data }));
      }
    }

    const user = localStorage.getItem("user");

    if (user) {
      dispatch(setUser(JSON.parse(user)));
    } else dispatch(setUnauthorized());

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchAddress() {
      const address = await getAddresses();
      dispatch(setAddress({ address: address.data.data }));

      const cart = await getCart();
      dispatch(setCartItems(cart.data.data));
    }

    if (user.status === "authorized") {
      fetchAddress();
    }
  }, [user.status]);

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
