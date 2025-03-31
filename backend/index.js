const express = require("express");
const bodyParser = require("body-parser");
const PDFDocument = require("pdfkit");
const cors = require("cors");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "192.168.2.2",
  database: "Tenant",
  password: "MYPASS123",
  port: 5432,
});

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());
let count = 0;

// List All Bills For Active Tenants
app.get("/api/bills/active", (api_request, api_response) => {
  count += 1;
  // Example query
  pool.query(
    `SELECT billings.bill_date, 
    billings.bill_id,
    billings.tenant_id,
    tenants.tenant_name,
    tenants.tenant_room_no,
    CONCAT(tenants.tenant_name,' [R',tenants.tenant_room_no,']') AS for,
    billings.rent_charge,
    billings.power_charge,
    billings.water_charge,
    billings.other_charge,
    billings.power_consumed,
    billings.power_unit_cost,
    billings.total,
    billings.message_note
    FROM billings
    JOIN tenants ON billings.tenant_id=tenants.tenant_id
    WHERE tenants.tenant_status=true ORDER BY billings.bill_id DESC;`,
    (query_error, query_response) => {
      if (query_error) {
        api_response.json({ Result: [] });
      } else {
        console.log("Served", count);
        api_response.json({ Result: query_response.rows });
      }
      // Release the client back to the pool
    }
  );
});

// List Bill With Specific Tenant ID
app.get("/api/bills/tenants/:id", (api_request, api_response) => {
  const tenant_id = api_request.params.id;
  // Example query
  pool.query(
    `SELECT billings.bill_date, 
    billings.bill_id,
    billings.tenant_id,
    tenants.tenant_name,
    tenants.tenant_room_no,
    CONCAT(tenants.tenant_name,' [R',tenants.tenant_room_no,']') AS for,
    billings.rent_charge,
    billings.power_charge,
    billings.water_charge,
    billings.other_charge,
    billings.power_consumed,
    billings.power_unit_cost,
    billings.total,
    billings.message_note
    FROM billings
    JOIN tenants ON billings.tenant_id=tenants.tenant_id
    WHERE tenants.tenant_id=${tenant_id};`,
    (query_error, query_response) => {
      if (query_error) {
        api_response.json({ Result: [] });
      } else {
        api_response.json({ Result: query_response.rows });
      }
      // Release the client back to the pool
    }
  );
});

// Update Bill API
app.put("/api/bills", (api_request, api_response) => {
  switch (false) {
    case api_request.body.hasOwnProperty("bill_id"):
      api_response.json({ error: "Missing Property bill_id" });
      break;
    case api_request.body.hasOwnProperty("bill_date"):
      api_response.json({ error: "Missing Property bill_date" });
      break;
    case api_request.body.hasOwnProperty("rent_charge"):
      api_response.json({ error: "Missing Property rent_charge" });
      break;
    case api_request.body.hasOwnProperty("power_charge"):
      api_response.json({ error: "Missing Property power_charge" });
      break;
    case api_request.body.hasOwnProperty("water_charge"):
      api_response.json({ error: "Missing Property water_charge" });
      break;
    case api_request.body.hasOwnProperty("other_charge"):
      api_response.json({ error: "Missing Property other_charge" });
      break;
    case api_request.body.hasOwnProperty("power_consumed"):
      api_response.json({ error: "Missing Property power_consumed" });
      break;
    case api_request.body.hasOwnProperty("power_unit_cost"):
      api_response.json({ error: "Missing Property power_unit_cost" });
      break;
    case api_request.body.hasOwnProperty("total"):
      api_response.json({ error: "Missing Property total" });
      break;
    case api_request.body.hasOwnProperty("message_note"):
      api_response.json({ error: "Missing Property message_note" });
      break;
    default:
      pool.query(
        `UPDATE billings SET bill_date='${api_request.body.bill_date}',
          rent_charge=${api_request.body.rent_charge},
          power_charge=${api_request.body.power_charge},
          water_charge=${api_request.body.water_charge},
          other_charge=${api_request.body.other_charge},
          power_consumed=${api_request.body.power_consumed},
          power_unit_cost=${api_request.body.power_unit_cost},
          total=${api_request.body.total},
          message_note='${api_request.body.message_note}'
          WHERE bill_id=${api_request.body.bill_id}`,
        (query_error, query_response) => {
          if (query_error) {
            api_response.json({ error: `Failed` });
          } else {
            api_response.json({ message: `Success` });
          }
          // Release the client back to the pool
        }
      );
      break;
  }
});

