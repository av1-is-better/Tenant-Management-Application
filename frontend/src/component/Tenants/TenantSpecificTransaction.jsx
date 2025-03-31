import TransactionItem from "../Transactions/TransactionItem";
import TransactionItemWithUpdate from "../Transactions/TransactionItemWithUpdate";
import TransactionColumnHeading from "../Transactions/TransactionColumnHeading";
import TransactionColumnHeadingWithUpdate from "../Transactions/TransactionColumnHeadingWithUpdate";
import TransactionHeading from "../Transactions/TransactionHeading";
import { IoReturnDownBack } from "react-icons/io5";
import { useState, useEffect } from "react";

export default function TenantSpecificTransaction({
  tenant_id,
  tenant_name,
  setShowTransactions,
}) {
  // Fetch Transactions From API
  const fetchTransactions = async (setTransactions) => {
    try {
      const data_array = (
        await (
          await fetch(
            `http://127.0.0.1:8000/api/transactions/tenants/${tenant_id}`
          )
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
      <div className="container mt-4">
        <div className="col m-3">
          <div>
            <div className="container text-end" style={{ maxWidth: "30rem" }}>
              <button
                onClick={() => {
                  setShowTransactions({
                    status: false,
                    tenant_id: "",
                    tenant_name: "",
                  });
                }}
                type="button"
                className="btn btn-warning text-dark"
              >
                <IoReturnDownBack /> Back
              </button>
            </div>
          </div>
        </div>
      </div>
      <TransactionHeading
        mode="custom"
        tenant_name={tenant_name}
      ></TransactionHeading>

      <center>
        <div style={{ maxWidth: "30rem" }}>
          <TransactionColumnHeading></TransactionColumnHeading>
          <TransactionItem transactions={transactions}></TransactionItem>
        </div>
      </center>
    </>
  );
}
