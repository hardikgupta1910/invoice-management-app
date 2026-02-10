import { createSlice } from "@reduxjs/toolkit";
import { addDays, format } from "date-fns";

// const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem("state");
//     if (serializedState === null) {
//       return {
//         invoices: [],
//         filter: "all",
//         isFormOpen: false,
//         selectedInvoice: null,
//       };
//     }
//     return JSON.parse(serializedState);
//   } catch (error) {
//     console.log(error);
//     return {
//       invoices: [],
//       filter: "all",
//       isFormOpen: false,
//       selectedInvoice: null,
//     };
//   }
// };


const saveState = (state) => {
  try {
    const { invoices, filter } = state;

    const serializedState = JSON.stringify({
      invoices,
      filter,
    });

    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.log(error);
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (!serializedState) {
      return {
        invoices: [],
        filter: "all",
        isFormOpen: false,
        selectedInvoice: null,
      };
    }

    const parsed = JSON.parse(serializedState);

    return {
      ...parsed,
      isFormOpen: false,       // RESET UI
      selectedInvoice: null,  // RESET UI
    };
  } catch (error) {
    console.log(error);
    return {
      invoices: [],
      filter: "all",
      isFormOpen: false,
      selectedInvoice: null,
    };
  }
};


const initialState = loadState();
// const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem("state", serializedState);
//   } catch (error) {
//     console.log(error);
//   }
// };
const calculateTotals = (items = [], discount = 0) => {
  const subtotal = items.reduce(
    (sum, item) =>
      sum + (Number(item.quantity) || 0) * (Number(item.price) || 0),
    0,
  );

  const discountAmount = (subtotal * (Number(discount) || 0)) / 100;
  const total = subtotal - discountAmount;

  return { subtotal, total };
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    addInvoice: (state, action) => {
      const discount = Number(action.payload.discount) || 0;

      const { subtotal, total } = calculateTotals(
        action.payload.items,
        discount,
      );
      const newInvoice = {
        ...action.payload,
        discount,
        subtotal,
        amount: total,
        status: action.payload.status || "pending",
        dueDate:
          action.payload.dueDate ||
          format(addDays(new Date(), 30), "yyyy-MM-dd"),
      };
      state.invoices.push(newInvoice);

      // state.isFormOpen=true;
      state.isFormOpen = false;
      saveState(state);
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    toggleForm: (state) => {
      state.isFormOpen = !state.isFormOpen;
      
    },
    clearSelectedInvoice: (state) => {
      state.selectedInvoice = null;
    },
    openForm: (state) => {
      state.isFormOpen = true;
    },

    closeForm: (state) => {
      state.isFormOpen = false;
    },

    setSelectedInvoice: (state, action) => {
      state.selectedInvoice = action.payload;
      
    },
    // markAsPaid: (state, action) => {
    //   const invoice = state.invoices.find((inv) => inv.id === action.payload);
    //   if (invoice) {
    //     invoice.status = "paid";
    //     state.selectedInvoice = null;
    //     state.isFormOpen = false;
    //     saveState(state);
    //   }
    // },
    
    togglePaidStatus: (state, action) => {
  const invoice = state.invoices.find(inv => inv.id === action.payload);

  if (!invoice) return;

  // toggle status
  invoice.status = invoice.status === "paid" ? "pending" : "paid";

  // sync selectedInvoice immediately
  if (state.selectedInvoice?.id === invoice.id) {
    state.selectedInvoice = { ...invoice };
  }

  saveState(state);
},


    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter(
        (inv) => inv.id !== action.payload,
      );
      state.selectedInvoice = null;
      state.isFormOpen = false;
      saveState(state);
    },

    updateInvoice: (state, action) => {
         const discount = Number(action.payload.discount) || 0;

  const { subtotal, total } = calculateTotals(
    action.payload.items,
    discount
  );
      const updatedInvoice = {
    ...action.payload,
    discount,
    subtotal,
    amount: total,
  };
      const index = state.invoices.findIndex(
    (inv) => inv.id === action.payload.id
  );

  if (index !== -1) {
    state.invoices[index] = updatedInvoice;
  }

  state.selectedInvoice = null;
  state.isFormOpen = false;
  saveState(state);
    },
  },
});

export const {
  toggleForm,
  addInvoice,
  setFilter,
  setSelectedInvoice,
  markAsPaid,
  deleteInvoice,
  updateInvoice,
  clearSelectedInvoice,
  openForm,
  closeForm,
  togglePaidStatus,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
