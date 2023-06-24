package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Product;
import com.app.service.ProductService;

@CrossOrigin(origins = "http://localhost:3000")//To enable CORS header 
@RestController
@RequestMapping("/products")
public class ProductController {

	@Autowired
	private ProductService productService;

	public ProductController() {
		System.out.println("In ProductController ctor");
	}

	@GetMapping("/product-list")
	public List<Product> getAllProducts() {
		return productService.getAllProducts();
	}

	@PostMapping("/add-product")
	public Product addProduct(@RequestBody @Valid Product transientProduct) {
		System.out.println("controller!" + transientProduct.getProductName());
		return productService.addProduct(transientProduct);
	}

	@DeleteMapping("/{productId}")
	public String deleteProduct(@PathVariable Long productId) {
		return productService.deleteProduct(productId);
	}

	@GetMapping("/{productId}")
	public Product getProductById(@PathVariable Long productId) {
		return productService.getProductById(productId);
	}

	@PutMapping("/update-product")
	public Product updateProduct(@RequestBody @Valid Product product) {
		return productService.updateProduct(product);
	}
	
		
	//-----------------------------------------------------------------------------------------
	@PutMapping("/update-products/{id}/{newStock}")
	public void updateProductWithId(@PathVariable Long id, @PathVariable   Integer newStock) {
		System.out.println("asfd "+ id+" sdf "+ newStock); 
		productService.updateStockWithId(id, newStock);
	}
	
//	@GetMapping("/get-products")
//	public List<Product> getAllProducts() {
//		return productService.getAllProducts();
//	}

}