// Delete Bill With Specific Bill ID
app.delete("/api/bills/billid/:id", (api_request, api_response) => {
  const bill_id = api_request.params.id;
  count += 1;
  // Example query
  pool.query(
    `DELETE FROM billings WHERE bill_id=${bill_id};`,
    (query_error, query_response) => {
      if (query_error) {
        api_response.json({ Result: [] });
      } else {
        console.log("Served", count);
        api_response.json({ Result: query_response.rows });
      }
      // Release the client back to the pool
    }
  );
});

// Create Transaction Post Request
app.post("/api/bills", (api_request, api_response) => {
  switch (false) {
    case api_request.body.hasOwnProperty("tenant_id"):
      api_response.json({ error: "Missing Property tenant_id" });
      break;
    case api_request.body.hasOwnProperty("bill_date"):
      api_response.json({ error: "Missing Property bill_date" });
      break;
    case api_request.body.hasOwnProperty("rent_charge"):
      api_response.json({ error: "Missing Property rent_charge" });
      break;
    case api_request.body.hasOwnProperty("power_charge"):
      api_response.json({ error: "Missing Property power_charge" });
      break;
    case api_request.body.hasOwnProperty("water_charge"):
      api_response.json({ error: "Missing Property water_charge" });
      break;
    case api_request.body.hasOwnProperty("other_charge"):
      api_response.json({ error: "Missing Property other_charge" });
      break;
    case api_request.body.hasOwnProperty("power_consumed"):
      api_response.json({ error: "Missing Property power_consumed" });
      break;
    case api_request.body.hasOwnProperty("power_unit_cost"):
      api_response.json({ error: "Missing Property power_unit_cost" });
      break;
    case api_request.body.hasOwnProperty("total"):
      api_response.json({ error: "Missing Property total" });
      break;
    case api_request.body.hasOwnProperty("message_note"):
      api_response.json({ error: "Missing Property message_note" });
      break;
    default:
      pool.query(
        `INSERT INTO billings(
          bill_date,
          tenant_id,
          rent_charge,
          power_charge,
          water_charge,
          other_charge,
          power_consumed,
          power_unit_cost,
          total,
          message_note
          )
	VALUES('${api_request.body.bill_date}',
        ${api_request.body.tenant_id},
        ${api_request.body.rent_charge},
        ${api_request.body.power_charge},
        ${api_request.body.water_charge},
        ${api_request.body.other_charge},
        ${api_request.body.power_consumed},
        ${api_request.body.power_unit_cost},
        ${api_request.body.total},
        '${api_request.body.message_note}')`,
        (query_error, query_response) => {
          if (query_error) {
            api_response.json({ error: `Failed` });
          } else {
            api_response.json({ message: `Success` });
          }
          // Release the client back to the pool
        }
      );
      break;
  }
});

// List All Transactions Made By Active Tenants
app.get("/api/transactions/active", (api_request, api_response) => {
  count += 1;
  // Example query
  pool.query(
    "SELECT tenants.tenant_id, transactions.transaction_id, transactions.transaction_date, transactions.transaction_mode, transactions.transaction_amount, CONCAT(tenants.tenant_name,' [R',tenants.tenant_room_no,']') AS transaction_from FROM transactions JOIN tenants ON transactions.tenant_id = tenants.tenant_id WHERE tenants.tenant_status=true ORDER BY transactions.transaction_id DESC;",
    (query_error, query_response) => {
      if (query_error) {
        api_response.json({ Result: [] });
      } else {
        console.log("Served", count);
        api_response.json({ Result: query_response.rows });
      }
      // Release the client back to the pool
    }
  );
});

