package com.app.service;

import java.util.List;

import com.app.entities.Product;

public interface ProductService {
	
	List<Product> getAllProducts();

	Product addProduct(Product product);

	String deleteProduct(Long productId);

	Product updateProduct(Product product);

	Product getProductById(Long productId);

	void updateStockWithId(Long id, int newStock);
	
	//public List<Product> getAllProducts();
}
