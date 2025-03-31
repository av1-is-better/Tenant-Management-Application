import TenantCard from "./TenantCard";
import AddTenant from "./AddTenant";
import TenantHeading from "./TenantHeading";
import TenantStatusButton from "./TenantStatusButton";
import TenantSpecificTransaction from "./TenantSpecificTransaction";
import TenantSpecificBills from "./TenantSpecificBills";
import { useState } from "react";
import { useEffect } from "react";

export default function TenantList() {
  const fetchTenants = async (list_type) => {
    try {
      if (list_type === "active") {
        const data_array = (
          await (await fetch("http://127.0.0.1:8000/api/tenants/active")).json()
        ).Result;
        setTenants(data_array);
      } else if (list_type === "inactive") {
        const data_array = (
          await (
            await fetch("http://127.0.0.1:8000/api/tenants/inactive")
          ).json()
        ).Result;
        setTenants(data_array);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [showTenantSpecificTransactions, setShowTenantSpecificTransactions] =
    useState({ status: false, tenant_id: "", tenant_name: "" });

  const [showTenantSpecificBills, setShowTenantSpecificBills] = useState({
    status: false,
    tenant_id: "",
    tenant_name: "",
  });

  const [Tenants, setTenants] = useState([]);
  const [listTenantWithStatus, setListTenantWithStatus] = useState("active");

  useEffect(() => {
    fetchTenants(listTenantWithStatus);
  }, []);

  return (
    <>
      {showTenantSpecificTransactions.status === false &&
        showTenantSpecificBills.status === false && (
          <div>
            <TenantHeading></TenantHeading>
            <TenantStatusButton
              listTenantWithStatus={listTenantWithStatus}
              setListTenantWithStatus={setListTenantWithStatus}
              fetchTenants={fetchTenants}
            ></TenantStatusButton>
            <AddTenant></AddTenant>
            {listTenantWithStatus === "active" && (
              <TenantCard
                tenants={Tenants}
                listTenantWithStatus={listTenantWithStatus}
                fetchTenants={fetchTenants}
                setShowTransactions={setShowTenantSpecificTransactions}
                setShowBills={setShowTenantSpecificBills}
              ></TenantCard>
            )}
            {listTenantWithStatus === "inactive" && (
              <TenantCard
                tenants={Tenants}
                listTenantWithStatus={listTenantWithStatus}
                fetchTenants={fetchTenants}
                setShowTransactions={setShowTenantSpecificTransactions}
                setShowBills={setShowTenantSpecificBills}
              ></TenantCard>
            )}
          </div>
        )}

      {showTenantSpecificTransactions.status === true && (
        <div>
          <TenantSpecificTransaction
            tenant_id={showTenantSpecificTransactions.tenant_id}
            tenant_name={showTenantSpecificTransactions.tenant_name}
            setShowTransactions={setShowTenantSpecificTransactions}
          ></TenantSpecificTransaction>
        </div>
      )}

      {showTenantSpecificBills.status === true && (
        <div>
          <TenantSpecificBills
            tenant_id={showTenantSpecificBills.tenant_id}
            tenant_name={showTenantSpecificBills.tenant_name}
            setShowBills={setShowTenantSpecificBills}
          ></TenantSpecificBills>
        </div>
      )}
    </>
  );
}
