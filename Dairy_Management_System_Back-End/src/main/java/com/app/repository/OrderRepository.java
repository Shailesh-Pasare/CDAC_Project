package com.app.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	

	@Query("SELECT o FROM Order o WHERE o.store.id = :id AND o.orderDate = :orderDate")
	List<Order> findByIdAndDate(@Param("id") Long id, @Param("orderDate") LocalDate orderDate);

}
