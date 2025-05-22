import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "react-hot-toast";
import { HandleContext } from "./HandleState";
import Cookies from "js-cookie";
import {
  CUSTOMER_COMFORMATION,
  CUSTOMER_COMFORMED,
  NEW_ORDER,
} from "../constant/events";

const server = process.env.REACT_APP_API_URL;
export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const { order, setOrder, sellerExist, handleAllOrder } = useContext(HandleContext);
  const [newOrderId, setNewOrderId] = useState(null); // State to signal new order for highlighting
  // Initialize socket only if the server URL is defined
  const socket = useMemo(() => {
    const token = Cookies.get("token");
    if (!server || !sellerExist || !token) {
      console.error("Socket server URL is not defined or user not authenticated");
      return null;
    }
    return io(server, {
      withCredentials: true,
      auth: {
        token: token,
      },
    });
  }, [server, sellerExist]);

  useEffect(() => {
    if (!socket) return; // Exit if socket is not initialized

    socket.on("connect", () => { });

    socket.on("connect_error", (error) => {
      toast.error("Connection error:", error);
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected:", reason);
    });

    return () => {
      // Clean up socket listeners
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, [socket]); // Add socket as a dependency

  const handleUpdateOrder = (updatedOrder) => {
    setOrder((prevOrders) =>
      prevOrders.map((order) =>
        order._id === updatedOrder._id ? updatedOrder : order // Replace the entire object
      )
    );
  };

  useEffect(() => {
    if (!socket) return; // Ensure socket is initialized before adding listeners
    socket.on(NEW_ORDER, (data) => {
      setOrder((order) => [data, ...order]);
      toast.success("New Order");
      // Play notification sound
      const audio = new Audio('/sounds/new_order.mp3'); // Assuming you have a sound file at public/sounds/new_order.mp3
      audio.play().catch(error => console.error("Error playing sound:", error));
      // Signal new order for highlighting
      setNewOrderId(data._id);
      // Optionally refetch all orders to ensure consistent state if needed
      // handleAllOrder();
    });

    socket.on(CUSTOMER_COMFORMED, (data) => {
      console.log(data);
      handleUpdateOrder(data);
      // toast.success("order updated!");
    });

    // Cleanup both event listeners when component unmounts
    return () => {
      socket.off(NEW_ORDER);
      socket.off(CUSTOMER_COMFORMED);
    };
  }, [socket, handleUpdateOrder, setOrder]); // Add socket, handleUpdateOrder, and setOrder to dependencies


  return (
    <SocketContext.Provider value={{
      socket,
      newOrderId,
      setNewOrderId,
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
