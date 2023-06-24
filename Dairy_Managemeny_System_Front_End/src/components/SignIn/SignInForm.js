import React, { useState } from "react";
import axios from "axios";
import "../../css/SignInForm.css";
import EmployeeHome from '../Employee/EmployeeHome';

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState();


  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can send the login data to the backend for authentication
    const loginData = {
      email: email,
      password: password,
      role: role,
    };
    axios
      .post("http://localhost:7071/login", loginData)
      .then((response) => {
        console.log("User signed in:", response.data);

        if (response.data.role === "STORE") {
          axios
            .get(`http://localhost:7071/stores/get-id/${loginData.email}`)
            .then((response) => {
              console.log(response.data.id);
              window.location.href = `/products/get-products/${response.data.id}`;
            })
            .catch((error) => {
              console.error("Error signing in:", error);
              window.alert("Invalid Email or password!");
            });
        }

        if (response.data.role === "ADMIN") {
          window.location.href = `/employees`;
        }

        if (response.data.role === "EMPLOYEE") {
          window.location.href = `/employeehome`;
        }


        if (response.data.role === "SUPPLIER") {
          window.location.href = `/supplier`;
        }

        if (response.data.role === null) {
          window.alert("Please enter a email or password or Role!");
        }
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        window.alert("Invalid Email or password!");
      });
  };

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="" aria-readonly> select role</option> 
            <option value="ADMIN">ADMIN</option>
            <option value="EMPLOYEE">EMPLOYEE</option>
            <option value="SUPPLIER">SUPPLIER</option>
            <option value="STORE">STORE</option>
          </select>
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
