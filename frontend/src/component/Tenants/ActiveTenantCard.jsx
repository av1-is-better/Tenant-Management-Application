export default function ActiveTenantCard({ tenants }) {
  if (tenants.length != 0) {
    return (
      <>
        <div className="container-sm gap-2 mt-2" style={{ maxWidth: "30rem" }}>
          {tenants.map((item) => {
            return (
              <div
                key={item.tenant_id}
                className="card rounded-4 bg-slate mb-3 border-4 border-slate shadow-3"
                style={{ minWidth: "18rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title text-warning fw-bolder fs-1 text-capitalize">
                    {item.tenant_name}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-warning fw-bold">
                    Room No {item.tenant_room_no}
                  </h6>
                  <hr></hr>
                  <p className="text-white">
                    <b>Rented on:</b> {item.tenant_rented_on}
                  </p>
                  <p className="text-white">
                    <b>Contact:</b> +91-{item.tenant_phone_no}
                  </p>
                  <p className="text-white">
                    <b>Status:</b> {item.tenant_status ? "Active" : "In Active"}
                  </p>

                  <div className="d-flex gap-3 text-center">
                    <a className="btn btn-success">Transactions</a>
                    <a className="btn btn-primary">Billings</a>
                    <a className="btn btn-danger text-white">Delete</a>
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
