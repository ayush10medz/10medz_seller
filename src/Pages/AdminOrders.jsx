import React, { useContext, useEffect, useState } from "react";
import { useSortBy, useTable, usePagination } from "react-table";
import Sidemenu from "../components/Shared/Sidemenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { HandleContext } from "../hooks/HandleState";
const server = process.env.REACT_APP_API_URL;

const columns = [
  {
    Header: "Number",
    accessor: "phoneNumber",
  },
  {
    Header: " Patient Name",
    accessor: "name",
    Cell: ({ value }) => value || "-",
  },
  {
    Header: "Sales Person",
    accessor: "salesName",
    Cell: ({ value }) => value || "-", // Display "_" if salesName is not present
  },
  {
    Header: "Prescription",
    accessor: "prescriptionLink",
    Cell: ({ value }) => (
      <img
        src={value}
        alt="Prescription"
        className="w-16 h-16 cursor-pointer"
        onClick={() => window.open(value)}
      />
    ),
  },
  {
    Header: "Order Timing",
    accessor: "createdAt",
    Cell: ({ value }) => {
      const date = new Date(value);
      return date.toLocaleString();
    },
  },
  {
    Header: "Price",
    accessor: "price",
    Cell: ({ value }) =>
      value ? (
        `₹${value}`
      ) : (
        <span className="text-red-500">Price not updated</span>
      ),
  },
  {
    Header: "Order Status",
    accessor: "orderStatus",
  },
  {
    Header: "Bill",
    accessor: "billLink",
    Cell: ({ value }) =>
      value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Bill
        </a>
      ) : (
        <span className="text-red-500">Bill not uploaded</span>
      ),
  },
  {
    Header: "Location",
    accessor: "location",
  },
  {
    Header: "Remark",
    accessor: "remark",
  },
];

