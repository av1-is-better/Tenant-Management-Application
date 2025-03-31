import TransactionItem from "./TransactionItem";
import TransactionItemWithUpdate from "./TransactionItemWithUpdate";
import TransactionColumnHeading from "./TransactionColumnHeading";
import TransactionColumnHeadingWithUpdate from "./TransactionColumnHeadingWithUpdate";
import AddTransaction from "./AddTransaction";
import TransactionHeading from "./TransactionHeading";
import { useState } from "react";
import { useEffect } from "react";

export default function TransactionListAll() {
  // Fetch Transactions From API
  const fetchTransactions = async (setTransactions) => {
    try {
      const data_array = (
        await (
          await fetch("http://127.0.0.1:8000/api/transactions/active")
        ).json()
      ).Result;
      setTransactions(data_array);
    } catch (err) {
      console.log(err);
    }
  };

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions(setTransactions);
  }, []);

  return (
    <>
      <TransactionHeading></TransactionHeading>
      <center>
        <div style={{ maxWidth: "30rem" }}>
          <AddTransaction></AddTransaction>
          <TransactionColumnHeadingWithUpdate></TransactionColumnHeadingWithUpdate>
          <TransactionItemWithUpdate
            transactions={transactions}
          ></TransactionItemWithUpdate>
        </div>
      </center>
    </>
  );
}
