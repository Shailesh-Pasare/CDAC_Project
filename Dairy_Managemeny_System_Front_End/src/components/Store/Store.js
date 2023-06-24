import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../css/AddStore.css";

const base_url = "http://localhost:7071/stores";
const StoreComponent = () => {
  const [stores, setStores] = useState([]);
  const [editingStore, setEditingStore] = useState(null);
  const [showAddStore, setShowAddStore] = useState(false);
  const [storeData, setStoreData] = useState({
    id: 0,
    storeName: '',
    address: '',
    email: '',
    phoneNumber: '',
    password: ''
  });

  // Fetch stores data from server
  useEffect(() => {
    axios.get(`${base_url}/get-stores`)
      .then(response => {
        setStores(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Function to handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStoreData({ ...storeData, [name]: value });
  };

  // Function to handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingStore) {
      // Update store
      axios.put(`${base_url}/update-store`, storeData)
        .then(response => {
          setEditingStore(null);
          setStoreData({
            id: 0,
            storeName: '',
            address: '',
            email: '',
            phoneNumber: '',
            password: ''
          });
          setShowAddStore(false);
          setStores(stores.map(store => store.id === response.data.id ? response.data : store));
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      // Add new store
      axios.post(`${base_url}/save-store`, storeData)
        .then(response => {
          setStoreData({
            storeName: '',
            address: '',
            email: '',
            phoneNumber: '',
            password: ''
          });
          setShowAddStore(false);
          setStores([...stores, response.data]);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  // Function to handle store edit
  const handleEdit = (store) => {
    setEditingStore(store);
    setStoreData({
      id: store.id,
      storeName: store.storeName,
      address: store.address,
      email: store.email,
      phoneNumber: store.phoneNumber,
      password: store.password
    });
    setShowAddStore(true);
  };

  // Function to handle store deletion
  const handleDelete = (storeId) => {

    axios.delete(`${base_url}/delete-store/${storeId}`)
      .then(() => {
        setStores(stores.filter(store => store.id !== storeId));
      })
      .catch(error => {
        console.log(error);
      });
  };



  return (
    <div className="container">
      <table bgcolor='#CCC'>
        <tr><td><h3>Store Management System</h3></td></tr>
      </table>
      {showAddStore ?
        <form  >
          <table>
            <tr>
              <td className="mb-3">
                <label htmlFor="storename" className="form-label">Store Name</label>
              </td><td>
                <input type="text" className="form-control" id="storeName" name="storeName"
                  value={storeData.storeName} onChange={handleInputChange} required />
              </td>
            </tr>
            <tr>
              <td className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
              </td><td>
                <input type="text" className="form-control" id="address" name="address"
                  value={storeData.address} onChange={handleInputChange} required />
              </td>
            </tr>
            <tr>
              <td className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
              </td><td>
                <input type="email" className="form-control" id="email" name="email"
                  value={storeData.email} onChange={handleInputChange} required />
              </td>
            </tr>
            <tr>
              <td className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              </td><td>
                <input type="text" className="form-control" id="phoneNumber" name="phoneNumber"
                  value={storeData.phoneNumber} onChange={handleInputChange} required />
              </td>
            </tr>
            <tr>
              <td className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
              </td><td><input type="password" className="form-control" id="password" name="password"
                value={storeData.password} onChange={handleInputChange} required />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button type="button" onClick={handleSubmit} className="btn btn-success">{editingStore ? 'Update Store' : 'Add Store'}</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => {
                  setShowAddStore(false);
                  setEditingStore(null);
                  setStoreData({
                    storeName: '',
                    address: '',
                    email: '',
                    phoneNumber: '',
                    password: ''
                  });
                }}>Cancel</button>
              </td>
            </tr>
          </table>
        </form>
        :
        <button className="btn btn-success mb-3" onClick={() => setShowAddStore(true)}>Add Store</button>
      }
      <table bgcolor='#CCC' className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Store Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stores.map(store => (
            <tr key={store.id}>
              <td>{store.id}</td>
              <td>{store.storeName}</td>
              <td>{store.address}</td>
              <td>{store.email}</td>
              <td>{store.phoneNumber}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(store)}>Edit</button>&nbsp;&nbsp;
                <button className="btn btn-danger" onClick={() => { return window.confirm("Are you sure ?") ? handleDelete(store.id) : "" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreComponent;

