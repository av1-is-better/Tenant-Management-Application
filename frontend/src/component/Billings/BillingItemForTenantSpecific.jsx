import { FaEdit } from "react-icons/fa";
import { billingContext } from "../../store/ActiveSectionContext";
import { activeSectionContext } from "../../store/ActiveSectionContext";
import { useContext } from "react";

export default function BillingItemForTenantSpecific({ bills }) {
  // billingInfo Object Variable Containing Billing Table Data
  const billingInfo = useContext(billingContext).billingInfo;

  // Function For Defining Billing Info Object
  const setBillingInfo = useContext(billingContext).setBillingInfo;

  // Function For Defining Current Section String
  const setCurrentSection = useContext(activeSectionContext).setCurrentSection;

  if (bills.length != 0) {
    return (
      <>
        <div className="container-flex px-4">
          {bills.map((item) => {
            return (
              <div
                key={item.bill_id}
                className="card rounded-4 bg-white mb-3 border-4"
                style={{ minWidth: "18rem" }}
              >
                <div className="card-body text-left">
                  <h5 className="text-dark text-left text-capitalize">
                    Bill #{item.bill_id}
                  </h5>
                  <h3 className="text-dark text-left text-capitalize">
                    <center>{item.for.replace("[R", "[Room ")}</center>
                  </h3>
                  <h5 className="text-dark text-left text-capitalize">
                    <center>{item.bill_date}</center>
                  </h5>
                  <hr className="text-dark" />

                  <p className="text-dark">
                    <b>Rent:</b> ₹{item.rent_charge}
                  </p>

                  <p className="text-dark">
                    <b>Power Consumed:</b> {item.power_consumed} Units
                  </p>

                  <p className="text-dark">
                    <b>Electricity:</b> ₹{item.power_charge} (
                    {" ₹" + item.power_unit_cost}/Unit)
                  </p>

                  {item.water_charge != 0 && (
                    <p className="text-dark">
                      <b>Water:</b> ₹{item.water_charge}
                    </p>
                  )}

                  {item.other_charge != 0 && (
                    <p className="text-dark">
                      <b>Additional Cost:</b> ₹{item.other_charge}
                    </p>
                  )}
                  <hr className="text-dark" />

                  <h1 className="text-dark">
                    <b>
                      <center>₹{item.total}</center>
                    </b>
                  </h1>
                  <hr className="text-dark" />

                  <p className="text-dark">
                    <b>Message:</b> {item.message_note}
                  </p>
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
                No Bills Found. <br /> You Can Create Bills Using Generate
                Button.
              </p>
            </div>
          </center>
        </>
      </>
    );
  }
}
