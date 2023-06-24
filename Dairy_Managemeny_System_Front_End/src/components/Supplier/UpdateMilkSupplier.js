import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
//import "../css/UpdateMilkSupplier.css";
import { useParams } from "react-router-dom";
import { useRef } from 'react';


const base_url = "http://localhost:7071/suppliers";

const UpdateMilkSupplier = (props) => {

  const [supplierId, setSupplierId] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  let params = useParams();
  const buttonRef = useRef(null);



  useEffect(() => {
    axios
      .get(`${base_url}/supplier/${params.supplierId}`)
      .then((response) => {
        const supplier = response.data;
        setSupplierId(supplier.supplierId);
        setSupplierName(supplier.supplierName);
        setEmail(supplier.email);
        setPassword(supplier.password);
        setAddress(supplier.address);
        setPhoneNumber(supplier.phoneNumber);
        setRegistrationDate(supplier.registrationDate);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedSupplier = {
      supplierId,
      supplierName,
      email,
      password,
      address,
      phoneNumber,
      registrationDate,
    };
    axios
      .put(`${base_url}/update/${params.supplierId}`, updatedSupplier)
      .then(() => {
        props.history.push("/suppliers");
      })
      .catch((error) => console.log(error));

    window.location.href = "/employeehome";
    buttonRef.current.removeEventListener('click', handleSubmit);
  };

  return (


    <div className="supplier-form-container">
      <h1>Update Supplier Details</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formSupplierId">
          <Form.Label>Supplier ID</Form.Label>
          <Form.Control
            type="text"
            value={supplierId}
            onChange={(event) => setSupplierId(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formSupplierName">
          <Form.Label>Supplier Name</Form.Label>
          <Form.Control
            type="text"
            value={supplierName}
            onChange={(event) => setSupplierName(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formRegistrationDate">
          <Form.Label>Registration Date</Form.Label>
          <Form.Control
            type="date"
            value={registrationDate}
            onChange={(event) => setRegistrationDate(event.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Supplier
        </Button>
      </Form>
    </div>
  );

};

export default UpdateMilkSupplier;
