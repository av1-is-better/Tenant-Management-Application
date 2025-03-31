export default function TransactionColumnHeading() {
  return (
    <>
      <div className="container-flex px-4 mt-1">
        <div className="row mb-3">
          <div className="col">
            <b>Date</b>
          </div>
          <div className="col">
            <b>From</b>
          </div>
          <div className="col">
            <b>Mode</b>
          </div>
          <div className="col">
            <b>Received</b>
          </div>
        </div>
      </div>
    </>
  );
}
