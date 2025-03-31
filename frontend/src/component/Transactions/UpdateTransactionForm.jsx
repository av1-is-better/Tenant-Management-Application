import { useContext } from "react";
import { activeSectionContext } from "../../store/ActiveSectionContext";
import { FaBackspace } from "react-icons/fa";
import { useEffect } from "react";
import { useReducer } from "react";
import { transactionIdContext } from "../../store/ActiveSectionContext";

const fetchTransactionData = async (transaction_id, dispatchFormData) => {
  let fetchedTransactionData = {};
  try {
    const data_array = (
      await (
        await fetch(
          `http://127.0.0.1:8000/api/transactions/transactionid/${transaction_id}`
        )
      ).json()
    ).Result;

    fetchedTransactionData = data_array[0];

    dispatchFormData({
      type: "transaction_date",
      payload: fetchedTransactionData.transaction_date,
    });

    dispatchFormData({
      type: "transaction_mode",
      payload: fetchedTransactionData.transaction_mode,
    });

    dispatchFormData({
      type: "transaction_amount",
      payload: fetchedTransactionData.transaction_amount,
    });
  } catch (err) {
    fetchedTransactionData = {};
  }
};

const handleInputChange = (state, action) => {
  let currentFormData = state;
  switch (action.type) {
    case "transaction_mode":
      currentFormData.transaction_mode = action.payload;
      break;
    case "transaction_amount":
      currentFormData.transaction_amount = Number(action.payload);
      break;
    case "transaction_date":
      const originalDateString = action.payload;
      const dateParts = originalDateString.split("-");
      const formattedDateString = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
      currentFormData.transaction_date = formattedDateString;
      break;
    default:
      break;
  }
  return currentFormData;
};

// Converting Date DD/MM/YYYY To YYYY-MM-DD
const dateConvertToYMD = (dateString) => {
  let parts = dateString.split("/");
  // Create a new date in the format YYYY-MM-DD
  let outputDate = parts[2] + "-" + parts[1] + "-" + parts[0];
  return outputDate;
};

export default function UpdateTransactionForm() {
  const transactionInfo = useContext(transactionIdContext).transactionInfo;
  const transaction_id = transactionInfo.transaction_id;
  let formattedFormDate = "";

  const [formData, dispatchFormData] = useReducer(handleInputChange, {
    transaction_id: transaction_id,
    transaction_date: transactionInfo.transaction_date,
    transaction_mode: transactionInfo.transaction_mode,
    transaction_amount: transactionInfo.transaction_amount,
  });

  if (formData.transaction_date != "") {
    formattedFormDate = dateConvertToYMD(formData.transaction_date);
  }

  useEffect(() => {
    fetchTransactionData(transaction_id, dispatchFormData);
  }, []);

  const setCurrentSection = useContext(activeSectionContext).setCurrentSection;

  // UPDATE TRANSACTION API CALL
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/updatetransactions",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // You may need to include additional headers (e.g., authorization)
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      //console.log("Success:", data);
      setCurrentSection("Transactions");
      // Handle the response data as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle errors
    }
  };

  return (
    <>
      <div
        className="container"
        style={{ minWidth: "20rem", maxWidth: "40rem", padding: "2rem" }}
      >
        <div className="container">
          <div className="col m-3">
            <div></div>
          </div>
        </div>
        <center>
          <h1>Update Transaction</h1>
          <h3>{transactionInfo.transaction_from}</h3>
          <br />
        </center>
        <div className="container-flex px-4 mt-1">
          <div className="row mb-3">
            <div className="col">
              <b>Date</b>
            </div>
            <div className="col">
              <b>Mode</b>
            </div>
            <div className="col">
              <b>Received</b>
            </div>
          </div>
        </div>
        <div className="container-flex px-4">
          <div className="row mb-2">
            <div className="col text-warning text-left">
              {formData.transaction_date}
            </div>
            <div className="col text-warning text-left">
              {formData.transaction_mode}
            </div>
            <div className="col text-warning text-left">
              {formData.transaction_amount}
            </div>
          </div>
          <br />
        </div>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="form-group mt-3">
            <label htmlFor="transactionDate">Transaction Date</label>
            <input
              type="date"
              onChange={(e) => {
                dispatchFormData({
                  type: "transaction_date",
                  payload: e.target.value,
                });
              }}
              className="form-control"
              id="transactionDate"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="transactionMode">Mode of Payment</label>
            <select
              onChange={(e) => {
                dispatchFormData({
                  type: "transaction_mode",
                  payload: e.target.value,
                });
              }}
              className="form-control"
              id="transactionMode"
              required
            >
              <option className="bg-white text-dark fs-5" value="CASH">
                Cash
              </option>
              <option className="bg-white text-dark fs-5" value="BANK">
                Bank Transfer
              </option>
              <option className="bg-white text-dark fs-5" value="UPI">
                UPI
              </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="transactionAmount">Amount</label>
            <input
              type="number"
              onChange={(e) => {
                dispatchFormData({
                  type: "transaction_amount",
                  payload: e.target.value,
                });
              }}
              className="form-control"
              id="transactionAmount"
              placeholder="Amount Received"
              required
            />
          </div>
          <div className="d-flex px-3 gap-3">
            <button
              type="submit"
              className="btn btn-warning text-dark mt-4 border-dark"
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-success text-white mt-4 border-dark"
              onClick={() => {
                setCurrentSection("Transactions");
              }}
            >
              <FaBackspace /> Cancel
            </button>
            <button
              className="btn btn-danger text-white mt-4 border-dark"
              type="button"
              onClick={(e) => {
                e.target.disabled = true;
                fetch(
                  `http://127.0.0.1:8000/api/transactions/transactionid/${formData.transaction_id}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json", // Add any headers required by your API
                      // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Include authentication headers if needed
                    },
                  }
                );
                setTimeout(() => {
                  setCurrentSection("Transactions");
                }, 1000);
              }}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
