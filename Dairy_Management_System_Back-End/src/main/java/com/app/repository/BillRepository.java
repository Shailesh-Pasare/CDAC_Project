package com.app.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.dto.BillDto;
import com.app.entities.Bill;

public interface BillRepository extends JpaRepository<Bill, Long> {

}
