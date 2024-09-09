import "./Header.scss";
import { useTranslation } from "react-i18next";
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigation } from "react-router-dom";

import Logo from "/assets/new-logo.png";
import Circled from "/assets/circled.png";
import searchIcon from "/assets/icons/search.svg";
import sortIcon from "/assets/icons/sort.svg";
import menuIcon from "/assets/icons/menu.svg";
import closeIcon from "/assets/icons/close.svg";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Avatar from "/assets/avtar.png";
import LogoutIcon from "/assets/icons/logout.svg";
import { logoutUser } from "../store/slices/userSlice";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Marquee from "../components/common/Marquee";
import DropDownMenu from "../components/common/DropDownMenu";

function Header() {
  const { t } = useTranslation("navigation");
  const [openMenu, setOpenMenu] = useState(false);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchParams, _] = useSearchParams();
  const { width } = useWindowDimensions();

  // submenu
  const [menuOpen, setMenuOpen] = useState(false);

  // get user from store
  const user = useAppSelector((state) => state.user);

  function closeMenu() {
    setOpenMenu(false);
  }

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, []);

  useEffect(() => {
    setOpenMenu(false);
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  return (
    <div id="navbar">
      <div className="nav-coupon">
        <p className="center">
          {width > 500 ? (
            "USE 'APPYRENTING' FOR £10 OFF YOUR FIRST RENTAL"
          ) : (
            <Marquee>USE 'APPYRENTING' FOR £10 OFF YOUR FIRST RENTAL</Marquee>
          )}
        </p>
      </div>
      <div id="mobile-header">
        <img
          src={menuIcon}
          alt=""
          className={"menu-icon " + (openMenu ? "hide" : "")}
          onClick={() => setOpenMenu(true)}
        />
        <img
          src={closeIcon}
          alt=""
          className={"close-icon " + (openMenu ? "" : "hide")}
          onClick={closeMenu}
        />
        <div className="logo flex">
          <img src={Logo} className="symbol" id="comp-logo" />
          {/* <img src={Circled} id="comp-text" /> */}
        </div>
        <div className="dummy"></div>
      </div>
      <div className={"nav " + (openMenu ? "active" : "")}>
        <div className="flex branding">
          <div className="leftGroup">
            {/* language dropdown */}
            <select name="language" className="langSelect">
              <option value="en">ENG</option>
            </select>
            <NavLink to="/how-to">{t("how-to")}</NavLink>
          </div>
          <div className={`flex flex-column centerGroup`}>
            <img src={Logo} id="comp-logo" />
            {/* <img src={Circled} id="comp-text" /> */}
          </div>
          {!user.token && (
            <div className="rightGroup">
              <NavLink to="/login">{t("signin")}</NavLink> /{" "}
              <NavLink to="/register">{t("signup")}</NavLink>
            </div>
          )}
          {user.token && (
            <div className="rightGroup flex">
              <NavLink to="/cart">My Cart</NavLink>
              <div className="profile flex">
                <NavLink to="/profile">{user.user?.name}</NavLink>
                <img
                  src={user.user?.image || Avatar}
                  alt=""
                  className="avatar"
                />
              </div>
              <div
                className="logout flex"
                onClick={() => {
                  dispatch(logoutUser());
                }}
              >
                <span>Logout</span>
                <img src={LogoutIcon} className="logout-icon" />
              </div>
            </div>
          )}
        </div>
        <div className="navigation flex ">
          <NavLink to="/">{t("home")}</NavLink>
          <NavLink to="/designers">Designers</NavLink>
          <NavLink to="/browse">Clothing</NavLink>
          <div className="relative">
            <span className="pointer" onClick={() => setMenuOpen(true)}>
              Services
            </span>

            <DropDownMenu open={menuOpen} close={() => setMenuOpen(false)}>
              <div className="contain-link">
                <NavLink to="/products?type=buy">Buy</NavLink>
                <NavLink to="/products?type=rent">Rent</NavLink>
              </div>
            </DropDownMenu>
          </div>
          {/* <NavLink to="/browse">Categories</NavLink> */}
          {/* <NavLink to="/profile/my-products/new">Sell A Product</NavLink> */}
          <NavLink to="/how-it-works">{t("howItWorks")}</NavLink>
          <NavLink to="/about-us">{t("aboutUsOrWhyCW")}</NavLink>
          <NavLink to="/news">{t("newsOrMagazine")}</NavLink>
          <form
            action="get"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/products" + "?search=" + search);
            }}
          >
            <div className="search-bar flex">
              <button>
                <img src={searchIcon} alt="" />
              </button>
              <input
                type="text"
                placeholder={t("search")!}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="search-input"
              />
              {/* <img src={sortIcon} alt="" /> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Header;
