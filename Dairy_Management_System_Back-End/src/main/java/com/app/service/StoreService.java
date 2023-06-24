package com.app.service;

import java.util.List;

import javax.validation.Valid;

import com.app.dto.LoginRequestDto;
import com.app.entities.Employee;
import com.app.entities.Store;

public interface StoreService {
	// Get all stores
	List<Store> getAllStore();
	// Add New Store
	Store saveStoreDetails(Store store);
	//Delete Store
	void deleteById(Long id) ;
	Store updateStore(Store persistentStore);
	Store getStoreById(Long storeId);
	Store authenticateStore(@Valid LoginRequestDto loginRequestDto);
	Store findByEmail(String email);
}
