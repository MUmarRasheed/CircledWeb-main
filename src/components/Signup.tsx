import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import LoginImage from "/assets/signup.png";
import Button from "./common/Button";
import Input from "./common/Input";
import { Link } from "react-router-dom";

import "./Login.scss";
import GoogleLoginIcon from "/assets/googleLogin.png";
import FacebookLoginIcon from "/assets/facebook-login.png";
import { useTranslation } from "react-i18next";
import { signUp } from "../services/auth";
import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { setUser, User } from "../store/slices/userSlice";

function Signup() {
  const { t } = useTranslation("common");
  const navigation = useNavigation();
  const actionData: any = useActionData();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!actionData?.error && actionData?.data) {
      dispatch(setUser(actionData?.data as { user: User; token: string }));

      navigate("/");
    }
  }, [actionData]);

  // const responseData = useActionData();

  return (
    <div id="login">
      <div className="wrapper">
        <div className="login-container">
          <h1 className="advent center">{t("login.getStarted")}</h1>
          {actionData?.error && (
            <p className="error-msg">
              {actionData?.data?.response?.data?.message ||
                actionData?.data?.message}
            </p>
          )}
          <Form method="post" action="/register">
            <Input
              name="name"
              type="text"
              required
              label={t("login.name")}
            ></Input>
            <Input
              name="email"
              type="email"
              required
              label={t("login.email")}
            ></Input>
            {/* PHONE */}
            <Input
              name="phone"
              type="number"
              required
              label={t("login.phone")}
            ></Input>
            <Input
              name="password"
              type="password"
              required
              label={t("login.password")}
            ></Input>
            <Button loading={navigation.state === "submitting"}>
              {t("login.signup")}
            </Button>
          </Form>
          {/* <div className="otherLogins">
            <p className="decor">
              <span>{t("login.orSignUpWith")}</span>
            </p>
            <div className="flex login-icons">
              <img src={GoogleLoginIcon} alt="" />
              <img src={FacebookLoginIcon} alt="" />
            </div>
            <p className="center help-text">
              {t("login.alreadyHaveAccount")}
              <Link to="/login">{t("login.signInNow")}</Link>
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

export default Signup;

export async function registerAction({ request }: any) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const password = formData.get("password");

  if (!name || !email || !phone || !password)
    return { error: true, data: { message: "Please fill all the fields" } };

  if (!password || password.length < 6)
    return {
      error: true,
      data: { message: "Password must be at least 6 characters" },
    };

  if (!phone || phone.length < 10)
    return {
      error: true,
      data: { message: "Phone number must be at least 10 characters" },
    };

  try {
    const response = await signUp({ name, email, phone, password });
    return {
      error: false,
      data: response.data,
    };
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
}
