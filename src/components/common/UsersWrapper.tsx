import { User } from "../../store/slices/userSlice";
import UserContainer from "./UserContainer";
import "./ProductContainer.scss";
import { UserBrief } from "./UserContainer";

function UsersWrapper({ users }: { users: User[] | UserBrief[] }) {
  return (
    <div className="products-wrapper">
      {users?.map((product) => {
        return <UserContainer key={product._id} user={product}></UserContainer>;
      })}
    </div>
  );
}

export default UsersWrapper;
