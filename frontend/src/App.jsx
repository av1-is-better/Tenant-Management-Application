import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./component/Header/Header";
import ActiveSectionProvider from "./store/ActiveSectionContext";
import TenantList from "./component/Tenants/TenantList";
import TenantForm from "./component/Tenants/TenantForm";
import TransactionListAll from "./component/Transactions/TransactionListAll";
import TransactionForm from "./component/Transactions/TransactionForm";
import { useState } from "react";
import UpdateTransactionForm from "./component/Transactions/UpdateTransactionForm";
import BillingListAll from "./component/Billings/BillingListAll";
import BillForm from "./component/Billings/BillForm";
import UpdateBillForm from "./component/Billings/UpdateBillForm";

function App() {
  const [currentSection, setCurrentSection] = useState("Tenants");

  const [transactionInfo, setTransactionInfo] = useState({
    transaction_id: "",
    transaction_date: "",
    transaction_mode: "",
    transaction_amount: "",
    transaction_from: "",
  });

  const [billingInfo, setBillingInfo] = useState({
    bill_date: "",
    bill_id: "",
    tenant_name: "",
    tenant_room_no: "",
    rent_charge: "",
    power_charge: "",
    water_charge: "",
    other_charge: "",
    power_consumed: "",
    power_unit_cost: "",
    total: "",
    message_note: "",
  });

  return (
    <>
      <ActiveSectionProvider
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        transactionInfo={transactionInfo}
        setTransactionInfo={setTransactionInfo}
        billingInfo={billingInfo}
        setBillingInfo={setBillingInfo}
      >
        <Header></Header>
        {currentSection === "Tenants" && <TenantList></TenantList>}
        {currentSection === "AddTenant" && <TenantForm></TenantForm>}
        {currentSection === "Transactions" && (
          <TransactionListAll></TransactionListAll>
        )}
        {currentSection === "Billing" && <BillingListAll></BillingListAll>}
        {currentSection === "GenerateBill" && <BillForm></BillForm>}
        {currentSection === "AddTransaction" && (
          <TransactionForm></TransactionForm>
        )}
        {currentSection === "UpdateTransaction" && (
          <UpdateTransactionForm></UpdateTransactionForm>
        )}
        {currentSection === "UpdateBill" && <UpdateBillForm></UpdateBillForm>}
      </ActiveSectionProvider>
    </>
  );
}

export default App;
