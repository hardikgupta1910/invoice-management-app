import { Plus, Trash, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { addInvoice, closeForm, updateInvoice } from "../store/InvoiceSlice";
import { useState } from "react";
import { addDays, format } from "date-fns";

const InvoiceForm = ({ invoice }) => {
  const [formData, setFormData] = useState(() => ({
    id: invoice?.id ?? `INV${Math.floor(Math.random() * 1000)}`,
    status: invoice?.status ?? "pending",

    billFrom: {
      streetAddress: invoice?.billFrom?.streetAddress ?? "",
      city: invoice?.billFrom?.city ?? "",
      postCode: invoice?.billFrom?.postCode ?? "",
      country: invoice?.billFrom?.country ?? "",
    },

    billTo: {
      clientEmail: invoice?.billTo?.clientEmail ?? "",
      streetAddress: invoice?.billTo?.streetAddress ?? "",
      city: invoice?.billTo?.city ?? "",
      postCode: invoice?.billTo?.postCode ?? "",
      country: invoice?.billTo?.country ?? "",
    },

    clientName: invoice?.clientName ?? "",
    // items: Array.isArray(invoice?.items) ? invoice.items : [],
    items: Array.isArray(invoice?.items)
      ? invoice.items.map((item) => ({ ...item }))
      : [],

    paymentTerms: invoice?.paymentTerms ?? "Net 30 days",
    projectDescription: invoice?.projectDescription ?? "",
    invoiceDate: invoice?.invoiceDate ?? format(new Date(), "yyyy-MM-dd"),
    dueDate: invoice?.dueDate ?? format(addDays(new Date(), 30), "yyyy-MM-dd"),
    amount: invoice?.amount ?? 0,
    discount: invoice?.discount ?? 0,
  }));

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (invoice) {
      dispatch(updateInvoice(formData)); // EDIT
    } else {
      dispatch(addInvoice(formData)); // CREATE
    }
  };
  console.log(formData);

  const addItems = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: "", quantity: 0, price: 0, total: 0 }],
    });
  };

  const updateItem = (index, field, value) => {
    const newItems = formData.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );

    const qty = Number(newItems[index].quantity) || 0;
    const price = Number(newItems[index].price) || 0;

    newItems[index] = {
      ...newItems[index],
      total: qty * price,
    };

    setFormData({ ...formData, items: newItems });
  };

  const removeItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center overflow-y-auto">
      <div className="bg-slate-800 p-8 rounded-lg  w-full max-w-2xl mt-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {invoice ? "Update Invoice" : "New Invoice"}
          </h2>
          <button type="button" onClick={() => dispatch(closeForm())}>
            <X size={24} />
          </button>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <h3 className="text-violet-500 font-bold">Bill Form</h3>
            <input
              type="text"
              placeholder="Street Address"
              required
              value={formData.billFrom.streetAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billFrom: {
                    ...formData.billFrom,
                    streetAddress: e.target.value,
                  },
                })
              }
              className="w-full p-3 bg-slate-900 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 ">
            <input
              type="text"
              placeholder="City"
              required
              value={formData.billFrom.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billFrom: { ...formData.billFrom, city: e.target.value },
                })
              }
              className="w-full p-3 bg-slate-900 rounded-lg"
            />
            <input
              type="text"
              placeholder="Post Code"
              required
              value={formData.billFrom.postCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billFrom: { ...formData.billFrom, postCode: e.target.value },
                })
              }
              className="w-full p-3 bg-slate-900 rounded-lg"
            />
            <input
              type="text"
              placeholder="Country"
              required
              value={formData.billFrom.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billFrom: { ...formData.billFrom, country: e.target.value },
                })
              }
              className="w-full p-3 bg-slate-900 rounded-lg"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-violet-500 font-bold">Bill To</h3>
            <input
              type="text"
              placeholder="Client Name"
              required
              value={formData.clientName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  clientName: e.target.value,
                })
              }
              className="w-full p-3 bg-slate-900 rounded-lg"
            />
            <input
              type="text"
              placeholder="Client Email"
              required
              value={formData.billTo.clientEmail}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: { ...formData.billTo, clientEmail: e.target.value },
                })
              }
              className="w-full p-3 bg-slate-900 rounded-lg"
            />
            <input
              type="text"
              placeholder="Client Street Address"
              required
              value={formData.billTo.streetAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: { ...formData.billTo, streetAddress: e.target.value },
                })
              }
              className="w-full p-3 bg-slate-900 rounded-lg"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 ">
            <input
              type="text"
              placeholder="City"
              required
              value={formData.billTo.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: { ...formData.billTo, city: e.target.value },
                })
              }
              className="w-full p-3 bg-slate-900 rounded-lg"
            />
            <input
              type="text"
              placeholder="Post Code"
              required
              value={formData.billTo.postCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: { ...formData.billTo, postCode: e.target.value },
                })
              }
              className="w-full p-3 bg-slate-900 rounded-lg"
            />
            <input
              type="text"
              placeholder="Country"
              required
              value={formData.billTo.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: { ...formData.billTo, country: e.target.value },
                })
              }
              className="w-full p-3 bg-slate-900 rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="date" className="bg-slate-900 rounded-lg p-3" />
              <select
                className="bg-slate-900 rounded-lg p-3"
                required
                value={formData.paymentTerms}
                onChange={(e) =>
                  setFormData({ ...formData, paymentTerms: e.target.value })
                }
              >
                <option> Net 30 </option>
                <option> Net 60 </option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Product Description"
              required
              value={formData.projectDescription}
              onChange={(e) =>
                setFormData({ ...formData, projectDescription: e.target.value })
              }
              className="w-full p-3 bg-slate-900 rounded-lg"
            />
          </div>

          <div className="space-y-4">
            <h3>Item List</h3>
            {formData.items.map((item, index) => (
              <div className="grid grid-cols-12 gap-3 items-center" key={index}>
                <input
                  type="text"
                  placeholder="Item Name"
                  className="bg-slate-900 rounded-lg p-3 col-span-5"
                  min="0"
                  step="0.01"
                  required
                  value={item.name}
                  onChange={(e) => updateItem(index, "name", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Qty."
                  className="bg-slate-900 rounded-lg p-3 col-span-2"
                  min="0"
                  step="0.01"
                  required
                  value={item.quantity}
                  onChange={(e) =>
                    // updateItem(index, "quantity", parseInt(e.target.value) || 0)
                    updateItem(index, "quantity", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="bg-slate-900 rounded-lg p-3 col-span-2"
                  min="1"
                  required
                  value={item.price}
                  onChange={(e) =>
                    //updateItem(index, "price", parseFloat(e.target.value) || 0)
                    updateItem(index, "price", e.target.value)
                  }
                />
                <div className="col-span-2 ">
                  Total Amt. : {item.total.toFixed(2)}
                </div>

                <button
                  type="button"
                  className="text-slate-400  hover:text-red-500"
                  onClick={() => removeItem(index)}
                >
                  <Trash size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="w-full bg-slate-700 hover:bg-slate-600 rounded-lg p-3 flex items-center justify-center space-x-2"
              onClick={addItems}
            >
              <Plus size={20} />
              <span> Add New Item </span>
            </button>
          </div>
          <div className="space-y-2">
            <label className="text-slate-400">Discount (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.discount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  discount: Number(e.target.value) || 0,
                })
              }
              className="w-full bg-slate-900 rounded-lg p-3"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className=" bg-violet-500 hover:bg-violet-600 rounded-full py-3 px-6 text-white"
              onClick={() => dispatch(closeForm())}
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" bg-violet-500 hover:bg-violet-600 rounded-full py-3 px-6 text-white"
            >
              {invoice ? "Save Changes" : "Create Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
