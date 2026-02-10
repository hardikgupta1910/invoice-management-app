import React from "react";
import Header from "./Header";
import InvoiceList from "./InvoiceList";
import InvoiceForm from "./InvoiceForm";
import { useDispatch, useSelector } from "react-redux";
import { openForm, clearSelectedInvoice } from "../store/InvoiceSlice";
import InvoiceDetails from "./InvoiceDetails";

const AppContent = () => {
  const dispatch = useDispatch();
  const { isFormOpen, selectedInvoice } = useSelector(
    (state) => state.invoices,
  );
  const handleNewInvoice = () => {
    // dispatch(toggleForm());
    dispatch(clearSelectedInvoice()); // ensure create mode
    dispatch(openForm()); // explicitly open form
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <div className="max-w-5xl mx-auto py-12 px-4">
        <Header onNewInvoice={handleNewInvoice} />
        {/* DETAILS vs LIST */}
        {selectedInvoice ? (
          <InvoiceDetails invoice={selectedInvoice} />
        ) : (
          <InvoiceList />
        )}

        {/* FORM */}
        {isFormOpen && <InvoiceForm invoice={selectedInvoice} />}
      </div>
    </div>
  );
};

export default AppContent;
