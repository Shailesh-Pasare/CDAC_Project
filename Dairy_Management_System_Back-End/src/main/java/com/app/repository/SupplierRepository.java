package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Suppliers;

public interface SupplierRepository extends JpaRepository<Suppliers, Long> {

	Optional<Suppliers> findByEmailAndPassword(String email, String password);

	

}


