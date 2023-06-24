import { useEffect, useState } from "react"
import ProductService from "./ProductService";
import { Link } from 'react-router-dom';
const ProductList = (props) => {
    let [prodarr, setprodarr] = useState([]);
    const fetchData = () => {
        ProductService.getAllProducts()
            .then((result) => {
                console.log(result.data);
                setprodarr(result.data);
            })
            .catch((err) => { console.log("error occured", err); });
    }

    useEffect(() => {
        console.log("in productList initialize useEffect")
        fetchData();
    }, []);

    const deleteData = (id) => {
        console.log(id + "dhnm");
        let id1 = Number(id);
        ProductService.deleteProduct(id1)
            .then((result) => {
                console.log(result);
                fetchData()
            })
            .catch((err) => {
                console.log("error occured", err);
            })

    }
    // const handleEdit = ()=>{window.location.href = "/view/${x.id}"}
    //{id:"",productName:"",price:"",manufactureDate:"",expiryDate:"",stock:""}
    let renderList = prodarr.map(x => (<tr key={x.id}><td>{x.id}</td><td>{x.productName}</td><td>{x.price}</td><td>{x.manufactureDate}</td><td>{x.expiryDate}</td><td>{x.stock}</td>
        <td>

            <button type="button" className="btn btn-danger" name="btn" id="btn" onClick={() => { return window.confirm("Are you sure ?") ? deleteData((x.id)) : "" }}>delete</button>&nbsp;&nbsp;
            <Link to={{ pathname: `/add/${x.id}`, state: { product: x } }}>
                <button type="button" className="btn btn-warning" name="btn" id="btn1">Edit</button>
            </Link>&nbsp;&nbsp;
            {/* <Link to={{pathname:`/view/${x.id}`,state:{product:x}}}>
         <button type="button" className="btn btn-primary"  name="btn" id="btn">view</button>
    </Link> */}
            {console.log(x)}
        </td></tr>))
    return (
        <div>
            <Link to="/add/_add">
                <button type="button" className="btn btn-success" name="btn" id="btn">Add Product</button>
            </Link>
            <table className="table table-striped" bgcolor="#ccc">
                <thead>
                    <tr>
                        <th scope="col">Product Id</th>
                        <th scope="col">Product Name</th>
                        <th scope="col"> Price</th>
                        <th scope="col"> Manufacture Date</th>
                        <th scope="col"> Expiry Date</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {renderList}
                    <td>
                    <button className="backbutton" onClick={()=>{window.location.href='/employeehome'}}>Back</button>
                    </td>
                </tbody>
            </table>
        </div>
    )

}
export default ProductList;