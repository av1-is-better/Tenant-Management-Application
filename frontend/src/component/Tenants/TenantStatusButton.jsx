export default function TenantStatusButton({
  listTenantWithStatus,
  setListTenantWithStatus,
  fetchTenants,
}) {
  return (
    <center>
      {listTenantWithStatus == "active" && (
        <div className="container gap-2">
          <button type="button" className="btn btn-warning">
            Active
          </button>
          <button
            onClick={() => {
              setListTenantWithStatus("inactive");
              fetchTenants("inactive");
            }}
            type="button"
            className="btn btn-dark"
          >
            Inactive
          </button>
        </div>
      )}

      {listTenantWithStatus == "inactive" && (
        <div className="container gap-2">
          <button
            onClick={() => {
              setListTenantWithStatus("active");
              fetchTenants("active");
            }}
            type="button"
            className="btn btn-dark"
          >
            Active
          </button>
          <button type="button" className="btn btn-warning">
            Inactive
          </button>
        </div>
      )}
    </center>
  );
}
