export default function TransactionColumnHeadingWithUpdate() {
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
            <b>Amount</b>
          </div>
          <div className="col">
            <b>Action</b>
          </div>
        </div>
      </div>
    </>
  );
}
