import React, { useState } from "react";
import "./sharedFile/style.css";
import deleteIcon from "../assets/react.svg";
import { useForm } from "react-hook-form";
export const ExpenceTraker = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { register, handleSubmit } = useForm();
  const getData = (newData, e) => {
    setTransactionData([...transactionData, newData]);
    e.target.reset();
  };
  let totalAmount = 0;
  let expense = 0;
  let income = 0;
  for (let i = 0; i < transactionData.length; i++) {
    const value = Number(transactionData[i].amount);
    totalAmount += value;
    if (value < 0) {
      expense -= value;
    } else {
      income += value;
    }
  }

  function deleteHistory(i) {
    let total = [...transactionData];
    total.splice(i, 1);
    setTransactionData(total);
  }

  // **************Serch history***********
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredArray = transactionData?.filter((array) =>
    searchQuery
      .toLowerCase()
      .split(" ")
      .every((term) => {
        return array?.description?.toLowerCase().includes(term);
      })
  );

  return (
    <>
      <div className="container-box">
        <h2>Expense Tracker</h2>

        <div>
          <h4>CURRENT BALANCE</h4>
          <h1 id="balance">${totalAmount.toFixed(2) || " 0.00"}</h1>
        </div>
        <div className="payment-section">
          <div className="payment-box">
            <div>
              <h4>INCOME</h4>
              <p className="money plus">{income.toFixed(2) || " 0.00"}</p>
            </div>
            <hr />
            <div>
              <h4>EXPENSE</h4>
              <p className="money minus">{expense.toFixed(2) || " 0.00"}</p>
            </div>
          </div>
        </div>
        <div className="list-style">
          <input
            type="text"
            placeholder="Search Transaction"
            onChange={handleSearchChange}
          />
          <h3>Transaction History</h3>
          <div className="scroller">
            {filteredArray.map((item, i) => {
              return (
                <>
                  <div key={i} className="history-box">
                    <img
                    // className={item.amount < 0 ? "less" : "greater"}
                      className="hide"
                      src={deleteIcon}
                      alt="logo"
                      onClick={() => deleteHistory(i)}
                    />
                    <ul
                      className={item.amount < 0 ? "less-then" : "greater-then"}
                    >
                      <li className="plus">{item.description}</li>
                      <span>
                        {item.amount < 0
                          ? `-$ ${Math.abs(item.amount)}`
                          : `+$ ${item.amount}`}
                      </span>
                    </ul>
                  </div>
                </>
              );
            })}
          </div>
        </div>

        <div className="get-form">
          <h3>Add New Transaction</h3>

          <form onSubmit={handleSubmit(getData)}>
            <div className="form-control">
              <label for="description">Description</label>
              <input
                type="text"
                id="description"
                placeholder="Detail of Transaction"
                required
                {...register("description")}
              />
            </div>
            <div className="form-control">
              <label for="transactionmount">
                Transaction Amount
                <br />
                (negative - expense, positive - income)
              </label>
              <input
                type="number"
                id="transactionmount"
                placeholder="Dollar value of Transaction"
                required
                {...register("amount")}
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
