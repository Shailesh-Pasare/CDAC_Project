package com.app.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.BillDto;
import com.app.entities.Bill;
import com.app.entities.Suppliers;
import com.app.repository.BillRepository;
import com.app.repository.SupplierRepository;

@Service
@Transactional
public class BillServiceImplementation implements BillService {

	@Autowired
	private BillRepository billRepository;

	// --------------------------------------------

	@Autowired
	private SupplierRepository supplierRepo;
	// ---------------------------------------------------

	@Override
	public List<Bill> generateBill() {

		return billRepository.findAll();
	}


	@Override
	public Bill addNewBill(BillDto billDto) {
		
		try {

			Suppliers supplier = supplierRepo.findById(billDto.getSupplierId())
					.orElseThrow(() -> new ResourceNotFoundException("Supplier not found"));
			Bill bill = new Bill();
			bill.setBillDate(billDto.getBillDate());
			bill.setCowMilkFat(billDto.getCowMilkFat());
			bill.setCowMilkQuantity(billDto.getCowMilkQuantity());
			bill.setBuffaloMilkFat(billDto.getBuffaloMilkFat());
			bill.setBuffaloMilkQuantity(billDto.getBuffaloMilkQuantity());
			bill.setTotalAmount(billDto.getTotalAmount());
			bill.setSupplierId(supplier);

			return billRepository.save(bill);

		} catch (RuntimeException eception) {
			throw new ResourceNotFoundException("Not saved ");
		}

	}

	@Override
	public String deleteBill(Long id) {
		try {
			billRepository.deleteById(id);
		} catch (RuntimeException eception) {
			throw new ResourceNotFoundException("Bill with Id = " + id + " is not present");
		}
		return "Deleted from the database";
	}

	@Override
	public Bill updateBill(Bill bill) {
		if (billRepository.existsById(bill.getBillId())) {
			return billRepository.save(bill);
		}
		throw new ResourceNotFoundException("Bill with this id not found ");
	}

}
