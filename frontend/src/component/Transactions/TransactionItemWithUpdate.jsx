import { FaEdit } from "react-icons/fa";
import { transactionIdContext } from "../../store/ActiveSectionContext";
import { activeSectionContext } from "../../store/ActiveSectionContext";
import { useContext } from "react";

export default function TransactionItemWithUpdate({ transactions }) {
  const transactionInfo = useContext(transactionIdContext).transactionInfo;
  const setTransactionInfo =
    useContext(transactionIdContext).setTransactionInfo;
  const setCurrentSection = useContext(activeSectionContext).setCurrentSection;

  if (transactions.length != 0) {
    return (
      <>
        <div className="container-flex px-4">
          {transactions.map((item) => {
            return (
              <div key={Math.random() * Math.random()} className="row mb-2">
                <div className="col text-warning text-left">
                  {item.transaction_date}
                </div>
                <div className="col text-warning text-left">
                  {item.transaction_from}
                </div>
                <div className="col text-warning text-left">
                  {item.transaction_mode}
                </div>
                <div className="col text-warning text-left">
                  {item.transaction_amount}
                </div>
                <div className="col text-left">
                  <button
                    className="btn btn-warning text-dark"
                    onClick={() => {
                      setTransactionInfo({
                        transaction_id: item.transaction_id,
                        transaction_date: item.transaction_date,
                        transaction_mode: item.transaction_mode,
                        transaction_amount: item.transaction_amount,
                        transaction_from: item.transaction_from,
                      });
                      setCurrentSection("UpdateTransaction");
                    }}
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    return (
      <>
        <>
          <center>
            <div
              className="container-sm gap-2 mt-2"
              style={{ maxWidth: "30rem" }}
            >
              <p className="mt-5">
                No Transactions Found. <br /> You Can Add Transactions Using Add
                Button
              </p>
            </div>
          </center>
        </>
      </>
    );
  }
}
