import React from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Filter, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedInvoice, openForm, setFilter } from "../store/InvoiceSlice";

const Header = () => {
  const dispatch=useDispatch();
  const status = ["all", "draft", "pending", "paid"];
  const { invoices,filter } = useSelector((state) => state.invoices);

const handleNewInvoice = () => {
  dispatch(clearSelectedInvoice());
  dispatch(openForm());
};

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Invoices</h1>
        <p className="text-slate-400">
          {invoices.length === 0
            ? "No Invoices"
            : `There are ${invoices.length} Total Invoices`}
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <Menu as="div" className="relative">
          <MenuButton className="flex items-center space-x-2 text-white outline-none">
            <Filter size={20} />
            <span> Filter by Status</span>
          </MenuButton>
          <MenuItems className="absolute right-0 mt-2 w-56 bg-slate-800 rounded-lg shadow-lg p-2 z-10 outline-none ">
            {status.map((s) => (
              <MenuItem key={s}>
                {({ active }) => (
                  <button className={`${active? "bg-slate-700":" "} w-full text-left px-4 py-2 rounded-lg capitalize ${filter===s ? "text-violet-500": "text-white"}`}
                    onClick={() => dispatch(setFilter(s))}>
                    {s}
                  </button>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
        <Button
          type="button"
          className="bg-violet-500 hover:bg-violet-600 text-white px-2 py-2
          rounded-full flex items-center space-x-3"
          onClick={handleNewInvoice}
        >
          <div className="bg-white rounded-full p-1">
            <Plus size={16} className="text-violet-500" />
          </div>
          <span>New Invoice</span>
        </Button>
      </div>
    </div>
  );
};

export default Header;