// List All Transactions Made By Specific TenantID
app.get("/api/transactions/tenants/:id", (api_request, api_response) => {
  const tenant_id = api_request.params.id;
  count += 1;
  // Example query
  pool.query(
    `SELECT tenants.tenant_id, transactions.transaction_id, transactions.transaction_date, transactions.transaction_mode, transactions.transaction_amount, CONCAT(tenants.tenant_name,' [R',tenants.tenant_room_no,']') AS transaction_from FROM transactions JOIN tenants ON transactions.tenant_id = tenants.tenant_id WHERE tenants.tenant_id=${tenant_id} ORDER BY transactions.transaction_id DESC;`,
    (query_error, query_response) => {
      if (query_error) {
        api_response.json({ Result: [] });
      } else {
        console.log("Served", count);
        api_response.json({ Result: query_response.rows });
      }
      // Release the client back to the pool
    }
  );
});

// Delete Transaction With Specific Transaction ID
app.delete(
  "/api/transactions/transactionid/:id",
  (api_request, api_response) => {
    const transaction_id = api_request.params.id;
    count += 1;
    // Example query
    pool.query(
      `DELETE FROM transactions WHERE transaction_id=${transaction_id};`,
      (query_error, query_response) => {
        if (query_error) {
          api_response.json({ Result: [] });
        } else {
          console.log("Served", count);
          api_response.json({ Result: query_response.rows });
        }
        // Release the client back to the pool
      }
    );
  }
);

// List Specific Transaction By TransactionID
app.get("/api/transactions/transactionid/:id", (api_request, api_response) => {
  const transaction_id = api_request.params.id;
  count += 1;
  // Example query
  pool.query(
    `SELECT tenants.tenant_id, transactions.transaction_id, transactions.transaction_date, transactions.transaction_mode, transactions.transaction_amount, CONCAT(tenants.tenant_name,' [R',tenants.tenant_room_no,']') AS transaction_from FROM transactions JOIN tenants ON transactions.tenant_id = tenants.tenant_id WHERE transactions.transaction_id=${transaction_id};`,
    (query_error, query_response) => {
      if (query_error) {
        api_response.json({ Result: [] });
      } else {
        console.log("Served", count);
        api_response.json({ Result: query_response.rows });
      }
      // Release the client back to the pool
    }
  );
});

// Listing Active Tenants
app.get("/api/tenants/active", (api_request, api_response) => {
  count += 1;
  pool.query(
    `SELECT
    t.*,
    COALESCE(transaction_count, 0) AS transaction_count,
    COALESCE(bill_count, 0) AS bill_count,
    COALESCE(sum_of_total_transaction_amount, 0) AS sum_of_total_transaction_amount,
    COALESCE(sum_of_total_bill, 0) AS sum_of_total_bill
FROM tenants t
LEFT JOIN (
    SELECT
        tenant_id,
        COUNT(transaction_id) AS transaction_count,
        SUM(transaction_amount) AS sum_of_total_transaction_amount
    FROM transactions
    GROUP BY tenant_id
) trans ON t.tenant_id = trans.tenant_id
LEFT JOIN (
    SELECT
        tenant_id,
        COUNT(bill_id) AS bill_count,
        SUM(total) AS sum_of_total_bill
    FROM billings
    GROUP BY tenant_id
) bills ON t.tenant_id = bills.tenant_id
 WHERE t.tenant_status = true ORDER BY tenant_room_no;`,
    (query_error, query_response) => {
      if (query_error) {
        api_response.json({ Result: [] });
      } else {
        console.log("Served", count);
        api_response.json({ Result: query_response.rows });
      }
      // Release the client back to the pool
    }
  );
});

// Listing Inactive Tenants
app.get("/api/tenants/inactive", (api_request, api_response) => {
  count += 1;
  // Example query
  pool.query(
    `SELECT
    t.*,
    COALESCE(transaction_count, 0) AS transaction_count,
    COALESCE(bill_count, 0) AS bill_count,
    COALESCE(sum_of_total_transaction_amount, 0) AS sum_of_total_transaction_amount,
    COALESCE(sum_of_total_bill, 0) AS sum_of_total_bill
FROM tenants t
LEFT JOIN (
    SELECT
        tenant_id,
        COUNT(transaction_id) AS transaction_count,
        SUM(transaction_amount) AS sum_of_total_transaction_amount
    FROM transactions
    GROUP BY tenant_id
) trans ON t.tenant_id = trans.tenant_id
LEFT JOIN (
    SELECT
        tenant_id,
        COUNT(bill_id) AS bill_count,
        SUM(total) AS sum_of_total_bill
    FROM billings
    GROUP BY tenant_id
) bills ON t.tenant_id = bills.tenant_id
WHERE t.tenant_status = false ORDER BY tenant_room_no;`,
    (query_error, query_response) => {
      if (query_error) {
        api_response.json({ Result: [] });
      } else {
        console.log("Served", count);
        api_response.json({ Result: query_response.rows });
      }
      // Release the client back to the pool
    }
  );
});

