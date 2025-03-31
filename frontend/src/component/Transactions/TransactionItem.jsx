export default function TransactionItem({ transactions }) {
  if (transactions.length != 0) {
    return (
      <>
        <div className="container-flex px-4">
          {transactions.map((item) => {
            return (
              <div key={Math.random() * Math.random()} className="row mb-2">
                <div className="col text-warning text-left">
                  {item.transaction_date}
                </div>
                <div className="col text-warning text-left">
                  {item.transaction_from}
                </div>
                <div className="col text-warning text-left">
                  {item.transaction_mode}
                </div>
                <div className="col text-warning text-left">
                  {item.transaction_amount}
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
        <>
          <center>
            <div
              className="container-sm gap-2 mt-2"
              style={{ maxWidth: "30rem" }}
            >
              <p className="mt-5">
                No Transactions Found. <br /> You Can Add Transactions Using Add
                Button
              </p>
            </div>
          </center>
        </>
      </>
    );
  }
}
