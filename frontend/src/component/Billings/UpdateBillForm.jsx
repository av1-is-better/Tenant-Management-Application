import { useContext } from "react";
import { activeSectionContext } from "../../store/ActiveSectionContext";
import { FaBackspace } from "react-icons/fa";
import { useState } from "react";
import { useReducer } from "react";
import { billingContext } from "../../store/ActiveSectionContext";
import { CurrentBillCard } from "./CurrentBillCard";

export default function UpdateBillForm() {
  const currentBillInfo = useContext(billingContext).billingInfo;

  const fromWhichSection = currentBillInfo.fromWhichSection;

  const [showTotalCost, setShowTotalCost] = useState(0);

  const [showPowerCost, setShowPowerCost] = useState(0);

  const handleInputChange = (state, action) => {
    let currentFormData = state;
    switch (action.type) {
      case "bill_date":
        const originalDateString = action.payload;
        const dateParts = originalDateString.split("-");
        const formattedDateString = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
        currentFormData.bill_date = formattedDateString;
        break;
      case "rent_charge":
        currentFormData.rent_charge = Number(action.payload);
        break;
      case "power_charge":
        currentFormData.power_charge = Number(action.payload);
        break;
      case "water_charge":
        currentFormData.water_charge = Number(action.payload);
        break;
      case "other_charge":
        currentFormData.other_charge = Number(action.payload);
        break;
      case "power_consumed":
        currentFormData.power_consumed = Number(action.payload);
        break;
      case "power_unit_cost":
        currentFormData.power_unit_cost = Number(action.payload);
        break;
      case "message_note":
        currentFormData.message_note = action.payload;
        break;
      default:
        break;
    }

    currentFormData.power_charge =
      currentFormData.power_consumed * currentFormData.power_unit_cost;

    currentFormData.total =
      currentFormData.rent_charge +
      currentFormData.water_charge +
      currentFormData.other_charge +
      currentFormData.power_charge;

    setShowPowerCost(currentFormData.power_charge);
    setShowTotalCost(currentFormData.total);
    return currentFormData;
  };

  const [formData, dispatchFormData] = useReducer(handleInputChange, {
    bill_id: Number(currentBillInfo.bill_id),
    bill_date: currentBillInfo.bill_date,
    rent_charge: Number(currentBillInfo.rent_charge),
    power_charge: Number(currentBillInfo.power_charge),
    water_charge: Number(currentBillInfo.water_charge),
    other_charge: Number(currentBillInfo.other_charge),
    power_consumed: Number(currentBillInfo.power_consumed),
    power_unit_cost: Number(currentBillInfo.power_unit_cost),
    total: Number(currentBillInfo.total),
    message_note: currentBillInfo.message_note,
  });

  const setCurrentSection = useContext(activeSectionContext).setCurrentSection;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/bills", {
        method: "PUT",
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
      setCurrentSection(fromWhichSection);
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
          <h1>Update Bill Form</h1>
          <h3>{currentBillInfo.for}</h3>
          <br />
        </center>
        <CurrentBillCard billingInfo={currentBillInfo}></CurrentBillCard>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="billDate">Bill Date</label>
            <input
              type="date"
              onChange={(e) => {
                dispatchFormData({
                  type: "bill_date",
                  payload: e.target.value,
                });
              }}
              className="form-control"
              id="billDate"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rentCharge"> Rent Cost</label>
            <input
              type="number"
              onChange={(e) => {
                dispatchFormData({
                  type: "rent_charge",
                  payload: e.target.value,
                });
              }}
              className="form-control"
              id="rentCharge"
              placeholder="Rent Amount"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="waterCharge"> Water Cost</label>
            <input
              type="number"
              onChange={(e) => {
                dispatchFormData({
                  type: "water_charge",
                  payload: e.target.value,
                });
              }}
              className="form-control"
              id="waterCharge"
              placeholder="Rent Amount"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="otherCharge"> Miscellaneous Cost</label>
            <input
              type="number"
              onChange={(e) => {
                dispatchFormData({
                  type: "other_charge",
                  payload: e.target.value,
                });
              }}
              className="form-control"
              id="otherCharge"
              placeholder="Other Charges"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="powerConsumed"> Power Consumption (Units)</label>
            <input
              type="number"
              onChange={(e) => {
                dispatchFormData({
                  type: "power_consumed",
                  payload: e.target.value,
                });
              }}
              className="form-control"
              id="powerConsumed"
              placeholder="Power Units"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="powerUnitCost"> Power Unit Price</label>
            <input
              type="number"
              onChange={(e) => {
                dispatchFormData({
                  type: "power_unit_cost",
                  payload: e.target.value,
                });
              }}
              className="form-control"
              id="powerUnitCost"
              placeholder="Unit Cost"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="messageNote"> Message Note</label>
            <textarea
              className="form-control"
              id="messageNote"
              name="message"
              rows="4"
              cols="8"
              placeholder="Type Your Message Here"
              onChange={(e) => {
                dispatchFormData({
                  type: "message_note",
                  payload: e.target.value,
                });
              }}
              required
            ></textarea>
          </div>

          <div>
            <p>Electricity Cost: {showPowerCost}</p>
            <p>Total: {showTotalCost}</p>
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
                setCurrentSection("Billing");
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger text-white mt-4 border-dark"
              type="button"
              onClick={(e) => {
                e.target.disabled = true;
                fetch(
                  `http://127.0.0.1:8000/api/bills/billid/${currentBillInfo.bill_id}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json", // Add any headers required by your API
                      // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Include authentication headers if needed
                    },
                  }
                );

                setTimeout(() => {
                  setCurrentSection("Billing");
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
