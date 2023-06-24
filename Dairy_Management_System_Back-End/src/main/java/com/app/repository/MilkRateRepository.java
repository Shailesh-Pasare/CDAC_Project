package com.app.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.entities.MilkRate;
@Repository
public interface MilkRateRepository extends JpaRepository<MilkRate, Long> {
	@Query(
			"SELECT m FROM MilkRate m WHERE m.dateOfMilkRate BETWEEN :startDate AND :endDate")
    	  List<MilkRate> findMilkRatesBetweenDates(LocalDate startDate, LocalDate endDate);
}
