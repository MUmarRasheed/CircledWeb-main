import React, { useEffect } from "react";
import { deleteAddress } from "../services/auth";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import "./AddressList.scss";
import Button from "./common/Button";
import {
  Address,
  removeAddress as removeAddressInStore,
} from "../store/slices/addressSlice";
import { Link } from "react-router-dom";
import Popup from "./common/Popup";
import AddressForm from "./common/AddressForm";
import DeleteIcon from "/assets/icons/delete.svg";

function AddressList({
  selector,
  selected,
}: {
  selector?: (address: Address) => void;
  selected?: Address | null;
}) {
  const addresses = useAppSelector((state) => state.address.data);
  const dispatch = useAppDispatch();
  const [error, setError] = React.useState<string | null>(null);
  const [addAddressPopupOpen, setAddAddressPopupOpen] = React.useState(false);

  function closeAddAddressPopup() {
    setAddAddressPopupOpen(false);
  }

  async function removeAddress(id: string, index: number) {
    try {
      await deleteAddress(id);

      dispatch(removeAddressInStore({ index }));
    } catch (error: any) {
      setError(error.data?.message || error?.message || "Something went wrong");
    }
  }

  return (
    <div id="address-list">
      <div className="flex address-header wrap">
        <h1 className="advent center">Your Addresses</h1>
        <button
          className="new-address-btn"
          onClick={() => selector && setAddAddressPopupOpen(true)}
        >
          {selector ? (
            "Add Address"
          ) : (
            <Link to="/profile/address/new">Add Address</Link>
          )}
        </button>
      </div>
      {selector && <p className="selector">Select an address to deliver</p>}
      {error && <p className="error-msg">{error}</p>}
      <div className="address-list">
        {addresses.map((address, index) => (
          <div
            className={
              "address " + (selected?._id === address?._id ? "selected" : "")
            }
            onClick={() => {
              selector && selector(address);
            }}
            key={"address-" + address?._id}
          >
            <div className="address-info">
              <p className="address-line">
                {address?.street}, {address?.city} - {address?.pinCode}
              </p>
              <p>Phone: {address?.phone}</p>
            </div>
            {!selector && (
              <div className="address-actions">
                <Button
                  className="delete-btn"
                  onClick={() => {
                    address._id && removeAddress(address._id, index);
                  }}
                >
                  <img src={DeleteIcon} alt="" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      <Popup open={addAddressPopupOpen} close={closeAddAddressPopup}>
        <AddressForm afterSubmit={closeAddAddressPopup}></AddressForm>
      </Popup>
    </div>
  );
}

export default AddressList;
