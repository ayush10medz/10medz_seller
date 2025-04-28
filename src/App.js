import { useContext, Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import ProtectRoute from "./components/ProtectRoute";
import { HandleContext } from "./hooks/HandleState";
import SocketProvider from "./hooks/SoketProvider";
import Loader from "./components/Shared/Loader";

// Lazy imports for components
const AdminOrders = lazy(() => import("./Pages/AdminOrders"));
const Login = lazy(() => import("./Pages/Login"));
const SellerDashBoard = lazy(() => import("./Pages/SellerDashBoard"));

function App() {
  const { sellerExist } = useContext(HandleContext);
  console.log(sellerExist);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* Protected Routes */}
        <Route
          element={
            <SocketProvider>
              <ProtectRoute user={sellerExist} />
            </SocketProvider>
          }
        >
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <SellerDashBoard />
              </Suspense>
            }
          />
          <Route
            path="/orders"
            element={
              <Suspense fallback={<Loader />}>
                <AdminOrders />
              </Suspense>
            }
          />
        </Route>

        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <ProtectRoute user={!sellerExist} redirect="/">
              <Suspense fallback={<Loader />}>
                <Login />
              </Suspense>
            </ProtectRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<h1>ayush</h1>} />
      </Routes>
    </>
  );
}

export default App;
