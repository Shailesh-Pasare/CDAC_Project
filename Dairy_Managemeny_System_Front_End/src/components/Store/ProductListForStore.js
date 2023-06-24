import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../css/ProductListForStore.css";


const ProductListForStore = () => {
  const [products, setProducts] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const params = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:7071/products/product-list")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    let total = 0;
    products.forEach((product) => {
      const quantity = selectedQuantities[product.id] || 0;
      total += quantity * product.price;
    });
    setTotalAmount(total);
  }, [products, selectedQuantities]);

  const handleQuantityChange = (event, productId) => {
    const value = parseInt(event.target.value);
    const product = products.find((product) => product.id === productId);
    if (value <= product.stock) {
      setSelectedQuantities({
        ...selectedQuantities,
        [productId]: value,
      });
    }
  };

  const handlePlaceOrder = () => {
    if (totalAmount === 0) {
      window.alert("please add something!");
      return;
    }
    axios
      .get("http://localhost:7071/products/product-list")
      .then((response) => {
        const productsFromDB = response.data;
        const selectedProducts = productsFromDB.filter(
          (product) => selectedQuantities[product.id] > 0
        );
        const canPlaceOrder = selectedProducts.every(
          (product) => selectedQuantities[product.id] <= product.stock
        );

        if (canPlaceOrder) {

          selectedProducts.forEach((product) => {
            const originalStock = product.originalStock || product.stock;
            const newStock = originalStock - selectedQuantities[product.id];

            axios
              .put(
                `http://localhost:7071/products/update-products/${product.id}/${newStock}`
              )
              .then(() => {
                console.log(
                  `Successfully updated stock for product ${product.id}`
                );
              })
              .catch((error) => {
                console.error(
                  `Failed to update stock for product ${product.id}`,
                  error
                );
              });
          });

          // Redirect to success page
          window.location.href = `/order-success/${params.id}`;


          const orderDate = new Date().toLocaleDateString();
          console.log(orderDate);

          axios
            .post(`http://localhost:7071/orders/save-order/${totalAmount}/${params.id}`)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(" error in adding order details ", error);
            });
        } else {
          // Show error message
          alert("Some selected quantities exceed the available stock.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancelOrder = () => {
    setProducts(
      products.map((p) => {
        if (typeof p.originalStock !== "undefined") {
          return {
            ...p,
            stock: p.originalStock,
          };
        }
        return p;
      })
    );
    setSelectedQuantities({});
    window.alert("order cancelled!");
    console.log("Order cancelled!");
  };

  return (
    <div>
      <h2>Product List</h2>
      <table bgcolor="#CCC">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Manufacture Date</th>
            <th>Expiry Date</th>
            <th>Stock</th>
            <th>Selected Quantity</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.productName}</td>
              <td>{product.price}</td>
              <td>{product.manufactureDate}</td>

              <td>{product.expiryDate}</td>
              <td>{product.stock}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  max={product.stock}
                  value={selectedQuantities[product.id] || ""}
                  onChange={(event) => handleQuantityChange(event, product.id)}
                />
              </td>
              <td>{(selectedQuantities[product.id] || 0) * product.price}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6"></td>
            <td>Total:</td>
            <td>{totalAmount}</td>
          </tr>
        </tfoot>
      </table>
      <div>
        <button onClick={handlePlaceOrder}>Place Order</button>
        <button className="cancelbutton" bgcolor={'red'} onClick={handleCancelOrder}>Cancel Order</button>
      </div>
    </div>
  );
};
export default ProductListForStore;
