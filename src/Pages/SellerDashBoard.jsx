import React, { useContext, useEffect, useState } from "react";
import Sidemenu from "../components/Shared/Sidemenu";
import { BarChart } from "../components/Ui/Chart";
import { HandleContext } from "../hooks/HandleState";

const SellerDashBoard = () => {
  const { sellerOrder } = useContext(HandleContext);
  const isToday = (dateString) => {
    const today = new Date();
    const orderDate = new Date(dateString);

    return (
      today.getFullYear() === orderDate.getFullYear() &&
      today.getMonth() === orderDate.getMonth() &&
      today.getDate() === orderDate.getDate()
    );
  };
  return (
    <main className="w-[100vw]   flex flex-row items-start justify-start ">
      <Sidemenu />
      <div className="w-full   ">
        <div className=" h-full px-12 py-20 md:py-6 flex flex-col items-center justify-center gap-20 ">
          <div className="grid grid-cols-12 gap-7 ">
            <NumberCard
              targetCount={sellerOrder?.length}
              cardDetails={"No of orders"}
            />
            <NumberCard
              targetCount={sellerOrder?.reduce(
                (total, order) => total + order.price,
                0
              )}
              cardDetails={"Total revenue"}
            />
            <NumberCard
              targetCount={
                sellerOrder?.filter((order) => isToday(order.createdAt)).length
              }
              cardDetails={"order of today"}
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center md:px-12 gap-10 ">
            <p className="text-[24px] md:text-[36px] font-semibold">
              Orders in last{" "}
              <span className="text-[#FE6903] text-[32px] md:text-[48px] font-bold">
                {" "}
                7 months
              </span>
            </p>
            <BarChart
              data_1={[200, 444, 343, 556, 778, 455, 990]}
              title_1="Orders"
              bgColor_1="rgb(0,115,255)"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

const NumberCard = ({ targetCount, cardDetails }) => {
  return (
    <div
      className="col-span-12 md:col-span-4 w-full px-6 py-6 rounded-xl flex flex-col gap-1 items-center justify-center"
      style={{ boxShadow: "0px 0px 17px 1px rgba(0, 0, 0, 0.25)" }}
    >
      <p className="text-[48px]  leading-[48px] font-bold tracking-widest text-[#FE6903]">
        {targetCount}
      </p>
      <p className="text-[32px] font-semibold text-[#4471D4] text-center  capitalize">
        {cardDetails}
      </p>
    </div>
  );
};

export default SellerDashBoard;
