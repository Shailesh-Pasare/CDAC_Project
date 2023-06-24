import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
const ProductDetails = (props) => {
  let state = useLocation().state;

  //  let renderList=state.product.map(x=>(<tr key={x.id}><td>{x.id}</td><td>{x.productName}</td><td>{x.price}</td><td>{x.manufactureDate}</td><td>{x.expiryDate}</td><td>{x.stock}</td></tr>))

  return (
    <div>

      <table bgcolor='#CCC'>
        <tr><th colSpan={2}><h5 >Product details</h5></th></tr>
        <tr>
          <td>Product Id</td>
          <td><h6 >{state.product.id}</h6></td>
        </tr>
        <tr>
          <td>Product Name</td>
          <td>{state.product.productName}</td>
        </tr>
        <tr>
          <td>Manufacture Date</td>
          <td><h6 >{state.product.manufactureDate}</h6></td>
        </tr>
        <tr>
          <td>Expiry Date</td>
          <td><h6 >{state.product.expiryDate}</h6></td>
        </tr>
        <tr>
          <td>Stock</td>
          <td><h6 >{state.product.stock}</h6></td>
        </tr>
        <tr>
          <td>Price</td>
          <td> {state.product.price}</td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Link to={{ pathname: `/list` }}>
              <button type="button" className="btn btn-primary" name="btn" id="btn">BACK</button>
            </Link>
          </td>
        </tr>
      </table>

    </div>

  )

}
export default ProductDetails;