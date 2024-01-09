import React, { useState } from "react";
import "./sharedFile/style.css";
export const ExpenceTraker = () => {
  const [transactionData, setTransactionData] = useState("");
  console.log(transactionData.description, "helloworld");
  function handleSubmit(e) {
    e.preventDefault();
    const { description, transactionmount } = e.target.elements;
    const formData = {
      description: description.value,
      transactionmount: transactionmount.value,
    };
    setTransactionData(formData);
  }

  return (
    <>
      <div className="container-box">
        <h2>Expense Tracker</h2>

        <div>
          <h4>CURRENT BALANCE</h4>
          <h1 id="balance">${transactionData.transactionmount || " 0.00"}</h1>
        </div>
        <div className="payment-section">
          <div className="payment-box">
            <div>
              <h4>INCOME</h4>
              <p className="money plus">
                {transactionData.transactionmount || " 0.00"}
              </p>
            </div>
            <hr />
            <div>
              <h4>EXPENSE</h4>
              <p className="money minus">0.00</p>
            </div>
          </div>
        </div>
        <div className="list-style">
          <h3>Transaction History</h3>
          <div className="scroller">
            {
              transactionData ? 
              <ul className="list">
                <li className="plus">{transactionData.description}</li>
                <span>+${transactionData.transactionmount}</span>
              </ul>
              :''
            }
          </div>
        </div>

        <div className="get-form">
          <h3>Add New Transaction</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label for="description">Description</label>
              <input
                type="text"
                id="description"
                placeholder="Detail of Transaction"
                required
              />
            </div>
            <div className="form-control">
              <label for="transactionmount">Transaction Amount</label>
              <input
                type="number"
                id="transactionmount"
                placeholder="Dollar value of Transaction"
                required
              />
            </div>
            <button type="submit" className="btn">
              Add Transaction
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
