package com.app.controller;

import java.time.LocalDate;
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

import com.app.dto.BillDto;
import com.app.entities.Bill;
import com.app.entities.Suppliers;
import com.app.service.BillService;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
@RequestMapping("/bills")

@Validated // specific class supposed to be validated
public class BillController {

	public BillController() {
		System.out.println("inDef constructor of " + getClass());
	}

	@Autowired
	private BillService billService;

	@GetMapping("/all-bills")
	public List<Bill> generateBill() {
		return billService.generateBill();
	}
	
	 

	@PostMapping("/generate-bill")
	public Bill addBill(@RequestBody @Valid BillDto bill) {
		System.out.println(bill);
		return billService.addNewBill(bill);
	}

	@DeleteMapping("/{billId}")
	public String deleteBill(@PathVariable Long billId) {
		return "deleted bill " + billService.deleteBill(billId);
	}

	@PutMapping
	public String updateBill(@RequestBody Bill detachedBill) {
		return "deleted " + billService.updateBill(detachedBill);
	}
}