import React, { useContext, useState } from "react";
import logo from "../../Assets/Images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { GoListUnordered } from "react-icons/go";
import { IoMenu } from "react-icons/io5";
import { HiMiniXMark } from "react-icons/hi2";
import { HandleContext } from "../../hooks/HandleState";

const Sidemenu = () => {
    const location = useLocation();
    const [openMenu, setOpenMenu] = useState(false);
    const { handleSellerLogout } = useContext(HandleContext);
    return (
        <>
            <div className="fixed  top-0 left-0 flex    p-3">
                <div
                    className="bg-[#FE6903] p-2 rounded-xl cursor-pointer "
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenMenu(true);
                    }}
                >
                    <IoMenu className="text-white   text-[36px]" />
                </div>
            </div>
            <aside
                className={` fixed ${openMenu ? "left-0" : "left-[-100%]"
                    }  bg-white  duration-500 ease-in-out  w-[100%] lg:w-[20%] h-[100vh] rounded-r-xl flex  flex-col items-start px-6  gap justify-start gap-32 py-7 `}
                style={{ boxShadow: "0px 0px 17px 12px rgba(0, 0, 0, 0.25)" }}
            >
                <div
                    className=" flex  absolute top-0 right-0 p-6  cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenMenu(false);
                    }}
                >
                    {" "}
                    <HiMiniXMark className="text-[36px] text-[#4471D4] " />
                </div>
                <Link to={"/"}>  <img className="relative left-10" src={logo} alt="logo" /></Link>
                <div className="w-full flex flex-col items-center h-full justify-between">
                    <nav className="w-full flex flex-col items-start justify-center  gap-7">
                        <Link
                            className={`flex flex-row items-center justify-start px-5 gap-2 text-[20px] w-full py-3 ${location.pathname === "/dashboard"
                                    ? "bg-[#FE6903]"
                                    : "bg-transparent"
                                }   rounded-xl bg-opacity-10 `}
                            to={"/"}
                        >
                            <MdDashboard /> <span className="capitalize">dashboard</span>
                        </Link>
                     
                        <Link
                            className={`flex flex-row items-center justify-start px-5 gap-2 text-[20px] w-full py-3  ${location.pathname === "/orders"
                                    ? "bg-[#FE6903]"
                                    : "bg-transparent"
                                }   rounded-xl bg-opacity-10 `}
                            to={"/orders"}
                        >
                            <GoListUnordered />
                            <span className="capitalize">Orders</span>
                        </Link>
                    </nav>
                    <button
                        onClick={handleSellerLogout}
                        className="px-6  py-3 flex flex-row items-center justify-center gap-4 text-[20px] bg-[#FE6903] duration-300 hover:bg-transparent border border-solid border-[#FE6903] hover:text-[#FE6903] rounded-xl text-white font-semibold"
                    >
                        <span>Logout </span> <MdLogout className="mt-1" />
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidemenu;
