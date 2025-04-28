import { createContext, useContext, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { toast } from "react-hot-toast";
import { HandleContext } from "./HandleState";
import {
  CUSTOMER_COMFORMATION,
  CUSTOMER_COMFORMED,
  NEW_ORDER,
} from "../constant/events";

const server = process.env.REACT_APP_API_URL;
export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const { order, setOrder } = useContext(HandleContext);
  // Initialize socket only if the server URL is defined
  const socket = useMemo(() => {
    if (!server) {
      console.error("Socket server URL is not defined");
      return null;
    }
    return io(server, { withCredentials: true });
  }, [server]);

  useEffect(() => {
    if (!socket) return; // Exit if socket is not initialized

    socket.on("connect", () => {});

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
    socket.on(NEW_ORDER, (data) => {
      setOrder((order) => [data, ...order]);
      toast.success("New Order");   
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
  }, []); // Empty dependency array means this effect runs once on mount


  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