const AdminOrders = () => {
  const { handleAllOrder, order, setOrder } = useContext(HandleContext);
  useEffect(() => {
    handleAllOrder();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isRemarkOpen, setIsRemarkOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formValues, setFormValues] = useState({
    price: "",
    orderStatus: "",
    billLink: "",
  });

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const openModal = (order) => {
    setSelectedOrder(order);
    setFormValues({
      price: order.price || "",
      orderStatus: order.orderStatus || "",
      billLink: order.billLink || "",
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedOrder(null);
    setFile(null);
  };

  const openRemarkModal = (order) => {
    setSelectedOrder(order);
    setIsRemarkOpen(true);
  };

  const closeRemarkModal = () => {
    setIsRemarkOpen(false);
    setSelectedOrder(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Please wait, updating the order...");

    const formData = new FormData();
    formData.append("price", formValues.price);
    formData.append("orderStatus", formValues.orderStatus);
    if (file) {
      formData.append("bill", file);
    }

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.put(
        `${server}/api/v1/seller/sellerorder/${selectedOrder._id}`,
        formData,
        config
      );
      toast.success(data.message, { id: toastId });
      setLoading(false);
      const updatedOrders = order.map((ord) =>
        ord._id === selectedOrder._id
          ? {
              ...ord,
              ...formValues,
              billLink: file ? URL.createObjectURL(file) : ord.billLink,
            }
          : ord
      );
      setOrder(updatedOrders);
      closeModal();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
      setLoading(false);
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    prepareRow,
    state: { pageIndex },
    pageCount,
  } = useTable(
    {
      columns,
      data: order,
    },
    useSortBy,
    usePagination
  );

  return (
    <main className="w-[100vw] flex flex-row items-start justify-start">
      <Sidemenu />
      <div className="w-full flex flex-col items-center justify-center pb-10 mt-[200px] gap-32">
        <p className="text-[36px] md:text-[48px] md:leading-[56px] font-semibold capitalize">
          all <span className="text-[#FE6903]">orders</span>{" "}
        </p>
        <table
          {...getTableProps()}
          className="min-w-full lg:min-w-[95%] text-left  text-sm font-light "
        >
          <thead className="border-b font-medium dark:border-neutral-500">
            {headerGroups.map((hg) => (
              <tr {...hg.getHeaderGroupProps()}>
                {hg.headers.map((header) => (
                  <th
                    {...header.getHeaderProps(header.getSortByToggleProps())}
                    scope="col"
                    className="px-6 py-4"
                  >
                    {header?.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="border-b transition duration-300 ease-in-out hover:bg-[#FE6903] hover:text-white cursor-pointer"
                  onClick={() => openModal(row.original)}
                >
                  {row?.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 font-normal"
                      onClick={(e) => {
                        if (cell?.column?.id === "remark") {
                          e.preventDefault();
                          openRemarkModal(row.original);
                        }
                      }}
                    >
                      {cell?.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex flex-row items-center justify-center w-full gap-5">
          <button
            disabled={!canPreviousPage}
            className="flex flex-col disabled:bg-[#FE6903] disabled:bg-opacity-30 items-center justify-center py-2 px-6 bg-[#FE6903] text-white rounded-lg"
            onClick={previousPage}
          >
            Prev
          </button>
          <span className="text-[16px] font-medium text-gray-900">
            {pageIndex + 1} of {pageCount}
          </span>
          <button
            disabled={!canNextPage}
            className="flex flex-col disabled:bg-[#FE6903] disabled:bg-opacity-30 items-center justify-center py-2 px-6 bg-[#FE6903] text-white rounded-lg"
            onClick={nextPage}
          >
            Next
          </button>
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[400px]">
              <h2 className="text-xl font-semibold mb-4">Update Order</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  value={formValues.price}
                  onChange={(e) =>
                    setFormValues({ ...formValues, price: e.target.value })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Order Status
                </label>
                <select
                  value={formValues.orderStatus}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      orderStatus: e.target.value,
                    })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Uploaded Rx">Uploaded Rx</option>
                  <option value="Price Uploaded">Price Uploaded</option>
                  <option value="Confirm Order">Confirm Order</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2 font-medium">
                  Upload Bill
                </label>
                <UploadButton setFile={setFile} />
              </div>
              <div className="flex justify-end">
                <button
                  className="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </div>
        )}

        {isRemarkOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[400px]">
              <h2 className="text-xl font-semibold mb-4">Remarked Order</h2>

              {(() => {
                let parsedRemark;
                try {
                  parsedRemark =
                    selectedOrder && selectedOrder.remark
                      ? JSON.parse(selectedOrder.remark)
                      : {};
                } catch {
                  parsedRemark = {};
                }
                const medicineData = parsedRemark.medicineData || [];
                return (
                  <div className="mb-2">
                    <div className="text-gray-800 mb-1">
                      <b>Patient Mobile:</b>{" "}
                      {parsedRemark.customerMobile || "-"}
                    </div>
                    <div className="text-gray-800 mb-1">
                      <b>Prescribed by:</b> {parsedRemark.doctorName || "-"}
                    </div>
                    <div className="text-gray-800 mb-3">
                      <b>Location:</b> {selectedOrder.location || "-"}
                    </div>

                    <h3 className="font-semibold text-lg mb-1">Medicines</h3>
                    <div className="max-h-56 overflow-y-auto border rounded">
                      <table className="min-w-full text-xs border">
                        <thead className="bg-gray-100 sticky top-0 text-gray-700">
                          <tr>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Dose</th>
                            <th className="p-2 border">Freq</th>
                            <th className="p-2 border">Qty</th>
                            <th className="p-2 border">In Stock</th>
                            <th className="p-2 border">Net Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {medicineData.length === 0 && (
                            <tr>
                              <td
                                colSpan={6}
                                className="p-2 text-center text-gray-400"
                              >
                                No medicine data
                              </td>
                            </tr>
                          )}
                          {medicineData.map((med, idx) => (
                            <tr
                              key={idx}
                              className={
                                !med.availableInStock ? "bg-red-50" : ""
                              }
                            >
                              <td className="p-2 border whitespace-nowrap">
                                {med.label}
                              </td>
                              <td className="p-2 border whitespace-nowrap">
                                {med.dosage || "-"}
                              </td>
                              <td className="p-2 border whitespace-nowrap">
                                {med.frequency || "-"}
                              </td>
                              <td className="p-2 border whitespace-nowrap">
                                {med.quantity || "-"}
                              </td>
                              <td
                                className={`p-2 border text-center ${
                                  med.availableInStock
                                    ? "text-green-600"
                                    : "text-red-500"
                                }`}
                              >
                                {med.availableInStock ? "Yes" : "No"}
                              </td>
                              <td className="p-2 border whitespace-nowrap">
                                {med.netPrice && med.netPrice !== "N/A"
                                  ? `₹${med.netPrice}`
                                  : med.price && med.price !== "N/A"
                                  ? `₹${med.price}`
                                  : "-"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}

              <div className="flex justify-end">
                <button
                  className="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                  onClick={closeRemarkModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

const UploadButton = ({ setFile }) => (
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setFile(e.target.files[0])}
    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
  />
);

export default AdminOrders;
