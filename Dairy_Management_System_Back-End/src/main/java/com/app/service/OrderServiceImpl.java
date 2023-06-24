package com.app.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.entities.Order;
import com.app.entities.Store;
import com.app.repository.OrderRepository;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

	@Autowired 
	private OrderRepository orderRepo;

	@Override
	public Order placeOrder(Order order,Store store) {
		Order persistentOrder =  orderRepo.save(order);
		store.placeOrder( persistentOrder,store);
		return persistentOrder;
	}

	@Override
	public Order getOrderById(Long id) {
		return orderRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Order not found with id " + id));
	}
	@Override
	public Order updateOrder(Order order) {
		if (!orderRepo.existsById(order.getId())) {
			throw new ResourceNotFoundException("Order not found with id ");
		}
		return orderRepo.save(order); // Save the updated order and return it
	}
	@Override
	public void deleteOrderById(Long id) {
		if (!orderRepo.existsById(id)) {
			throw new ResourceNotFoundException("Order not found with id " + id);
		}
		orderRepo.deleteById(id); 
	}

	@Override
	public List<Order> getAllOrders() {
		return orderRepo.findAll();
	}

	@Override
	public List<Order> getPlacedOrder(Long id, LocalDate orderDate) {
		return orderRepo.findByIdAndDate(id, orderDate);
	}

	
}
