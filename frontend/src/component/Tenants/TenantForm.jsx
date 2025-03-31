import { useContext } from "react";
import { activeSectionContext } from "../../store/ActiveSectionContext";
import { FaBackspace } from "react-icons/fa";
import { useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";

const fetchUnoccupiedRoomNo = async (setRoomList, dispatchFormData) => {
  let total_rooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  try {
    const data_array = (
      await (await fetch("http://127.0.0.1:8000/api/tenants/active")).json()
    ).Result;

    const occupied_rooms = data_array.map((item) => {
      return item.tenant_room_no;
    });

    const unoccupied_rooms = total_rooms.filter((item) => {
      if (!occupied_rooms.includes(item)) {
        return item;
      }
    });
    setRoomList(unoccupied_rooms);
    dispatchFormData({
      type: "tenant_room_no",
      payload: unoccupied_rooms[0],
    });
  } catch (err) {
    setRoomList(total_rooms);
    dispatchFormData({
      type: "tenant_room_no",
      payload: unoccupied_rooms[0],
    });
  }
};

// Function For Reducer
const handleInputChange = (state, action) => {
  let currentFormData = state;
  switch (action.type) {
    case "tenant_name":
      currentFormData.tenant_name = action.payload;
      break;
    case "tenant_room_no":
      currentFormData.tenant_room_no = Number(action.payload);
      break;
    case "tenant_phone_no":
      currentFormData.tenant_phone_no = action.payload;
      break;
    case "tenant_rented_on":
      const originalDateString = action.payload;
      const dateParts = originalDateString.split("-");
      const formattedDateString = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
      currentFormData.tenant_rented_on = formattedDateString;
      break;
    default:
      break;
  }
  return currentFormData;
};

export default function TenantForm() {
  const setCurrentSection = useContext(activeSectionContext).setCurrentSection;

  const [formData, dispatchFormData] = useReducer(handleInputChange, {
    tenant_name: "",
    tenant_room_no: 1,
    tenant_phone_no: "",
    tenant_status: true,
    tenant_rented_on: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/tenants", {
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
      setCurrentSection("Tenants");
      // Handle the response data as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle errors
    }
  };

  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    fetchUnoccupiedRoomNo(setRoomList, dispatchFormData);
  }, []);

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
          <h1>Tenant Form</h1>
        </center>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="tenant_name">Name</label>
            <input
              type="text"
              onChange={(e) => {
                dispatchFormData({
                  type: "tenant_name",
                  payload: e.target.value,
                });
              }}
              className="form-control"
              id="tenant_name"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tenant_phone_no">Contact Number</label>
            <input
              type="text"
              className="form-control"
              id="tenant_phone_no"
              onChange={(e) => {
                dispatchFormData({
                  type: "tenant_phone_no",
                  payload: e.target.value,
                });
              }}
              placeholder="9876543210"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="tenant_room_no">Room Number</label>
            <select
              className="form-control"
              id="tenant_room_no"
              onChange={(e) => {
                dispatchFormData({
                  type: "tenant_room_no",
                  payload: e.target.value,
                });
              }}
            >
              {roomList.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="tenant_rented_on">Date</label>
            <input
              type="date"
              className="form-control"
              id="tenant_rented_on"
              onChange={(e) => {
                dispatchFormData({
                  type: "tenant_rented_on",
                  payload: e.target.value,
                });
              }}
              required
            />
          </div>
          <div className="d-flex px-3 gap-3">
            <button
              type="submit"
              className="btn btn-warning text-dark mt-4 border-dark"
            >
              Add Tenant
            </button>
            <button
              type="button"
              className="btn btn-danger text-white mt-4 border-dark"
              onClick={() => {
                setCurrentSection("Tenants");
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
