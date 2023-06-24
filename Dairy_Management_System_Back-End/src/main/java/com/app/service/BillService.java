package com.app.service;

import java.time.LocalDate;
import java.util.List;

import com.app.dto.BillDto;
import com.app.entities.Bill;

public interface BillService {
	
 List<Bill> generateBill();
 
 //Bill addBill(Bill bill);
 
 Bill addNewBill(BillDto bill);

 String deleteBill(Long id);
 
 Bill updateBill(Bill bill);
 
}
