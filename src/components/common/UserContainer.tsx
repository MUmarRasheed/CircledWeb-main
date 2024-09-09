import "./ProductContainer.scss";
import { Link, useNavigate } from "react-router-dom";
import AvatarIcon from "/assets/avtar.png";
import { User } from "../../store/slices/userSlice";

export interface UserBrief {
  name: string;
  _id: string;
  image: string;
}

function UserContainer({
  user,
  onClick,
}: {
  user: UserBrief | User;
  onClick?: (user: UserBrief | User) => void;
}) {
  const navigate = useNavigate();

  return (
    <div className="producta-container">
      <div
        onClick={() => {
          if (onClick) {
            onClick(user);
          } else {
            navigate("/users/" + user._id);
          }
        }}
      >
        <div className="productz-img">
          <img
            src={
              user.image ||
              "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
            }
            alt=""
          />
        </div>
        <div className="pro-info">
          <h3 className="advent" style={{ textTransform: "uppercase" }}>
            {user.name}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default UserContainer;
