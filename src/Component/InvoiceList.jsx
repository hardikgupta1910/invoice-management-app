import { format, parseISO } from "date-fns";
import { ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedInvoice,} from "../store/InvoiceSlice";

const InvoiceList = () => {
  const { invoices, filter } = useSelector((state) => state.invoices);

  const dispatch=useDispatch()

  const filterInvoices = invoices.filter((invoice) => {
    if(filter === "all") return true;
    return invoice.status === filter;
    
  });

  if(filterInvoices.length === 0){
   return( <div className="text-center py-12">
      <p className="text-xl text-slate-400">No invoices found</p>

    </div>
   )
  }
  const formatDate = (date) => {
    try {
      return format(parseISO(date), "yyyy-MM-dd");
    } catch (err) {
      console.log(err);
    }
  };

  const handleInvoiceClick = (invoice) => {
    dispatch(setSelectedInvoice(invoice));
  };

  return (
    <div className="space-y-4">
      {filterInvoices.map((invoice) => (
        <div
          className="bg-slate-800 rounded-lg p-6  flex items-center justify-between hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
          key={invoice.id}
          onClick={()=>handleInvoiceClick(invoice)}
        >
          <div className="flex items-center space-x-6 ">
            <span className="text-slate-400">{invoice.id}</span>
            <span className="text-slate-400">
              {" "}
              Due {formatDate(invoice.dueDate)}
            </span>
            <span className="text-slate-300"> {invoice.clientName}</span>
          </div>
         
          <div className="flex items-center space-x-6 ml-auto">
            <span className="text-xl font-bold">
              
               ₹{Number(invoice.amount).toFixed(2)}
            </span>
            <div
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                invoice.status === "paid" 
                ? "bg-green-500/20 text-green-50" 
                : invoice.status === "pending"
                ? "bg-orange-900/20 text-orange-500" 
                : "bg-slate-700/50 text-slate-400"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${invoice.status === "paid" ? "bg-green-500" 
                : invoice.status === "pending" ? "bg-orange-500" 
                : "bg-green-400"}`}>
              </div>
              <span className="capitalize">{invoice.status}</span>

            </div>
            <ChevronRight className="text-violet-500 ml-6" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;
