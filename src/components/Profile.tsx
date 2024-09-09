import { Link } from "react-router-dom";
import "./Profile.scss";
import ArrowIcon from "/assets/icons/arrow.svg";

function Profile() {
  return (
    <div>
      <div className="width-control">
        <div className="item-group">
          <h2 className="item-head advent">My Profile</h2>
          <div className="profile-items">
            <Link to="edit" className="profile-item">
              Update Profile
              <img src={ArrowIcon} alt="" />
            </Link>
            <Link to="change-password" className="profile-item">
              Change Password
              <img src={ArrowIcon} alt="" />
            </Link>
            <Link to="address" className="profile-item">
              My Addresses
              <img src={ArrowIcon} alt="" />
            </Link>
          </div>
        </div>
        <div className="item-group">
          <h2 className="item-head advent">Chats</h2>
          <div className="profile-items">
            <Link to="/chat" className="profile-item">
              My Chats
              <img src={ArrowIcon} alt="" />
            </Link>
          </div>
        </div>

        <div className="item-group">
          <h2 className="item-head advent">Products</h2>
          <div className="profile-items">
            <Link to="my-products/new" className="profile-item">
              Add Product
              <img src={ArrowIcon} alt="" />
            </Link>
            <Link to="my-products" className="profile-item">
              My Products
              <img src={ArrowIcon} alt="" />
            </Link>
          </div>
        </div>
        <div className="item-group">
          <h2 className="item-head advent">Orders</h2>
          <div className="profile-items">
            <Link to="my-orders" className="profile-item">
              My orders
              <img src={ArrowIcon} alt="" />
            </Link>
            <Link to="orders" className="profile-item">
              Client orders
              <img src={ArrowIcon} alt="" />
            </Link>
          </div>
        </div>
        <div className="item-group">
          <h2 className="item-head advent">Purchases</h2>
          <div className="profile-items">
            <Link to="/insurance" className="profile-item">
              Insurance
              <img src={ArrowIcon} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
