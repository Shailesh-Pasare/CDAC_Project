package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
	@Modifying
	@Query("update Product p set p.stock = :updatedStock where p.id = :id")
	void updateStockWithId( Long id, int updatedStock);
}
