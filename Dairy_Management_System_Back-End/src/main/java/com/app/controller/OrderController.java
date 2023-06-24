package com.app.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.entities.Order;
import com.app.entities.Store;
import com.app.repository.StoreRepository;
import com.app.service.OrderService;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")

public class OrderController {
    
	@Autowired
    private  OrderService orderService;
	
	@Autowired
	private StoreRepository storeRepository;
	
    public OrderController() {
        System.out.println("In Order Default ctor"+getClass());
    }

    @PostMapping("/save-order/{totalAmount}/{id}")
    public Order placeOrder( @PathVariable Double totalAmount, @PathVariable Long id) {
    Store store = storeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Store with Id = "+id+" does not exist"));
        return orderService.placeOrder(new Order(LocalDate.now(), totalAmount),store);
       // Save the order and return it
    }
    
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id); // To the service for retrieve the order 
    }
    
    @DeleteMapping("/{id}")
    public void cancelOrderById(@PathVariable Long id) {
        orderService.deleteOrderById(id);
    }
    
    @GetMapping("/get-orders")
    public List<Order> getAllOrders(){
    	return orderService.getAllOrders();
    }
    
    @GetMapping("/get-placed-order/{id}")
    public List<Order> getPlacedOrder(@PathVariable Long id) {
    	System.out.println(id);
    	LocalDate orderDate = LocalDate.now();
    	List<Order> l = orderService.getPlacedOrder(id, orderDate);
    	l.forEach(System.out::println);
    	return l;
    }
}
