import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../css/ViewMilkSuppliers.css";
import { useRef } from 'react';


const base_url = "http://localhost:7071/suppliers";
const ViewMilkSupplier = () => {
  const buttonRef = useRef(null);


  const [milkSuppliers, setMilkSuppliers] = useState([]);

  useEffect(() => {

    axios.get(`${base_url}/supplierlist`)
      .then(res => setMilkSuppliers(res.data))
      .catch(err => console.log(err));
  }, []);


  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) {
      return;
    }
    axios.delete(`${base_url}/delete/${id}`)
      .then(res => {
        const newMilkSuppliers = milkSuppliers.filter(supplier => supplier.supplierid !== id);
        setMilkSuppliers(newMilkSuppliers);
      })
      .catch(err => console.log(err));

    window.location.reload();
    buttonRef.current.removeEventListener('click', handleDelete);
  }

  function handleClick(supplierId) {
    window.location.href = `/update/${supplierId}`;
  }


  return (
    <div className="container mt-5">
      <table className="table" bgcolor='#ccc'>
        <thead>
          <tr><th colSpan={8} bgcolor="#CCC"><h2 className="mb-4">Milk Suppliers</h2></th></tr>
          <tr>
            <th>Supplier ID</th>
            <th>Supplier Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Registration Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {milkSuppliers.map(supplier => (
            <tr key={supplier.supplierId}>
              <td>{supplier.supplierId}</td>
              <td>{supplier.supplierName}</td>
              <td>{supplier.email}</td>
              <td>{supplier.address}</td>
              <td>{supplier.phoneNumber}</td>
              <td>{supplier.registrationDate}</td>
              <td>

                <button className="btn btn-warning" onClick={() => handleClick(supplier.supplierId)}>Edit</button>
                {/* <Link to={`/update/${supplier.supplierId}`} className="btn btn-primary">Edit</Link> */}
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(supplier.supplierId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewMilkSupplier;

