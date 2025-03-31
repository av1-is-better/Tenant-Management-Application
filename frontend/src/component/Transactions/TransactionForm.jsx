import { useContext } from "react";
import { activeSectionContext } from "../../store/ActiveSectionContext";
import { FaBackspace } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { useReducer } from "react";

const fetchActiveTenantData = async (setTenantData, dispatchFormData) => {
  let activeTenantData = [];
  try {
    const data_array = (
      await (await fetch("http://127.0.0.1:8000/api/tenants/active")).json()
    ).Result;

    activeTenantData = data_array.map((item) => {
      return {
        tenant_id: item.tenant_id,
        tenant_name: item.tenant_name,
        tenant_room_no: item.tenant_room_no,
      };
    });
    dispatchFormData({
      type: "tenant_id",
      payload: activeTenantData[0].tenant_id,
    });
    dispatchFormData({
      type: "transaction_mode",
      payload: "CASH",
    });
    setTenantData(activeTenantData);
  } catch (err) {
    activeTenantData = [];
  }
};

const handleInputChange = (state, action) => {
  let currentFormData = state;
  switch (action.type) {
    case "tenant_id":
      currentFormData.tenant_id = Number(action.payload);
      break;
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

export default function TransactionForm() {
  const [tenantData, setTenantData] = useState([]);
  const [formData, dispatchFormData] = useReducer(handleInputChange, {
    tenant_id: "",
    transaction_date: "",
    transaction_mode: "",
    transaction_amount: "",
  });
  useEffect(() => {
    fetchActiveTenantData(setTenantData, dispatchFormData);
  }, []);

  const setCurrentSection = useContext(activeSectionContext).setCurrentSection;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // You may need to include additional headers (e.g., authorization)
        },
        body: JSON.stringify(formData),
      });

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
          <h1>Add Transaction</h1>
        </center>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="form-group mt-3">
            <label htmlFor="tenantId">From Tenant</label>
            <select
              className="form-control"
              id="tenantId"
              onChange={(e) => {
                dispatchFormData({
                  type: "tenant_id",
                  payload: e.target.value,
                });
              }}
              required
            >
              {tenantData.length === 0 && <option>No Tenant Available</option>}
              {tenantData.length != 0 &&
                tenantData.map((item) => {
                  return (
                    <option
                      className="bg-white text-dark fs-4"
                      key={item.tenant_id}
                      value={item.tenant_id}
                    >
                      {item.tenant_name} {"[Room No "}
                      {item.tenant_room_no}
                      {"]"}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-group">
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
              Add Transaction
            </button>
            <button
              type="button"
              className="btn btn-danger text-white mt-4 border-dark"
              onClick={() => {
                setCurrentSection("Transactions");
              }}
            >
              <FaBackspace /> Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
