import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicProfile } from "../services/auth";
import { getProducts, Product } from "../services/products";
import Button from "./common/Button";
import Loading from "./common/Loading";
import ProductsWrapper from "./common/ProductsWrapper";
import "./PublicProfile.scss";

import AvatarIcon from "/assets/avtar.png";
import instaIcon from "/assets/icons/instagram.svg";
import starIcon from "/assets/icons/star.svg";
import locationIcon from "/assets/icons/location.svg";
import { Link } from "react-router-dom";

interface ProductData {
  docs: Product[];
  hasNextPage: boolean;
  totalDocs: number;
  page: number;
  limit: number;
  nextPage: number;
}

function PublicProfile() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState({
    type: "",
    loading: false,
  });
  const [showTab, setShowTab] = useState<"buy" | "rent">("buy");

  const [data, setData] = useState<{
    user: {
      address: string;
      name: string;
      image: string;
      description: string;
      _id: string;
    };
    buy: ProductData;
    rent: ProductData;
  }>();

  useEffect(() => {
    async function fetchProfile() {
      if (!id) return;
      const res = await getPublicProfile(id);
      setData(res);
      setLoading(false);
      // console.log(res);
    }

    fetchProfile();
  }, []);

  function getCurrentTab() {
    return showTab === "rent" ? data?.rent : data?.buy;
  }

  async function loadMore() {
    const tab = getCurrentTab();
    const type = showTab;
    if (!tab) return;
    setMoreLoading({ type: showTab, loading: true });
    const res = await getProducts(
      tab.nextPage,
      tab.limit,
      showTab,
      "",
      data?.user._id
    );
    const newData: any = structuredClone(data);
    newData[type].docs.push(...res.data.docs);
    newData[type] = {
      ...res.data,
      docs: newData[type].docs,
    };
    setData(newData);
    setMoreLoading({ loading: false, type: "" });
  }

  if (loading) return <Loading></Loading>;

  return (
    <div id="public-profile">
      <div className="profile-header">
        <div className="detail flex">
          <img src={data?.user?.image || AvatarIcon} id="profile_pic" alt="" />
          <div className="user-name">
            <p>{data?.user?.name}</p>

            <div className="stars flex">
              <img src={starIcon} alt="" />
              5.0 (8)
            </div>
          </div>
        </div>

        <p className="desc">{data?.user?.description}</p>
        <div className="location flex">
          <img src={locationIcon} alt="" />
          <span>{data?.user?.address} </span>
        </div>
        <div className="message-grp flex">
          <Link to={"/chat/start/" + data?.user._id}>
            <Button>MESSAGE</Button>
          </Link>
          <img src={instaIcon} alt="" />
        </div>
      </div>
      <div className="products-content">
        <div className="tabs flex wrap">
          <p
            onClick={() => setShowTab("buy")}
            className={showTab === "buy" ? "active-tab" : ""}
          >
            Buy ({data?.buy.totalDocs})
          </p>
          <p
            onClick={() => setShowTab("rent")}
            className={showTab === "rent" ? "active-tab" : ""}
          >
            Rent ({data?.rent.totalDocs})
          </p>
        </div>
        <ProductsWrapper
          products={
            (showTab === "rent" ? data?.rent.docs : data?.buy.docs) || []
          }
        />
        {getCurrentTab()?.hasNextPage && (
          <Button
            onClick={loadMore}
            loading={moreLoading.type === showTab && moreLoading.loading}
            className="bold-500"
          >
            View More
          </Button>
        )}
      </div>
    </div>
  );
}

export default PublicProfile;
