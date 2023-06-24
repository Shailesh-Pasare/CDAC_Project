import React, { useState, useEffect } from 'react';
import axios from 'axios';
const base_url="http://localhost:7071/milkrates";
const MilkRateComponent = () => {
  const [milkrates, setMilkrates] = useState([]);
  const [editingMilkrates, setEditingMilkrates] = useState(null);
  const [showAddMilkrate, setShowAddMilkrate] = useState(false);
  const [milkratesData, setMilkratesData] = useState({
    id: 0,
    dateOfMilkRate: '',
    cowFat: '',
    buffaloFat: '',
    cowMilkRate: '',
    buffaloMilkRate: ''
  });

  // Fetch stores data from server
  useEffect(() => {
    axios.get(`${base_url}/milk-rates`)
      .then(response => {
        setMilkrates(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Function to handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMilkratesData({ ...milkratesData, [name]: value });
  };

  // Function to handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingMilkrates) {
      // Update store
      axios.put(`${base_url}/update-milk-rate`, milkratesData)
        .then(response => {
          setEditingMilkrates(null);
          setMilkratesData({
            id: 0,
            dateOfMilkRate: '',
            cowFat: '',
            buffaloFat: '',
            cowMilkRate: '',
            buffaloMilkRate: ''
          });
          setShowAddMilkrate(false);
          setMilkrates(milkrates.map(milkrates => milkrates.id === response.data.id ? response.data : milkrates));
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      // Add new store
      axios.post(`${base_url}/store-milkrate`, milkratesData)
        .then(response => {
          setMilkratesData({
            id: 0,
            dateOfMilkRate: '',
            cowFat: '',
            buffaloFat: '',
            cowMilkRate: '',
            buffaloMilkRate: ''
          });
          setShowAddMilkrate(false);
          setMilkrates([...milkrates, response.data]);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  // Function to handle store edit
  const handleEdit = (milkrate) => {
    setEditingMilkrates(milkrate);
    setMilkratesData({
            id: milkrate.id,
            dateOfMilkRate: milkrate.dateOfMilkRate,
            cowFat: milkrate.cowFat,
            buffaloFat: milkrate.buffaloFat,
            cowMilkRate: milkrate.cowMilkRate,
            buffaloMilkRate: milkrate.buffaloMilkRate
    });
    setShowAddMilkrate(true);
  };

  // Function to handle store deletion
  const handleDelete = (id) => {
    axios.delete(`${base_url}/delete/${id}`)
      .then(() => {
        setMilkrates(milkrates.filter(milkrate => (milkrate.id !== id)));
      })
      .catch(error => {
        console.log(error);
      });
  };


  return (
    <div className="milk-rate-background">
      <h1>MilkRate Management System</h1>
      {showAddMilkrate ?
        <form onSubmit={handleSubmit} >
          <div className="mb-3">
            <label htmlFor="dateOfMilkRate" className="form-label">Date Of MilkRate</label>
            <input type="date" className="form-control" id="dateOfMilkRate" name="dateOfMilkRate"
              value={milkratesData.dateOfMilkRate} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="cowFat" className="form-label">Cow Fat</label>
            <input type="number" className="form-control" id="cowFat" name="cowFat"
              value={milkratesData.cowFat} onChange={handleInputChange} max={10} required />
          </div>
          <div className="mb-3">
            <label htmlFor="buffaloFat" className="form-label">Buffalo Fat</label>
            <input type="number" className="form-control" id="buffaloFat" name="buffaloFat"
              value={milkratesData.buffaloFat} onChange={handleInputChange} max={10} required />
          </div>
          <div className="mb-3">
            <label htmlFor="cowMilkRate" className="form-label">Cow Milkrate</label>
            <input type="number" className="form-control" id="cowMilkRate" name="cowMilkRate"
              value={milkratesData.cowMilkRate} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="buffaloMilkRate" className="form-label">Buffalo Milkrate</label>
            <input type="number" className="form-control" id="buffaloMilkRate" name="buffaloMilkRate"
              value={milkratesData.buffaloMilkRate} onChange={handleInputChange} required />
          </div>
          <button type="submit" className="btn btn-primary">{editingMilkrates ? 'Update MilkRate' : 'Add MilkRate'}</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={() => {
            setShowAddMilkrate(false);
            setEditingMilkrates(null);
            setMilkratesData({
                id: 0,
                dateOfMilkRate: '',
                cowFat: '',
                buffaloFat: '',
                cowMilkRate: '',
                buffaloMilkRate: ''
            });
          }}>Cancel</button>
        </form>
        :
        <button className="btn btn-success mb-3" onClick={() => setShowAddMilkrate(true)}>Add MilkRate</button>
      }
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Date Of Milkrate</th>
            <th>Cow Fat</th>
            <th>Buffalo Fat</th>
            <th>Cow Milkrate</th>
            <th>Buffalo Milkrate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {milkrates.map(milkrate => (
            <tr key={milkrate.id}>
              <td>{milkrate.id}</td>
              <td>{milkrate.dateOfMilkRate}</td>
              <td>{milkrate.cowFat}</td>
              <td>{milkrate.buffaloFat}</td>
              <td>{milkrate.cowMilkRate}</td>
              <td>{milkrate.buffaloMilkRate}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(milkrate)}>Edit</button>&nbsp;&nbsp;
                <button className="btn btn-danger" onClick={() => handleDelete(milkrate.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MilkRateComponent;

