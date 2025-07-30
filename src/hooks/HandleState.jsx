import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export const HandleContext = createContext();

const server = process.env.REACT_APP_API_URL;

const HandleState = ({ children }) => {
  const [sellerExist, setSellerExist] = useState(false);
  const [sellerOrder, setSellerOrder] = useState([]);
  const [order, setOrder] = useState([]);

  const handleSellerLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      };

      // Add `await` here to wait for the response
      const { data } = await axios.get(
        `${server}/api/v1/seller/sellerlogout`,
        config
      );

      if (data.success) {
        setSellerExist(false);
        toast.success("Logout successfully", { id: toastId });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  const handleSellerProfile = async () => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      };
      const response = await axios.get(
        `${server}/api/v1/seller/sellerprofile`,
        config
      );
      if (response.data.success) {
        setSellerExist(true);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setSellerExist(false);
    }
  };

  const handleSellerMyOrder = async () => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      };
      const { data } = await axios.get(
        `${server}/api/v1/seller/sellermyorder`,
        config
      ); // Ensure the route is correct
      setSellerOrder(data.transformedSellerOrder);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  // TODO
  // function sleep(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }
  const handleAllOrder = async () => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      };
      const { data } = await axios.get(
        `${server}/api/v1/seller/sellerallorder`,
        config
      ); // Ensure the route is correct
      // TODO
      // await sleep(4000);
      setOrder(data.transformedAllOrder.reverse());
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    handleSellerMyOrder();
    handleSellerProfile(); // Only call once on component mount
  }, []); // Removed sellerExist from dependency array to avoid infinite loop

  return (
    <HandleContext.Provider
      value={{
        sellerExist,
        handleSellerLogout,
        handleSellerProfile,
        handleSellerMyOrder,
        handleAllOrder,
        order,
        setOrder,
        sellerOrder,
      }}
    >
      {children}
    </HandleContext.Provider>
  );
};

export default HandleState;