app.post("/test", (api_request, api_response) => {
  console.log(api_request.body);
  api_response.json({ message: "ok" });
});

// Create Tenant Post Request
app.post("/api/tenants", (api_request, api_response) => {
  switch (false) {
    case api_request.body.hasOwnProperty("tenant_name"):
      api_response.json({ error: "Missing Property tenant_name" });
      break;
    case api_request.body.hasOwnProperty("tenant_room_no"):
      api_response.json({ error: "Missing Property tenant_room_no" });
      break;
    case api_request.body.hasOwnProperty("tenant_phone_no"):
      api_response.json({ error: "Missing Property tenant_phone_no" });
      break;
    case api_request.body.hasOwnProperty("tenant_status"):
      api_response.json({ error: "Missing Property tenant_status" });
      break;
    case api_request.body.hasOwnProperty("tenant_rented_on"):
      api_response.json({ error: "Missing Property tenant_rented_on" });
      break;
    default:
      pool.query(
        `INSERT INTO tenants(
	tenant_name,
	tenant_room_no,
	tenant_phone_no,
	tenant_status,
	tenant_rented_on)
	VALUES(
        '${api_request.body.tenant_name}',
        ${api_request.body.tenant_room_no},
        '${api_request.body.tenant_phone_no}',
        ${api_request.body.tenant_status},
        '${api_request.body.tenant_rented_on}')`,
        (query_error, query_response) => {
          if (query_error) {
            api_response.json({ error: `Failed` });
          } else {
            api_response.json({ message: `Success` });
          }
          // Release the client back to the pool
        }
      );
      break;
  }
});

// Create Transaction Post Request
app.post("/api/transactions", (api_request, api_response) => {
  switch (false) {
    case api_request.body.hasOwnProperty("tenant_id"):
      api_response.json({ error: "Missing Property tenant_id" });
      break;
    case api_request.body.hasOwnProperty("transaction_amount"):
      api_response.json({ error: "Missing Property transaction_amount" });
      break;
    case api_request.body.hasOwnProperty("transaction_date"):
      api_response.json({ error: "Missing Property transaction_date" });
      break;
    case api_request.body.hasOwnProperty("transaction_mode"):
      api_response.json({ error: "Missing Property transaction_mode" });
      break;
    default:
      pool.query(
        `INSERT INTO transactions(
	tenant_id,
	transaction_date,
	transaction_amount,
	transaction_mode)
	VALUES(
        ${api_request.body.tenant_id},
        '${api_request.body.transaction_date}',
        ${api_request.body.transaction_amount},
        '${api_request.body.transaction_mode}')`,
        (query_error, query_response) => {
          if (query_error) {
            api_response.json({ error: `Failed` });
          } else {
            api_response.json({ message: `Success` });
          }
          // Release the client back to the pool
        }
      );
      break;
  }
});

// Update Transaction PUT Request
app.put("/api/updatetransactions", (api_request, api_response) => {
  switch (false) {
    case api_request.body.hasOwnProperty("transaction_id"):
      api_response.json({ error: "Missing Property transaction_id" });
      break;
    case api_request.body.hasOwnProperty("transaction_amount"):
      api_response.json({ error: "Missing Property transaction_amount" });
      break;
    case api_request.body.hasOwnProperty("transaction_date"):
      api_response.json({ error: "Missing Property transaction_date" });
      break;
    case api_request.body.hasOwnProperty("transaction_mode"):
      api_response.json({ error: "Missing Property transaction_mode" });
      break;
    default:
      pool.query(
        `UPDATE transactions SET transaction_amount=${
          api_request.body.transaction_amount
        }, transaction_date='${
          api_request.body.transaction_date
        }', transaction_mode='${
          api_request.body.transaction_mode
        }' WHERE transaction_id=${Number(api_request.body.transaction_id)};`,
        (query_error, query_response) => {
          if (query_error) {
            api_response.json({ error: `Failed` });
          } else {
            api_response.json({ message: `Success` });
          }
          // Release the client back to the pool
        }
      );
      break;
  }
});

