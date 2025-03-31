import { IoReturnDownBack } from "react-icons/io5";
import { useState, useEffect } from "react";

import BillingHeading from "../Billings/BillingHeading";
import BillingItemForTenantSpecific from "../Billings/BillingItemForTenantSpecific";

export default function TenantSpecificBills({
  tenant_id,
  tenant_name,
  setShowBills,
}) {
  // Fetch Transactions From API
  const fetchBills = async (setBills) => {
    try {
      const data_array = (
        await (
          await fetch(`http://127.0.0.1:8000/api/bills/tenants/${tenant_id}`)
        ).json()
      ).Result;
      setBills(data_array);
    } catch (err) {
      console.log(err);
    }
  };

  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills(setBills);
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="col m-3">
          <div>
            <div className="container text-end" style={{ maxWidth: "30rem" }}>
              <button
                onClick={() => {
                  setShowBills({
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
      <BillingHeading mode="custom" tenant_name={tenant_name}></BillingHeading>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: "30rem", textAlign: "left" }}>
          <BillingItemForTenantSpecific bills={bills} />
        </div>
      </div>
    </>
  );
}
