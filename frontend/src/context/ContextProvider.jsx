import axios from 'axios';
import React, { createContext,useEffect } from 'react'
export const TransactionContext = createContext();
import { toast } from "react-toastify";


const ContextProvider = ({children}) => {
    const [transactionsInfo, setTransactionsInfo] = React.useState([]);
    const url = import.meta.env.VITE_BACKEND_URL;

    const fetchTransactions = async()=>{
        try{
            const response = await axios.get(`${url}/api/transactions`);
            if(response.data.success){

                setTransactionsInfo(response.data.transaction);
            }else{
                toast.error(response.data.message || "Something went wrong");
            }
        }catch(error){
           toast.error(error.response.data.message || "Something went wrong");
        }
    }

    useEffect(()=>{
        fetchTransactions();
    },[])

    const values = {transactionsInfo, setTransactionsInfo, fetchTransactions};
  return (
    <TransactionContext.Provider value = {values}>
        {children}
    </TransactionContext.Provider>
  )
}

export default ContextProvider;