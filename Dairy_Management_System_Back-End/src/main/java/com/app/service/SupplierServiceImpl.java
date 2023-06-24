package com.app.service;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.LoginRequestDto;
import com.app.entities.Suppliers;
import com.app.repository.SupplierRepository;

@Service
@Transactional
public class SupplierServiceImpl implements SupplierService {

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private SupplierRepository supplierRepository;

	@Override
	public List<Suppliers> getAllSuppliers() {
		return supplierRepository.findAll();
	}

	@Override
	public Suppliers addSupplier(Suppliers supplier) {

		return supplierRepository.save(supplier);
	}

	@Override
	public String deleteSupplier(Long supplierId) {
		if (supplierRepository.existsById(supplierId)) {
			supplierRepository.deleteById(supplierId);
		} else {
			throw new ResourceNotFoundException("Supplier Not Found Exception");
		}
		return "Supplier Deleted";

	}

	@Override
	public Suppliers updateSupplierDetails(Suppliers persistentSupplier) {
		 supplierRepository.findById(persistentSupplier.getSupplierId())
				.orElseThrow(() -> new ResourceNotFoundException("Supplier Not Found"));
		 return supplierRepository.save(persistentSupplier);
	}

	@Override
	public Suppliers authenticateSupplier(@Valid LoginRequestDto loginRequestDto) {
		Optional<Suppliers> Supplier = supplierRepository.findByEmailAndPassword(loginRequestDto.getEmail(),
				loginRequestDto.getPassword());
		// => success
		return mapper.map(Supplier, Suppliers.class);
	}

	@Override
	public Suppliers getSupplier(Long id) {
		Suppliers supplier=supplierRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("No Supplier With given ID"));
		return supplier;
	}
	
	@Override
	public String updateSupplier( Long id,Suppliers updatedSupplier) {
        Suppliers supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with id: " + id));
          supplier.setSupplierName(updatedSupplier.getSupplierName());
        supplier.setEmail(updatedSupplier.getEmail());
        supplier.setPassword(updatedSupplier.getPassword());
        supplier.setAddress(updatedSupplier.getAddress());
        supplier.setPhoneNumber(updatedSupplier.getPhoneNumber());
        supplier.setRegistrationDate(updatedSupplier.getRegistrationDate());
        
       Suppliers updated = supplierRepository.save(supplier);
        return "Updated SucessFully";    }
}
