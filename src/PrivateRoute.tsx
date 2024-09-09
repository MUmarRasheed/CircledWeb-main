// allow user access to route if they are logged in
// otherwise redirect to login page

import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "./store/hooks";

export default function PrivateRoute({ children }: any) {
  const userState = useAppSelector((state) => state.user.status);
  const location = useLocation();

  if (userState === "unauthorized") {
    return (
      <Navigate
        to={"/login?next=" + location.pathname}
        state={location.state}
        replace={true}
      />
    );
  }

  return children;
}
