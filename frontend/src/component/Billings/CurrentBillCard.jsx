export function CurrentBillCard({ billingInfo }) {
  return (
    <div
      className="card rounded-4 bg-white mb-3 border-4"
      style={{ minWidth: "18rem" }}
    >
      <div className="card-body text-left">
        <h5 className="text-dark text-left text-capitalize">
          Bill #{billingInfo.bill_id}
        </h5>
        <h3 className="text-dark text-left text-capitalize">
          <center>{billingInfo.bill_for.replace("[R", "[Room ")}</center>
        </h3>
        <h5 className="text-dark text-left text-capitalize">
          <center>{billingInfo.bill_date}</center>
        </h5>
        <hr className="text-dark" />

        <p className="text-dark">
          <b>Rent:</b> ₹{billingInfo.rent_charge}
        </p>

        <p className="text-dark">
          <b>Power Consumed:</b> {billingInfo.power_consumed} Units
        </p>

        <p className="text-dark">
          <b>Electricity:</b> ₹{billingInfo.power_charge} (
          {" ₹" + billingInfo.power_unit_cost}/Unit)
        </p>

        {billingInfo.water_charge != 0 && (
          <p className="text-dark">
            <b>Water:</b> ₹{billingInfo.water_charge}
          </p>
        )}

        {billingInfo.other_charge != 0 && (
          <p className="text-dark">
            <b>Additional Cost:</b> ₹{billingInfo.other_charge}
          </p>
        )}
        <hr className="text-dark" />

        <h1 className="text-dark">
          <b>
            <center>₹{billingInfo.total}</center>
          </b>
        </h1>
        <hr className="text-dark" />

        <p className="text-dark">
          <b>Message:</b> {billingInfo.message_note}
        </p>
      </div>
    </div>
  );
}
