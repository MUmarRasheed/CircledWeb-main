import {
  Form,
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import LoginImage from "/assets/login-image.png";
import Button from "./common/Button";
import Input from "./common/Input";
import { Link } from "react-router-dom";

import "./Login.scss";
import GoogleLoginIcon from "/assets/googleLogin.png";
import FacebookLoginIcon from "/assets/facebook-login.png";
import { useTranslation } from "react-i18next";
import { signIn } from "../services/auth";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { setUser, User } from "../store/slices/userSlice";

function Login() {
  const { t } = useTranslation("common");
  let actionData: any = useActionData();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    if (location.state)
      localStorage.setItem("orderState", JSON.stringify(location.state));
  }, [location]);

  useEffect(() => {
    if (!actionData?.error && actionData?.data) {
      dispatch(setUser(actionData?.data as { user: User; token: string }));
      navigate(searchParams.get("next") || "/", {
        state: JSON.parse(localStorage.getItem("orderState") || "{}"),
      });
    }
  }, [actionData]);

  return (
    <div id="login">
      <div className="wrapper">
        <div className="login-container">
          <h1 className="advent center">Login.</h1>
          {searchParams.get("next") && (
            <p className="center help-text">
              Login to continue to{" "}
              <span className="bold">
                {searchParams.get("next")?.replace("/", " ")}
              </span>
            </p>
          )}
          {actionData?.error && (
            <p className="error-msg">
              {actionData?.data?.response?.data?.message ||
                actionData?.data?.message}
            </p>
          )}
          <Form method="post" action={"/login" + location.search}>
            <Input
              name="email"
              type="email"
              required
              label={t("login.email")}
            ></Input>
            <Input
              name="password"
              type="password"
              required
              label={t("login.password")}
            ></Input>
            <Button loading={navigation.state === "submitting"}>
              {t("login.signIn")}
            </Button>
          </Form>
          {/* <div className="otherLogins">
            <p className="decor">
              <span>{t("login.orSignInWith")}</span>
            </p>
            <div className="flex login-icons">
              <img src={GoogleLoginIcon} alt="" />
              <img src={FacebookLoginIcon} alt="" />
            </div>
            <p className="center help-text">
              {t("login.dontHaveAccount")}{" "}
              <Link to="/register">{t("login.registerNow")}</Link>
            </p>
          </div> */}
        </div>
      </div>
      <div className="img-container">
        <img src={LoginImage} alt="" />
      </div>
    </div>
  );
}

export default Login;

export async function loginAction({ request }: any) {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");

  try {
    const response = await signIn({ email, password });
    return {
      error: false,
      data: { user: response.data.data, token: response.data.data.token },
    };
  } catch (error) {
    return { error: true, data: error };
  }
}
