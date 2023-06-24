package com.app.controller;

import java.time.LocalDate;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.app.entities.MilkRate;
import com.app.service.MilkRateService;

@RestController 
@RequestMapping("/milkrates")
@CrossOrigin(origins = "http://localhost:3000")
public class MilkRateController {
	@Autowired
	private MilkRateService milkRateService; 

	public MilkRateController() {
		super();
		System.out.println("Inside Default Ctor"+getClass());
	}

	@GetMapping("/milk-rates")
	public List<MilkRate> getAllMilkRates() {
		return milkRateService.getAllMilkRates();
	}

	@PostMapping("/store-milkrate")
	public MilkRate setMilkRate(@RequestBody @Valid MilkRate milkrate) {
		System.out.println("In setMilkRate");
		return milkRateService.setMilkRate(milkrate);
	}

	@GetMapping("/between-dates")
	public List<MilkRate> getMilkRatesBetweenDates(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate){
		return milkRateService.getMilkRatesBetweenDates(startDate, endDate);
	}

	@PutMapping("/update-milk-rate")
	public MilkRate updateMilkRate( @RequestBody @Valid MilkRate milkRate) {
		System.out.println("In Upadate Rate At date"+ milkRate.getId()+"  ");
		return milkRateService.updateMilkRate(milkRate);
	}
   
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteMilkRate(@PathVariable Long id) {
	    milkRateService.deleteMilkRate(id);
	    return ResponseEntity.ok().build();
	}
}

