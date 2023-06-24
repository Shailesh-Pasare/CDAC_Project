package com.app.service;

import java.util.List;
import java.util.function.Supplier;

import javax.validation.Valid;

import com.app.dto.LoginRequestDto;
import com.app.entities.Suppliers;


public interface SupplierService {

	 List<Suppliers> getAllSuppliers();

	String deleteSupplier(Long supplierId);

	Suppliers addSupplier(Suppliers supplier);

	Suppliers updateSupplierDetails(Suppliers persistentSupplier);
	
	Suppliers authenticateSupplier(@Valid LoginRequestDto loginRequestDto);

	Suppliers getSupplier(Long id);

	String updateSupplier(Long id, Suppliers updatedSupplier);

}
