// Solution using:
// - Guards
// - Code Splitting by levels of abstractions
// - Inverse Checking Logic
// - Error Throwing & Handling

main();

function main() {
  const transactions = [
    {
      id: "t1",
      type: "PAYMENT",
      status: "OPEN",
      method: "CREDIT_CARD",
      amount: "23.99",
    },
    {
      id: "t2",
      type: "PAYMENT",
      status: "OPEN",
      method: "PAYPAL",
      amount: "100.43",
    },
    {
      id: "t3",
      type: "REFUND",
      status: "OPEN",
      method: "CREDIT_CARD",
      amount: "10.99",
    },
    {
      id: "t4",
      type: "PAYMENT",
      status: "CLOSED",
      method: "PLAN",
      amount: "15.99",
    },
  ];

  // Add Error Handling
  try {
    processTransactions(transactions);
  } catch (error) {
    showErrorMessage(error.message);
  }
}

function processTransactions(transactions) {
  // The error throwing bubble ups ! Great feature of programming languages
  // works like a Guard
  validateTransactions(transactions);

  for (const transaction of transactions) {
    processTransaction(transaction);
  }
}

function validateTransactions(transactions) {
  // Adding a Guard to fail fast
  if (isEmpty(transactions)) {
    // Good practice: if something is an error -> make it an error
    const error = new Error("No transactions provided!");
    error.code = 1;
    throw error;
  }
}

function processTransaction(transaction) {
  try {
    validateTransaction(transaction);
    processByMethod(transaction);
  } catch (error) {
    showErrorMessage(error.message, error.item);
  }
}

function validateTransaction(transaction) {
  // Adding a Guard
  if (transaction.status !== "OPEN") {
    throw new Error("Invalid transaction type!");
  }

  if (!isPayment(transaction) && !isRefund(transaction)) {
    const error = new Error("Invalid transaction type");
    error.item = transaction;
    throw error; // where should you handle this errors? -> in the for loop
  }
}

function processByMethod(transaction) {
  if (usesCreditCard(transaction)) {
    processCreditCardTransaction(transaction);
  } else if (usesPaypal(transaction)) {
    processPaypalTransaction(transaction);
  } else if (usesPlan(transaction)) {
    processPlanTransaction(transaction);
  }
}

function processCreditCardTransaction(transaction) {
  if (isPayment(transaction)) {
    processCreditCardPayment(transaction);
  } else if (isRefund(transaction)) {
    processCreditCardRefund(transaction);
  }
}

function processPaypalTransaction(transaction) {
  if (isPayment(transaction)) {
    processPayPalPayment(transaction);
  } else if (isRefund(transaction)) {
    processPayPalRefund(transaction);
  }
}

function processPlanTransaction(transaction) {
  if (isPayment(transaction)) {
    processPlanPayment(transaction);
  } else if (isRefund(transaction)) {
    processPlanRefund(transaction);
  }
}

function usesCreditCard(transaction) {
  return transaction.method === "CREDIT_CARD";
}

function usesPaypal(transaction) {
  return transaction.method === "PAYPAL";
}

function usesPlan(transaction) {
  return transaction.method === "PLAN";
}

function isPayment(transaction) {
  return transaction.type === "PAYMENT";
}

function isRefund(transaction) {
  return transaction.type === "REFUND";
}

function isEmpty(transactions) {
  return !transactions || transactions.length === 0;
}

function showErrorMessage(message, item) {
  console.log(message);

  if (item) {
    console.log(item);
  }
}

function processCreditCardPayment(transaction) {
  console.log(
    "Processing credit card payment for amount: " + transaction.amount
  );
}

function processCreditCardRefund(transaction) {
  console.log(
    "Processing credit card refund for amount: " + transaction.amount
  );
}

function processPayPalPayment(transaction) {
  console.log("Processing PayPal payment for amount: " + transaction.amount);
}

function processPayPalRefund(transaction) {
  console.log("Processing PayPal refund for amount: " + transaction.amount);
}

function processPlanPayment(transaction) {
  console.log("Processing plan payment for amount: " + transaction.amount);
}

function processPlanRefund(transaction) {
  console.log("Processing plan refund for amount: " + transaction.amount);
}
