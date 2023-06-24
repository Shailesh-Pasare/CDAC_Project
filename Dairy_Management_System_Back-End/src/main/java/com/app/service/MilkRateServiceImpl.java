package com.app.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PutMapping;

import com.app.entities.MilkRate;
import com.app.repository.MilkRateRepository;

import net.bytebuddy.dynamic.DynamicType.Builder.FieldDefinition.Optional;


@Service
@Transactional
public class MilkRateServiceImpl implements MilkRateService {

	@Autowired 
	private MilkRateRepository milkRateRepo;
	
	public List<MilkRate> getAllMilkRates() {
        return milkRateRepo.findAll();
    }


	@Override
	public MilkRate setMilkRate(MilkRate milkRate) {
		return milkRateRepo.save(milkRate);

	}

	@Override
	public List<MilkRate> getMilkRatesBetweenDates(LocalDate startDate, LocalDate endDate) {
		return milkRateRepo.findMilkRatesBetweenDates(startDate, endDate);
	}


	@Override
	public MilkRate updateMilkRate( MilkRate milkRate) {
		return milkRateRepo.save(milkRate);
	}
	
	@Override
	 public void deleteMilkRate(Long id) {
		 milkRateRepo.deleteById(id);
	    }


}
