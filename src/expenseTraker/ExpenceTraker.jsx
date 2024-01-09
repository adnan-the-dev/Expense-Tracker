import React, { useState } from "react";
import "./sharedFile/style.css";
import deleteIcon from '../assets/react.svg'
import { useForm } from "react-hook-form";
export const ExpenceTraker = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { register, handleSubmit } = useForm()
  const getData = (newData) => {
    setTransactionData([...transactionData, newData])

  }
  let totalAmount = 0
  for (let i = 0; i < transactionData.length; i++) {
    totalAmount += Number(transactionData[i].amount)
  }


  function deleteHistory(i) {
    let total = [...transactionData]
    total.splice(i, 1)
    setTransactionData(total)

  }

  // **************Serch history***********
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }
  const filteredArray = transactionData?.filter((array) =>
    searchQuery
      .toLowerCase()
      .split(' ')
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
              <p className="money plus">
                {totalAmount.toFixed(2) || " 0.00"}
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
          <input type="text" placeholder="Search Transaction" onChange={handleSearchChange} />
          <h3>Transaction History</h3>
          <div className="scroller">
            {
              filteredArray.map((item, i) => {
                return (
                  <>
                    <div className="history-box">
                      <img className="hide" src={deleteIcon} alt="logo" onClick={() => deleteHistory(i)} />
                      <ul key={i} className={item.amount < 0 ? 'list1' : 'list'}>
                        <li className="plus">{item.description}</li>
                        <span>{item.amount < 0 ? '-$' : '+$'}</span>
                      </ul>
                    </div>
                  </>
                )
              })
            }
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
                {...register('description')}
              />
            </div>
            <div className="form-control">
              <label for="transactionmount">Transaction Amount
                <br />
                (negative - expense, positive - income)
              </label>
              <input
                type="number"
                id="transactionmount"
                placeholder="Dollar value of Transaction"
                required
                {...register('amount')}
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


