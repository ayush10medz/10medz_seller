import axios from "axios";
import Cookies from "js-cookie";
import OtpInput from "otp-input-react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { FaXmark } from "react-icons/fa6";
import plus from "../Assets/Images/3dicons.png";
import logo from "../Assets/Images/logo.png";
import { HandleContext } from "../hooks/HandleState";

const Login = () => {
  const [numbersection, setNumberSection] = useState(true); //sift between phone to otp
  const [loading, setLoading] = useState(false); //loading
  const [otp, setOtp] = useState(""); //this save otp
  const [phoneNumber, setPhoneNumber] = useState(""); //this save number of user
  const { openLogin, setOpenWapper, setOpenLogin, handleSellerProfile } = useContext(HandleContext);
  const server = process.env.REACT_APP_API_URL;

  const requestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/api/v1/otp/send`,
        {
          mobileNumber: phoneNumber,
        }
      );

      if (data.success) {
        toast.success(data.message);
        setNumberSection(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const hasEnteredAllDigits = otp?.length === 6;
    if (hasEnteredAllDigits) {
      verifyOtp();
    }
  }, [otp]);

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/v1/otp/verify`,
        {
          mobileNumber: phoneNumber,
          otp: otp,
        }
      );

      if (data.success) {
        // Store the token in cookies
        Cookies.set("token", data.token, {
          expires: 7, // 7 days
          secure: true,
          sameSite: "strict"
        });
        toast.success(data.message);
        setNumberSection(true);
        login();
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to verify OTP. Please check the OTP.");
      setOtp("");
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/seller/sellerlogin`,
        {
          number: phoneNumber,
        },
        config
      );

      toast.success(data.message);
      setPhoneNumber("");
      setOtp("");
      handleSellerProfile();
      setOpenLogin(false);
      setOpenWapper(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const [counter, setCounter] = useState(60);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        setCounter(counter - 1);
      }, 1000);

    if (counter === 0) {
      setIsButtonDisabled(false);
    }

    return () => clearInterval(timer);
  }, [counter]);

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/v1/otp/resend`,
        {
          mobileNumber: phoneNumber,
        }
      );

      if (data.success) {
        toast.success(data.message);
        setCounter(60);
        setIsButtonDisabled(true);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${openLogin ? "scale-[100%]" : "scale-[0%]"} z-[1000] fixed duration-300 ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-7 bg-white rounded-xl w-[400px] h-auto flex flex-col items-start justify-start gap-20`}
      style={{ boxShadow: "0px 0px 17px 6px rgba(0, 0, 0, 0.25)" }}
    >
      <img
        src={plus}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 -z-10"
        alt="plus icon"
      />
      <div className="flex flex-col items-start w-full gap-5 justify-center">
        <FaXmark
          onClick={(e) => {
            e.preventDefault();
            setOpenLogin(false);
            setOpenWapper(false);
          }}
          className="text-[20px] self-end cursor-pointer"
        />
        <div className="flex flex-col items-start justify-start">
          <img src={logo} alt="logo" />
          {numbersection ? (
            <p className="text-[20px] font-bold leading-[100%]">
              Login or SignUp
            </p>
          ) : (
            <p className="text-[20px] font-bold leading-[100%]">
              Enter the OTP
            </p>
          )}
        </div>
      </div>
      {numbersection ? (
        <PhoneNumberInput
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          requestOtp={requestOtp}
          loading={loading}
        />
      ) : (
        <OTPSection
          otp={otp}
          setOtp={setOtp}
          loading={loading}
          handleResendOtp={handleResendOtp}
          isButtonDisabled={isButtonDisabled}
          counter={counter}
          verifyOtp={verifyOtp}
          phoneNumber={phoneNumber}
          setNumberSection={setNumberSection}
        />
      )}
    </div>
  );
};

const PhoneNumberInput = ({
  phoneNumber,
  setPhoneNumber,
  requestOtp,
  loading,
}) => {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-2 ">
      <p className="text-[#2c2c2c] text-[20px] self-center font-semibold">
        Enter the Seller number
      </p>
      <form
        typeof="submit"
        onSubmit={requestOtp}
        className="w-full flex flex-col items-center justify-start gap-10 "
      >
        <div className="w-[70%] relative py-3 flex flex-col items-start justify-start border border-solid border-secondary rounded-xl bg-secondary bg-opacity-15">
          <input
            autoFocus
            className="w-[100%] text-[20px] bg-transparent outline-none px-12   "
            country={"in"}
            maxLength={10}
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          <p className="absolute left-2  text-[20px]">+91</p>
        </div>
        <button
          onClick={requestOtp}
          className="px-6 py-3 text-[20px] text-white font-semibold duration-300 rounded-lg flex flex-row gap-2 items-center justify-center bg-[#FE6903]"
        >
          {loading ? <CgSpinner className="mt-1 animate-spin " /> : null}
          Send OTP
        </button>
      </form>
    </div>
  );
};

const OTPSection = ({
  otp,
  setOtp,
  loading,
  handleResendOtp,
  isButtonDisabled,
  counter,
  verifyOtp,
  phoneNumber,
  setNumberSection,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-10">
      <div className=" flex flex-row items-end justify-between w-full">
        <p className="text-[#2c2c2c]">OTP sent to </p>
        <div className="flex flex-row items-center justify-center gap-2">
          <p>{"+" + phoneNumber}</p>
          <button
            onClick={() => setNumberSection(true)}
            className="capitalize text-[#FE6903] font-bold"
          >
            edit
          </button>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <div className="flex w-full flex-col items-center justify-center gap-3">
          <OtpInput
            OTPLength={6}
            value={otp}
            onChange={setOtp}
            otpType="number"
            disabled={false}
            autoFocus
            className="opt-container"
          />
          <button onClick={handleResendOtp} disabled={isButtonDisabled}>
            {isButtonDisabled ? `Resend OTP in ${counter}s` : "Resend OTP"}
          </button>
        </div>
        <button
          onClick={verifyOtp}
          className="px-6 py-3 text-[20px] text-white font-semibold duration-300 rounded-lg flex flex-row gap-2 items-center justify-center bg-[#FE6903]"
        >
          {loading ? <CgSpinner className="mt-1 animate-spin " /> : null}
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
