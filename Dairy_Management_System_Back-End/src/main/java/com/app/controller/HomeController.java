package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.LoginRequestDto;
import com.app.dto.LoginResponse;
import com.app.entities.Employee;
import com.app.entities.Role;
import com.app.entities.Store;
import com.app.entities.Suppliers;
import com.app.service.EmployeeService;
import com.app.service.StoreService;
import com.app.service.SupplierService;

@RestController
@RequestMapping("/")
public class HomeController {

	@Autowired
	private EmployeeService employeeService;

	@Autowired
	private SupplierService supplierService;

	@Autowired
	private StoreService storeService;

	@PostMapping("/login")
	public LoginResponse<?> logIn(@RequestBody @Valid LoginRequestDto loginRequestDto) {

		switch (loginRequestDto.getRole().toString()) {

			case "ADMIN": {
				Employee admin = employeeService.authenticateEmployee(loginRequestDto);
				if (admin.getEmployeeRole().equals(Role.ADMIN)) {
					return new LoginResponse<>(HttpStatus.OK, "admin found ", admin, admin.getEmployeeRole());
				}
				return new LoginResponse<>(HttpStatus.NOT_FOUND, "admin not found ");
			}
					
			case "EMPLOYEE": {
				Employee employee = employeeService.authenticateEmployee(loginRequestDto);
				if (employee.getEmployeeRole().equals(Role.EMPLOYEE)) {
					return new LoginResponse<>(HttpStatus.OK, "user found ", employee, employee.getEmployeeRole());
				}
	
				return new LoginResponse<>(HttpStatus.NOT_FOUND, "employee not found ");
			}				
	
			case "STORE": {
				Store store = storeService.authenticateStore(loginRequestDto);
				if (store != null) {
					return new LoginResponse<>(HttpStatus.OK, "Store found ", store, Role.STORE);
				}
				return new LoginResponse<>(HttpStatus.NOT_FOUND, "Store not found ");
			}
	
			case "SUPPLIER": {
				Suppliers supplier = supplierService.authenticateSupplier(loginRequestDto);
				if (supplier != null) {
					return new LoginResponse<>(HttpStatus.OK, "Supplier found ", supplier ,Role.SUPPLIER);
				}
				return new LoginResponse<>(HttpStatus.NOT_FOUND, "Supplier not found " );
			}
			
			default:{
				return null;
			}
		}
	}
}
