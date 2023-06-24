package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Suppliers;
import com.app.service.SupplierService;

@RestController
//To enable CORS header 
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/suppliers")
@Validated
public class SupplierController {

    @Autowired
    private SupplierService supplierservice;
    
	public SupplierController() {
		System.out.println("in def ctor " + getClass());
	}

  
	
//	public List<Suppliers> checkMilkSuppliedHistory() {
//	return ;
//	}
	@PostMapping("/add")
	public Suppliers saveSupplierDetails(@RequestBody @Valid Suppliers transientSupplier) {
		Suppliers persistentSupplier=supplierservice.addSupplier(transientSupplier);
		return persistentSupplier;
	}

	
	@DeleteMapping("/delete/{SupplierId}")
	public String deleteEmpDetails(@PathVariable Long SupplierId) {
	  return supplierservice.deleteSupplier(SupplierId);
	}

	
//	@PutMapping("/update/{id}")
//	public Suppliers updateEmpDetails(@RequestBody Suppliers persistentSupplier) {
//		return supplierservice.updateSupplierDetails(persistentSupplier);
//	}
//
//     
	@GetMapping("/supplierlist")
	public List<Suppliers> getAllSuppliers()
	{
		return supplierservice.getAllSuppliers();
	}
	
	@PutMapping("/update/{id}")
    public String updateSupplier(@PathVariable Long id, @RequestBody Suppliers updatedSupplier) {
       System.out.println(updatedSupplier.getSupplierName());
      return supplierservice.updateSupplier(id, updatedSupplier);
    }
	@GetMapping("/supplier/{id}")
	public Suppliers getSupplier(@PathVariable Long id) {
		
		return supplierservice.getSupplier(id);
	}
}
