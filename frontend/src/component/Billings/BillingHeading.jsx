export default function BillingHeading({ mode, tenant_name }) {
  return (
    <div className="container text-center mt-4" style={{ maxWidth: "30rem" }}>
      {mode === "custom" ? (
        <h1>
          <hr />
          {tenant_name} Bills <hr />
        </h1>
      ) : (
        <h1>
          <hr />
          All Bills <hr />
        </h1>
      )}
    </div>
  );
}
