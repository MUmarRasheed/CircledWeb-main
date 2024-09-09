import {
  Form,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";
import LoginImage from "/assets/login-image.png";
import Button from "./common/Button";
import Input from "./common/Input";

import "./Login.scss";
import { changePassword } from "../services/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ChangePassword() {
  let actionData: any = useActionData();
  const location = useLocation();
  const navigation = useNavigation();
  const [actionCompleted, setActionCompleted] = useState(false);

  useEffect(() => {
    if (!actionData?.error && actionData?.data) {
      setActionCompleted(true);
    }
  }, [actionData]);

  return (
    <div id="login">
      <div className="wrapper">
        <div className="login-container">
          <h1 className="advent center">Change Password.</h1>

          {actionCompleted && (
            <p className="error-msg success-msg">
              Password changed successfully.{" "}
              <Link to="/products">Click here to continue shopping!</Link>
            </p>
          )}
          {actionData?.error && (
            <p className="error-msg">
              {actionData?.data?.response?.data?.message ||
                actionData?.data?.message}
            </p>
          )}
          {!actionCompleted && (
            <Form method="post" action="">
              <Input
                name="oldPassword"
                type="password"
                required
                label="Password"
              ></Input>
              <Input
                name="newPassword"
                type="password"
                required
                label="New Password"
              ></Input>
              <Input
                name="confirmPassword"
                type="password"
                required
                label="Confirm Password"
              ></Input>
              <Button loading={navigation.state === "submitting"}>
                Submit
              </Button>
            </Form>
          )}
        </div>
      </div>
      <div className="img-container">
        <img src={LoginImage} alt="" />
      </div>
    </div>
  );
}

export default ChangePassword;

export async function changePasswordAction({ request }: any) {
  let formData = await request.formData();
  let oldPassword = formData.get("oldPassword");
  let newPassword = formData.get("newPassword");
  let confirmPassword = formData.get("confirmPassword");

  if (newPassword !== confirmPassword)
    return { error: true, data: { message: "Password doesn't match." } };

  if (newPassword.length < 8)
    return {
      error: true,
      data: { message: "Password should be atleast 8 characters long." },
    };

  try {
    const response = await changePassword({ oldPassword, newPassword });
    return {
      error: false,
      data: { user: response.data.data, token: response.data.data.token },
    };
  } catch (error) {
    return { error: true, data: error };
  }
}
