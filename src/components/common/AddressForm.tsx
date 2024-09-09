import React, { useEffect } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { addAddress, getAddresses } from "../../services/auth";
import { useAppDispatch } from "../../store/hooks";
import { Address } from "../../store/slices/addressSlice";
import Button from "./Button";
import Input from "./Input";
import { addAddress as addAddressInStore } from "../../store/slices/addressSlice";

function AddressForm({ afterSubmit }: { afterSubmit?: () => void }) {
  const dispatch = useAppDispatch();

  const [address, setAddress] = React.useState<Address>({
    street: "",
    city: "",
    phone: "",
    pinCode: "",
  });

  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await addAddress(address);
      dispatch(addAddressInStore(response.data.data));
      setLoading(false);

      if (afterSubmit) {
        afterSubmit();
        return;
      }

      navigate("/profile/address");
    } catch (error: any) {
      setLoading(false);
      setError(error.data?.message || error?.message || "Something went wrong");
    }
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        marginTop: "50px",
      }}
    >
      <h1 className="advent center">Add Address</h1>
      <form method="post" onSubmit={(e) => handleSubmit(e)}>
        {error && (
          <p
            className="error-msg"
            style={{
              marginBottom: "2em",
            }}
          >
            {error}
          </p>
        )}

        <Input
          name="street"
          type="text"
          required
          label="Street"
          value={address.street}
          onChange={(e: any) => {
            setAddress({ ...address, street: e.target.value });
          }}
        ></Input>
        <Input
          name="pinCode"
          type="number"
          required
          label="Pin Code"
          value={address.pinCode}
          onChange={(e: any) => {
            setAddress({ ...address, pinCode: e.target.value });
          }}
        ></Input>
        <Input
          name="city"
          type="text"
          required
          label="City"
          value={address.city}
          onChange={(e: any) => {
            setAddress({ ...address, city: e.target.value });
          }}
        ></Input>
        <Input
          name="phone"
          type="number"
          required
          label="Phone"
          value={address.phone}
          onChange={(e: any) => {
            setAddress({ ...address, phone: e.target.value });
          }}
        ></Input>
        <Button loading={loading}>Add Address</Button>
      </form>
    </div>
  );
}

export default AddressForm;

export async function addressFormAction({ request }: any) {
  let formData = await request.formData();
  let street = formData.get("street");
  let pinCode = formData.get("pinCode");
  let city = formData.get("city");
  let phone = formData.get("phone");
  let address = { street, pinCode, city, phone };

  try {
    const response = await addAddress(address);
    // console.log(response);

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
