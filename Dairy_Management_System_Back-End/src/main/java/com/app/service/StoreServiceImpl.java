package com.app.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.LoginRequestDto;
import com.app.entities.Store;
import com.app.repository.StoreRepository;


@Service
@Transactional
public class StoreServiceImpl implements StoreService {
	// dependency :dao layer i/f
	@Autowired // => By-Type Feild Level D.I
	private StoreRepository storeRepo;
	
	@Autowired
	private ModelMapper mapper;

	@Override
	public List<Store> getAllStore() {
		return storeRepo.findAll();
	}

	@Override
	public Store saveStoreDetails(Store store) {
		return storeRepo.save(store);// Transient
	}

	@Override
	public void deleteById(Long id) {
		if (storeRepo.existsById(id)) {
			storeRepo.deleteById(id);
		}
		else {
			throw new ResourceNotFoundException("Store not Found");
		}
	}

	@Override
	public Store updateStore(Store persistentStore) {
		storeRepo.findById(persistentStore.getId()).orElseThrow(()-> new ResourceNotFoundException("Invalid Store Id"));
		return storeRepo.save(persistentStore);
	}

	@Override
	public Store getStoreById(Long storeId) {
		return storeRepo.findById(storeId).orElseThrow(()->new ResourceNotFoundException("Store Not Exist with id = "+storeId));
	}
	

//	@Override
//	public Store authenticateStore(LoginRequestDto dto) {
//		// TODO Auto-generated method stub
//		Optional<Store> store = storeRepo.findByEmailAndPassword(dto.getEmail(), dto.getPassword());
//		//=> success
//		return mapper.map(store, Store.class);
//	}
//
//	@Override
//	public Store findByEmail(String email) {
//		return storeRepo.findByEmail(email);
//	}
	
	@Override
	public Store authenticateStore(LoginRequestDto dto) {
		// TODO Auto-generated method stub
		Optional<Store> store = storeRepo.findByEmailAndPassword(dto.getEmail(), dto.getPassword());
		//=> success
		return mapper.map(store, Store.class);
	}

	@Override
	public Store findByEmail(String email) {
		return storeRepo.findByEmail(email);
	}
	
}
