package com.app.service;

import java.time.LocalDate;
import java.util.List;
import com.app.entities.MilkRate;

import net.bytebuddy.dynamic.DynamicType.Builder.FieldDefinition.Optional;

public interface MilkRateService {
	// Get MilkRates
 	List<MilkRate> getAllMilkRates();
	// Add New Store
	MilkRate setMilkRate(MilkRate milkrate);
	// get milk Rates within Specified dates
    List<MilkRate> getMilkRatesBetweenDates(LocalDate startDate, LocalDate endDate);
    //Update Milk Rate
    public MilkRate updateMilkRate(MilkRate milkRate);
     //Delete Milk Rate
    void deleteMilkRate(Long id);

}
