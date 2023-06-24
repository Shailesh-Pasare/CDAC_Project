import axios from 'axios';
const base_url="http://localhost:7071/products/";
class ProductService{
    getAllProducts(){
       return axios.get(base_url+"product-list");
    }
    addProduct(prod){
        return axios.post(base_url+"add-product",prod,{headers:{
            'content-type':'application/json'}});
    }
    updateProduct(prod){
        return axios.put(base_url+"update-product",prod,{headers:{
            'content-type':'application/json'}});
    }
    deleteProduct(id){
        console.log("In Delete Method");
        return axios.delete(base_url+id);
    }

}

export default new ProductService();