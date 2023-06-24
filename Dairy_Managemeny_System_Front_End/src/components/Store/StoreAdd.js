import "../../css/AddStore.css";
const StoreAdd = () => {
  return (
    <div style={back}>
      <h1 className="text-center mb-4">Store Management</h1>
      <form style="background-color:#CCC" onSubmit={handleSubmit}>
        <table>
          <tr>
            <td className="mb-3">
              <label htmlFor="id" className="form-label">ID</label>
            </td>
            <td>
              <input type="number" className="form-control" id="id" name="id" value={newStore.id} onChange={handleIdChange} required />
            </td>
          </tr>
          <tr>
            <td className="mb-3">
              <label htmlFor="storeName" className="form-label">Store Name</label>
            </td><td><input type="text" className="form-control" id="storeName" name="storeName" value={newStore.storeName} onChange={handleStoreNameChange} required />
            </td>
          </tr>
        </table>
        <button type="submit" className="btn btn-primary me-3">Create</button>
        <button type="reset" className="btn btn-secondary" onClick={() => setNewStore({
          id: 0,
          storeName: '',
          address: '',
          email: '',
          phoneNumber: '',
          password: '',
        })}>Reset</button>
      </form>
    </div>
  )
}