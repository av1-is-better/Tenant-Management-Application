export default function TenantCard({
  tenants,
  listTenantWithStatus,
  fetchTenants,
  setShowTransactions,
  setShowBills,
}) {
  const handleTenantStatus = async (id, status) => {
    let data = { tenant_id: id, tenant_status: status };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/changestatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle the successful update here
      console.log("Data updated successfully");
    } catch (error) {
      // Handle errors during the update
      console.error("Error updating data:", error.message);
    }
    status ? fetchTenants("inactive") : fetchTenants("active");
  };

  const handleTenantDeletion = async (id, status) => {
    let data = { tenant_id: id };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/deletetenant", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle the successful update here
      console.log("Data updated successfully");
    } catch (error) {
      // Handle errors during the update
      console.error("Error updating data:", error.message);
    }
    status ? fetchTenants("inactive") : fetchTenants("active");
  };

  if (tenants.length != 0) {
    return (
      <>
        <div
          className="container-sm gap-2 mt-5"
          style={{ maxWidth: "22.5rem" }}
        >
          {tenants.map((item) => {
            return (
              <div
                key={item.tenant_id}
                className="card rounded-4 mb-3 border-warning border-1 border-slate shadow-3"
                style={{
                  minWidth: "22.5rem",
                  maxWidth: "22.5rem",
                }}
              >
                <div className="card-body">
                  <h5 className="card-title text-warning fw-bolder fs-1 text-capitalize">
                    {item.tenant_name}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-warning fw-bold">
                    Room No {item.tenant_room_no}
                  </h6>
                  <hr></hr>

                  <p className="text-warning fs-1">
                    <b>Remaining:</b>
                    {" ₹"}
                    {item.sum_of_total_bill -
                      item.sum_of_total_transaction_amount}
                  </p>

                  <p className="text-white">
                    <b>Rented on:</b> {item.tenant_rented_on}
                  </p>
                  <p className="text-white">
                    <b>Contact:</b> +91-{item.tenant_phone_no}
                  </p>
                  <p className="text-white fs-5">
                    <b>Transactions:</b> {item.transaction_count}
                  </p>
                  <p className="text-white fs-5">
                    <b>Bills:</b> {item.bill_count}
                  </p>

                  <p className="text-warning fs-4">
                    <b>Total Received:</b>
                    {" ₹"}
                    {item.sum_of_total_transaction_amount}
                  </p>

                  <p className="text-warning fs-4">
                    <b>Total Billed:</b> ₹{item.sum_of_total_bill}
                  </p>

                  <p className="text-white">
                    <b>Status:</b> {item.tenant_status ? "Active" : "Inactive"}
                  </p>

                  <div className="d-flex gap-3 text-center">
                    <a
                      className="btn btn-warning"
                      onClick={() => {
                        setShowTransactions({
                          status: true,
                          tenant_id: item.tenant_id,
                          tenant_name: item.tenant_name,
                        });
                      }}
                    >
                      Transactions{" "}
                    </a>
                    <a
                      className="btn btn-primary"
                      onClick={() => {
                        setShowBills({
                          status: true,
                          tenant_id: item.tenant_id,
                          tenant_name: item.tenant_name,
                        });
                      }}
                    >
                      Billings{" "}
                    </a>
                    {listTenantWithStatus === "active" && (
                      <a
                        className="btn btn-danger text-white"
                        onClick={() => {
                          handleTenantStatus(item.tenant_id, false);
                        }}
                      >
                        Deactivate
                      </a>
                    )}
                    {listTenantWithStatus === "inactive" && (
                      <a
                        className="btn btn-success text-white"
                        onClick={() => {
                          handleTenantStatus(item.tenant_id, true);
                        }}
                      >
                        Active
                      </a>
                    )}
                    {listTenantWithStatus === "inactive1" && (
                      <a
                        className="btn btn-danger text-white"
                        onClick={() => {
                          handleTenantDeletion(item.tenant_id, true);
                        }}
                      >
                        Delete
                      </a>
                    )}
                    {listTenantWithStatus === "inactive" && (
                      <span
                        onClick={() => {
                          handleTenantDeletion(item.tenant_id, true);
                        }}
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fs-4"
                        style={{ marginLeft: "-80px", marginTop: "43px" }}
                      >
                        DELETE
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    )}
                  </div>
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
        <center>
          <div
            className="container-sm gap-2 mt-2"
            style={{ maxWidth: "30rem" }}
          >
            <p className="mt-5">
              No Tenants Are Available For Listing. <br /> You Can Add Tenants
              Using Add Button
            </p>
          </div>
        </center>
      </>
    );
  }
}
