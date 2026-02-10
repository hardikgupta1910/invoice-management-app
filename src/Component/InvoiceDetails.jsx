import { format, parseISO } from "date-fns";
import { useDispatch } from "react-redux";
import {
  clearSelectedInvoice,
  deleteInvoice,
  togglePaidStatus,
  openForm,
  setSelectedInvoice,
} from "../store/InvoiceSlice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF";

const InvoiceDetails = ({ invoice }) => {
  console.log(invoice);
  const dispatch = useDispatch();
  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), "yyyy-MM-dd");
    } catch (err) {
      console.log(err);
      return "Invalid Date";
    }
  };

  const handleBack = () => {
    dispatch(clearSelectedInvoice());
  };

  const handleTogglePaid = () => {
    dispatch(togglePaidStatus(invoice.id));
  };
  const handleDelete = () => {
    dispatch(deleteInvoice(invoice.id));
  };

  const handleEdit = () => {
    dispatch(setSelectedInvoice(invoice));
    dispatch(openForm());
  };

  return (
    <div className="bg-slate-800 rounded-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4  ">
          <span className="text-xl">Status</span>
          <div
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              invoice.status === "paid"
                ? "bg-green-900/20 text-green-50"
                : invoice.status === "pending"
                  ? "bg-orange-900/20 text-orange-500"
                  : "bg-slate-700/50 text-slate-400"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                invoice.status === "paid"
                  ? "bg-green-500"
                  : invoice.status === "pending"
                    ? "bg-orange-500"
                    : "bg-slate-400"
              }`}
            ></div>
            <span className="capitalize">{invoice.status}</span>
          </div>
        </div>

        <div className="flex space-x-4 px-3">
          <PDFDownloadLink
            document={<InvoicePDF invoice={invoice} />}
            fileName={`Invoice-${invoice.id}.pdf`}
            style={{ textDecoration: "none" }}
          >
            {({ loading }) => (
              <button
                className="px-6 py-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
                disabled={loading}
              >
                {loading ? "Generating PDF..." : "Download PDF"}
              </button>
            )}
          </PDFDownloadLink>

          <button
            className=" px-6 py-3 rounded-full bg-slate-700 hover:bg-slate-600"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className=" px-6 py-3 rounded-full bg-red-500 hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            onClick={handleTogglePaid}
            className={`px-6 py-3 rounded-full transition-colors
    ${
      invoice.status === "paid"
        ? "bg-orange-600 hover:bg-orange-700 text-white"
        : "bg-violet-500 hover:bg-violet-700 text-white"
    }
  `}
          >
            {invoice.status === "paid" ? "Mark as Pending" : "Mark as Paid"}
          </button>

          <button
            className=" px-6 py-3 rounded-full bg-slate-700 hover:bg-slate-600"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      </div>
      <div className="bg-slate-900 rounded-lg p-8">
        <div className="flex justify-between mb-8">
          <div className="">
            <h2 className="mb-2 font-bold text-xl">#{invoice.id}</h2>
            <p className="text-slate-400">{invoice.projectDescription}</p>
          </div>
          <div className="text-right text-slate-400">
            <p className="text-slate-400 mb-2">From</p>
            <p> {invoice.billFrom.streetAddress}</p>
            <p>{invoice.billFrom.city}</p>
            <p>{invoice.billFrom.postCode}</p>
            <p>{invoice.billFrom.country}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <p className="text-slate-400 mb-2">Invoice Date</p>
            <p className=" font-bold">{formatDate(invoice.invoiceDate)}</p>
            <p className="text-slate-400  mb-2"> Payment Due</p>
            <p className="font-bold">{formatDate(invoice.dueDate)}</p>
          </div>
          <div>
            <p className="text-slate-400 mb-2">Bill To</p>
            <p className="font-bold mb-2">{invoice.clientName}</p>
            <p className="text-slate-400 ">{invoice.billTo.streetAddress}</p>
            <p className="text-slate-400 ">{invoice.billTo.city} </p>
            <p className="text-slate-400 ">{invoice.billTo.postCode}</p>
            <p className="text-slate-400 ">{invoice.billTo.country} </p>
          </div>
          <div>
            <p className="text-slate-400 mb-2">Sent To</p>
            <p className="font-bold mb-2">{invoice.billTo.clientEmail}</p>
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg overflow-hidden">
          <div className="p-8">
            <table className="w-full">
              <thead>
                <tr className="text-slate-400">
                  <th className="text-left">Item Name</th>
                  <th className="text-right">QTY</th>
                  <th className="text-right">Price</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr
                    className="border-t border-slate-700 text-white"
                    key={index}
                  >
                    <td>{item.name}</td>
                    <td className="text-right">{item.quantity}</td>
                    <td className="text-right">{item.price}</td>
                    <td className="text-right">
                      {" "}
                      {(Number(item.total) || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-900 p-8 flex justify-between items-center">
            <span className="text-white"> Amount Due</span>
            <span className="text-3xl font-bold">
              {Number(invoice.amount).toFixed(2)}
            </span>
          </div>
          <div className="bg-slate-900 p-8 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{Number(invoice.amount).toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-orange-400">
              <span>Discount Applied</span>
              <span>-{invoice.discount || 0}%</span>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{invoice.amount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
