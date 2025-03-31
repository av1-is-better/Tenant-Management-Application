import BillingItem from "./BillingItem";
import BillingColumnHeading from "./BillingColumnHeading";
import BillingHeading from "./BillingHeading";
import GenerateBillButton from "./GenerateBillButton";
import { useState } from "react";
import { useEffect } from "react";

export default function BillingListAll() {
  // Fetch Transactions From API
  const fetchBills = async (setBills) => {
    try {
      const data_array = (
        await (await fetch("http://127.0.0.1:8000/api/bills/active")).json()
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
      <BillingHeading></BillingHeading>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: "30rem", textAlign: "left" }}>
          <GenerateBillButton />
          <BillingItem
            bills={bills}
            fetchBills={fetchBills}
            setBills={setBills}
            fromSection={"Billing"}
          />
        </div>
      </div>
    </>
  );
}
