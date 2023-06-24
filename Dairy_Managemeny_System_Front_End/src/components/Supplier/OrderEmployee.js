import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const base_url = "http://localhost:7071/orders";


const OrderComponent = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${base_url}/get-order?date=${date}`);
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, [date]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  return (
    <div>
      <h2>Orders</h2>
      <Form>
        <Form.Group controlId="formDate">
          <Form.Label>Date:</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={handleDateChange}
            style={{
              display: 'block',
              margin: '0 auto',
              width: '40mm'
            }}
          />
        </Form.Group>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Order Date</th>
            <th>Bill Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders != null ? orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.orderDate}</td>
              <td>{order.billAmount}</td>
            </tr>
          )) : <td>Order with this Date does Not Exist</td>
          }
        </tbody>
      </Table>
    </div>
  );
};

export default OrderComponent;
