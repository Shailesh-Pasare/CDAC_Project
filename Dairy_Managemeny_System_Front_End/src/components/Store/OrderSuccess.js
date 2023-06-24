import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const OrderSuccess = () => {
  const [order, setOrder] = useState([]);
  const Params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:7071/orders/get-placed-order/${Params.id}`)
      .then((response) => {
        setOrder(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Order Placed Successfully</h2>
      <table bgcolor="#CCC">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {order.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.orderDate}</td>
              <td>{order.billAmount}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={3}>
              <button value={'Back'} onClick={() => { window.location.href = `/products/get-products/${Params.id}` }}>Back</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderSuccess;
