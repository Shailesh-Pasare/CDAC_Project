package com.app.service;

import java.time.LocalDate;
import java.util.List;

import com.app.entities.Order;
import com.app.entities.Store;

public interface OrderService {
	Order placeOrder(Order order,Store store);
	Order getOrderById(Long id);
	void deleteOrderById(Long id);
	Order updateOrder(Order order);
	List<Order> getAllOrders();
	List<Order> getPlacedOrder(Long id, LocalDate orderDate );
}
