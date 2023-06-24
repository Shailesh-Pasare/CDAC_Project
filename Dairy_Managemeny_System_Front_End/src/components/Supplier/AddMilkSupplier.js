import React, { useState } from "react";
import axios from "axios";
import "../../css/AddMilkSuppliers.css";
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';


const base_url = "http://localhost:7071/suppliers";
const AddMilkSupplier = () => {
  const [supplierName, setSupplierName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [message, setMessage] = useState("");
  const buttonRef = useRef(null);
  const history = useHistory();
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(registrationDate);
    try {
      const response = await axios.post(`${base_url}/add`, {
        supplierName,
        email,
        password,
        address,
        phoneNumber,
        registrationDate,
      });

      if (response.status === 201) {
        setMessage("Supplier Registered Successfully");
        setSupplierName("");
        setEmail("");
        setPassword("");
        setAddress("");
        setPhoneNumber("");
        setRegistrationDate("");
      }
    } catch (error) {
      setMessage("An error occurred while registering the supplier");
      console.error(error);
    }



    window.location.reload();
    buttonRef.current.removeEventListener('click', handleFormSubmit);
  };

  return (
    <div className="add-milk-suppliers">
      <h2>Add Milk Supplier</h2>
      {message && <div className="alert alert-success">{message}</div>}
      <form onSubmit={handleFormSubmit}>
        <table align="center">
          <tr>
            <td className="form-group">
              <label htmlFor="supplier-name">Supplier Name:</label>
            </td>
            <td>
              <input
                type="text"
                id="supplier-name"
                value={supplierName}
                onChange={(event) => setSupplierName(event.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td className="form-group">
              <label htmlFor="email">Email:</label>
            </td>
            <td>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td className="form-group">
              <label htmlFor="password">Password:</label>
            </td>
            <td>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td className="form-group">
              <label htmlFor="address">Address:</label>
            </td>
            <td>
              <textarea
                id="address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                required
              />
            </td>
          </tr>

          <tr>
            <td className="form-group">
              <label htmlFor="phone-number">Phone Number:</label>
            </td>
            <td>
              <input
                type="tel"
                id="phone-number"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td className="form-group">
              <label htmlFor="registration-date">Registration Date:</label>
            </td>
            <td>
              <input
                type="date"
                id="registration-date"
                value={registrationDate}
                onChange={(event) => setRegistrationDate(event.target.value)}
                required
              />
            </td>
          </tr>
          <tr align="center">
            <td colSpan={2}>
              <button type="submit">Register Supplier</button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default AddMilkSupplier;
