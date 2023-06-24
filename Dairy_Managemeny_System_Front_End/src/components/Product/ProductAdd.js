import ProductService from "./ProductService";
import { useState, useEffect } from "react";
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
const ProductAdd = (props) => {
  let params = useParams();
  let history = useHistory();
  let state = useLocation().state;
  let [pdata, setpdata] = useState({ id: "", productName: "", price: "", manufactureDate: "", expiryDate: "", stock: "" });
  useEffect(() => {
    if (params.id !== "_add") {
      setpdata({ ...state.product })
    }
  }, [])
  const handleChange = (event) => {
    let { name, value } = event.target;
    console.log(name, value);
    setpdata({ ...pdata, [name]: value });
  }

  const addData = () => {
    let pdata1 = {
      id: parseInt(pdata.id), productName: pdata.productName, price: parseFloat(pdata.price),
      manufactureDate: (pdata.manufactureDate), expiryDate: (pdata.expiryDate), stock: parseInt(pdata.stock)
    }
    if (pdata1.productName == "" || pdata1.price == "" || pdata1.manufactureDate == "" || pdata1.expiryDate == "" || pdata1.stock == null) {
      alert("All Fields are Mandatory!!!!");
      return;
    }
    ProductService.addProduct(pdata1)
      .then((result) => {
        console.log(result);
        history.push("/list");
        //pdata1.productName = "";//pdata1.price == "" ||pdata1.manufactureDate == "" ||pdata1.expiryDate == "" || pdata1.stock == null
      })
      .catch();
  }
  const updateData = () => {
    let pdata1 = {
      id: parseInt(pdata.id), productName: pdata.productName, price: parseFloat(pdata.price),
      manufactureDate: (pdata.manufactureDate), expiryDate: (pdata.expiryDate), stock: parseInt(pdata.stock)
    }
    ProductService.updateProduct(pdata1)
      .then((result) => {
        console.log(result);
        history.push("/list");
      })
      .catch();
  }
  return (
    <div>

      <form >
        <table >

          <tr>
            <td className="form-group">
              <label >Product Name</label>
            </td>
            <td>
              <input type="text" className="form-control" name="productName" id="pname"
                value={pdata.productName}
                onChange={handleChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td className="form-group">
              <label>Product Price</label>
            </td>
            <td>
              <input type="number" className="form-control" name="price" id="price"
                value={pdata.price}
                onChange={handleChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td className="form-group">
              <label >Product manufactureDate</label>
            </td>
            <td>
              <input type="date" className="form-control" name="manufactureDate" id="manufactureDate"
                value={pdata.manufactureDate}
                onChange={handleChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td className="form-group">
              <label >Product expiryDate</label>
            </td>
            <td>
              <input type="date" className="form-control" name="expiryDate" id="expiryDate"
                value={pdata.expiryDate}
                onChange={handleChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td className="form-group">
              <label >Product stock</label>
            </td>
            <td>
              <input type="number" className="form-control" name="stock" id="stock"
                value={pdata.stock}
                onChange={handleChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              {params.id === "_add" ? <button type="button" className="btn btn-primary" onClick={addData}>Add Product</button> :
                <button type="button" className="btn btn-primary" onClick={updateData}>update Product</button>}
                {/* ---------------------------------------------------- */}
              <button onClick={()=>{window.location.href='/employeehome'}}>Back</button>
            </td>
          </tr>
        </table>

      </form>
    </div>

  )

}
export default ProductAdd;
