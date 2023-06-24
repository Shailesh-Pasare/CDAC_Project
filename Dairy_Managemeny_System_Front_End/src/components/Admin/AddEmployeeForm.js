import React, { useState } from "react";
// import {useNavigate}  from 'react-router-dom';
import axios from "axios";
import "../../css/AddEmployeeForm.css";
import "../../css/ProductListForStore.css";
function AddEmployeeForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [gender, setGender] = useState("");
  const [employeeRole, setEmployeeRole] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();
    // Here, you can send the employee data to the backend for storage
    const employeeData = {
      email: email,
      password: password,
      name: name,
      salary: salary,
      gender: gender,
      employeeRole: employeeRole,
      joiningDate: joiningDate,
      phoneNo: phoneNo,
    };
    axios
      .post("http://localhost:7071/employees/save-employees", employeeData)
      .then((response) => {
        console.log("Employee added:", response.data);
        // clear the form after successful submission
        setEmail("");
        setPassword("");
        setName("");
        setSalary("");
        setGender("");
        setEmployeeRole("");
        setJoiningDate("");
        setPhoneNo("");
        window.location.href = "./employees";
      }
      )
      .catch((error) => {
        console.error("Error adding employee:", error);
      });

  };

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <table align="center" bgcolor="#CCC">
          <tr>
            <td className="form-group"  >
              <label htmlFor="email">Email:</label>
            </td>
            <td className="input">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td className="form-group">
              <label htmlFor="password">Password:</label>
            </td>
            <td className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td className="form-group">
              <label htmlFor="text">Name:</label>
            </td>
            <td className="form-group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td className="form-group">
              <label htmlFor="salary">Salary:</label>
            </td>
            <td className="form-group"  >
              <input
                type="number"
                step="0"
                maxLength={24}
                length={30}
                min={0}
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required className="input"
              />
            </td>
          </tr>

          <tr>
            <td className="form-group">
              <label htmlFor="gender">Gender:</label>
            </td>
            <td>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="" aria-readonly>
                  select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="form-group">
              <label htmlFor="role">Role:</label>
            </td>
            <td>
              {/* <input type="text" value={employeeRole} onChange={(e) => setEmployeeRole(e.target.value) } required/> */}
              <select
                value={employeeRole}
                onChange={(e) => setEmployeeRole(e.target.value)}
                required
              >
                <option value="" aria-readonly>
                  select Role
                </option>
                <option value="ADMIN">ADMIN</option>
                <option value="EMPLOYEE">EMPLOYEE</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="form-group">
              <label htmlFor="joiningDate">JoiningDate:</label>
            </td>
            <td>
              <input
                type="date"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                length="40px"
                required
              />
            </td>
          </tr>
          <tr>
            <td className="form-group">
              <label htmlFor="phoneNo">PhoneNo:</label>
            </td>
            <td>
              <input
                type="tel"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr align="center">
            <td colSpan={2}>
              <button type="submit">Add Employee</button>
            </td>
          </tr>
        </table>
      </form>
      <form onSubmit={handleSubmit}>
      </form>
    </div>
  );
}

export default AddEmployeeForm;
