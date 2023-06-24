import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import "../../css/EditEmployee.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:7071/employees/get-employees")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleDelete = () => {
    axios
      .delete(
        `http://localhost:7071/employees/delete-employees/${selectedEmployee.id}`
      )
      .then((res) => {
        setEmployees(
          employees.filter((employee) => employee.id !== selectedEmployee.id)
        );
        setSelectedEmployee(null);
        setShowDeleteModal(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleEdit = (employee) => {
    setEditedEmployee(employee);
    setShowEditModal(true);
  };

  const editEmployee = () => {
    axios
      .put(`http://localhost:7071/employees/update-employee`, editedEmployee)
      .then((res) => {
        const updatedEmployees = employees.map((employee) => {
          if (employee.id === editedEmployee.id) {
            return editedEmployee;
          }
          return employee;
        });
        setEmployees(updatedEmployees);
        setSelectedEmployee(null);
        setShowEditModal(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <h1>Employee List</h1>
      {error && <p>Error: {error}</p>}
      <Table striped bordered hover bgcolor="#CCC" >
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Joining Date</th>
            <th>Phone No</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.email}</td>
              <td>{employee.name}</td>
              <td>{employee.salary}</td>
              <td>{employee.gender}</td>
              <td>{employee.employeeRole.toLowerCase()}</td>
              <td>{employee.joiningDate}</td>
              <td>{employee.phoneNo}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(employee)}>
                  Edit
                </Button>
              </td>
              <td>
                {employee.employeeRole === "ADMIN" ? (
                  ""
                ) : (
                  <Button
                    variant="danger"
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this employee?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {editedEmployee && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* <Form.Group controlId="formBasicEmail"> */}
              <table>
                <tr>
                  <td>Email address</td>
                  <td>
                    <input
                      type="email"
                      placeholder="Enter email"
                      defaultValue={editedEmployee.email}
                      onChange={(e) =>
                        setEditedEmployee({
                          ...editedEmployee,
                          email: e.target.value,
                        })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td>
                    <input
                      type="password"
                      placeholder="Enter password"
                      defaultValue={editedEmployee.password}
                      onChange={(e) =>
                        setEditedEmployee({
                          ...editedEmployee,
                          password: e.target.value,
                        })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter name"
                      defaultValue={editedEmployee.name}
                      onChange={(e) =>
                        setEditedEmployee({
                          ...editedEmployee,
                          name: e.target.value,
                        })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>Salary</td>
                  <td>
                    <input
                      type="number"
                      placeholder="Enter salary"
                      defaultValue={editedEmployee.salary}
                      onChange={(e) =>
                        setEditedEmployee({
                          ...editedEmployee,
                          salary: e.target.value,
                        })
                      }
                    />
                  </td>
                </tr>

                <tr>
                  <td>Gender</td>
                  <td>
                    <select
                      defaultValue={editedEmployee.gender}
                      onChange={(e) =>
                        setEditedEmployee({
                          ...editedEmployee,
                          gender: e.target.value,
                        })
                      }
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>{" "}
                  </td>
                </tr>

                <tr>
                  <td>Role</td>
                  <td>
                    <select
                      defaultValue={editedEmployee.employeeRole}
                      onChange={(e) =>
                        setEditedEmployee({
                          ...editedEmployee,
                          employeeRole: e.target.value,
                        })
                      }
                    >
                      <option aria-readonly>select Role</option>
                      <option>ADMIN</option>
                      <option>EMPLOYEE</option>
                    </select>{" "}
                  </td>
                </tr>
                <tr>
                  <td>Joining Date</td>
                  <td>
                    <input
                      type="date"
                      placeholder="Enter joining date"
                      defaultValue={editedEmployee.joiningDate}
                      onChange={(e) =>
                        setEditedEmployee({
                          ...editedEmployee,
                          joiningDate: e.target.value,
                        })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>Phone Number</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter phone number"
                      defaultValue={editedEmployee.phoneNo}
                      onChange={(e) =>
                        setEditedEmployee({
                          ...editedEmployee,
                          phoneNo: e.target.value,
                        })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <Button
                      variant="secondary"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancel
                    </Button>

                    <Button variant="primary" onClick={editEmployee}>
                      Save Changes
                    </Button>
                  </td>
                </tr>
              </table>
              {/* </Form.Group> */}

              {/* <Form.Group controlId="fromBasicPassword"></Form.Group>

              <Form.Group controlId="formBasicName"></Form.Group>
              <Form.Group controlId="formBasicSalary">
                <Form.Label></Form.Label>
              </Form.Group>

              <Form.Group controlId="formBasicGender"></Form.Group>

              <Form.Group controlId="formBasicRole"></Form.Group>

              <Form.Group controlId="formBasicJoiningDate"></Form.Group>
              <Form.Group controlId="formBasicPhoneNo">
                <Form.Label></Form.Label>
              </Form.Group> */}
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default EmployeeList;