app.put("/api/changestatus", (api_request, api_response) => {
  switch (false) {
    case api_request.body.hasOwnProperty("tenant_id"):
      api_response.json({ error: "Missing Property tenant_id" });
      break;
    case api_request.body.hasOwnProperty("tenant_status"):
      api_response.json({ error: "Missing Property tenant_status" });
      break;
    default:
      pool.query(
        `UPDATE tenants set tenant_status=${api_request.body.tenant_status} where tenant_id=${api_request.body.tenant_id}`,
        (query_error, query_response) => {
          if (query_error) {
            api_response.json({ error: `Failed` });
          } else {
            api_response.json({ message: `Success` });
          }
          // Release the client back to the pool
        }
      );
      break;
  }
});

// Tenant Deletion Request
app.put("/api/deletetenant", (api_request, api_response) => {
  switch (false) {
    case api_request.body.hasOwnProperty("tenant_id"):
      api_response.json({ error: "Missing Property tenant_id" });
      break;
    default:
      pool.query(
        `DELETE FROM transactions where tenant_id=${api_request.body.tenant_id}`,
        (query_error, query_response) => {}
      );
      pool.query(
        `DELETE FROM billings where tenant_id=${api_request.body.tenant_id}`,
        (query_error, query_response) => {}
      );
      pool.query(
        `DELETE FROM tenants where tenant_id=${api_request.body.tenant_id}`,
        (query_error, query_response) => {
          if (query_error) {
            api_response.json({ error: `Failed` });
          } else {
            api_response.json({ message: `Success` });
          }
          // Release the client back to the pool
        }
      );
      break;
  }
});

// Invoice PDF Generator
app.post("/generate-invoices", (req, res) => {
  const { bills } = req.body;

  // Create a single PDF document
  const pdfDoc = new PDFDocument();
  const filename = "invoices.pdf";

  // Set response headers for PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

  // Pipe the PDF content to the response stream
  pdfDoc.pipe(res);

  // Calculate the number of cards per page
  const cardsPerPage = 10;
  const cardsPerRow = 2;
  const marginX = 20;
  const marginY = 20;

  let isFirstPage = true;

  // Loop through invoices and add them to the PDF
  for (let i = 0; i < bills.length; i++) {
    const bill = bills[i];

    // Calculate dynamic box size based on the longest line in content
    const lines = [
      `Invoice Number: ${bill.invoiceNumber}`,
      `Tenant Name: ${bill.tenant_name}`,
      `Electric Unit Consumed: ${bill.electric_unit_consumed}`,
      `Price Per Unit: ${bill.price_per_unit}`,
      `Electricity Cost: ${bill.electricity_cost}`,
      `Amount: Rs.${bill.amount}`,
    ];

    const maxWidth = Math.max(
      ...lines.map((line) => pdfDoc.widthOfString(line))
    );
    const cardWidth = maxWidth + 20; // Add padding
    const cardHeight = lines.length * 15 + 20; // Assuming 15 units height for each line

    // Check if a new page is needed
    if (!isFirstPage && i % cardsPerPage === 0) {
      pdfDoc.addPage();
    }

    // Calculate card position
    const j = i % cardsPerPage;
    const row = Math.floor(j / cardsPerRow);
    const col = j % cardsPerRow;
    const cardX = marginX + col * (cardWidth + marginX);
    const cardY = marginY + row * (cardHeight + marginY);

    // Add box border around the card
    pdfDoc.rect(cardX, cardY, cardWidth, cardHeight).stroke();

    // Add invoice details to the PDF in a card-like structure
    lines.forEach((line, index) => {
      pdfDoc.text(line, cardX + 10, cardY + 10 + index * 15);
    });

    // After the first set of cards, set isFirstPage to false
    isFirstPage = false;
  }

  // Finalize the PDF and end the response
  pdfDoc.end();
});

app.listen(PORT, () =>
  console.log(`Server Started At: http://localhost:${PORT}`)
);
