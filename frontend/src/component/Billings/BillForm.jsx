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
    setTenantData(activeTenantData);
  } catch (err) {
    activeTenantData = [];
  }
};

export default function BillForm() {
  const [showTotalCost, setShowTotalCost] = useState(0);

  const [showPowerCost, setShowPowerCost] = useState(0);

  const [tenantData, setTenantData] = useState([]);

  const handleInputChange = (state, action) => {
    let currentFormData = state;
    switch (action.type) {
      case "tenant_id":
        currentFormData.tenant_id = Number(action.payload);
        break;
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
    tenant_id: "",
    bill_date: "",
    rent_charge: 0,
    power_charge: 0,
    water_charge: 0,
    other_charge: 0,
    power_consumed: 0,
    power_unit_cost: 0,
    total: 0,
    message_note: "",
  });
  useEffect(() => {
    fetchActiveTenantData(setTenantData, dispatchFormData);
  }, []);

  const setCurrentSection = useContext(activeSectionContext).setCurrentSection;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/bills", {
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
      setCurrentSection("Billing");
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
          <h1>Generate Bill</h1>
        </center>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="form-group mt-3">
            <label htmlFor="tenantId">For Tenant</label>
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
            <input
              type="text"
              className="form-control"
              id="messageNote"
              name="message"
              placeholder="Type Your Message Here"
              onChange={(e) => {
                dispatchFormData({
                  type: "message_note",
                  payload: e.target.value,
                });
              }}
              required
            ></input>
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
              Generate Bill
            </button>
            <button
              type="button"
              className="btn btn-danger text-white mt-4 border-dark"
              onClick={() => {
                setCurrentSection("Billing");
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
