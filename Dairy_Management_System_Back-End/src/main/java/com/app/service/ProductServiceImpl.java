package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.entities.Product;
import com.app.repository.ProductRepository;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepo;

	@Override
	public List<Product> getAllProducts() {
		return productRepo.findAll();
	}

	@Override
	public Product addProduct(Product product) {
		Product persistentProduct;
		try {
			persistentProduct = productRepo.save(product);
		} catch (Exception e) {
			throw new ResourceNotFoundException("Product can't be inserted");
		}
		return persistentProduct;
	}

	@Override
	public String deleteProduct(Long productId) throws ResourceNotFoundException {
		if (productRepo.existsById(productId)) {
			productRepo.deleteById(productId);
			return "Product with Id = " + productId + " is Deleted Successfully";
		}
		throw new ResourceNotFoundException("Invalid product Id");
	}

	@Override
	public Product getProductById(Long productId) {
		return productRepo.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Invalid Product Id"));
	}

	@Override
	public Product updateProduct(Product product) {
		if (productRepo.existsById(product.getId())) {
			return productRepo.save(product);
		}
		throw new ResourceNotFoundException("Product Not present With id = " + product.getId());
	}
	
	@Override
	public void updateStockWithId( Long id, int newStock) {
	    productRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid Product"));
		productRepo.updateStockWithId(id, newStock);
	}

}
