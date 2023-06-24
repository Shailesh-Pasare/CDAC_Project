package com.app.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.LoginRequestDto;
import com.app.entities.Employee;
import com.app.repository.EmployeeRepository;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {
	
	//Dependency : Repository level I/F
	@Autowired
	private EmployeeRepository empRepo;
	
	// dependency : model mapper
	@Autowired
	private ModelMapper mapper;

	@Override
	public List<Employee> getAllEmployeeDetails() {
		return empRepo.findAll();
	}

	@Override
	public Employee addEmployeeDetails(Employee transientEmp) {
		Employee persistentEmployee = null;
		try {
			persistentEmployee = empRepo.save(transientEmp);
		}catch(RuntimeException exception) {
			throw new ResourceNotFoundException("Error while Saving Employee with id " + transientEmp.getId()+ " !");
		}
		return persistentEmployee;
	}

	
	@Override
	public String deleteEmployeeDetails(Long empId) {
		if (empRepo.existsById(empId)) { //one way of handling exception
			 empRepo.deleteById(empId);
			 return "Employee with id "+ empId+ " got deleted successfully.";
		}
		throw new ResourceNotFoundException("Invalid Employee Id : Updation Failed!!!!!!!!");
	}

	@Override
	public Employee fetchEmployeeDetails(Long empId) {
		return empRepo.findById(empId)
			   .orElseThrow(() -> new ResourceNotFoundException("Invalid Employee ID !!!!!"));
	}
	
	@Override
	public Employee updateEmployeeDetails(Employee detachedEmp) {

		// confirm if emp with id exists !
		if (empRepo.existsById(detachedEmp.getId())) {
			return empRepo.save(detachedEmp);
		}
		
		throw new ResourceNotFoundException("Invalid Employee Id : Updation Failed!!!!!!!!");  //other way of handling exception
	}
	
	@Override
	public Employee authenticateEmployee(LoginRequestDto dto) {
		// TODO Auto-generated method stub
		Optional<Employee> employee = empRepo.findByEmailAndPassword(dto.getEmail(), dto.getPassword());
		//=> success
		return mapper.map(employee, Employee.class);
	}

}
