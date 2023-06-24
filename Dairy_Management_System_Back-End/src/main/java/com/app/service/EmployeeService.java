package com.app.service;

import java.util.List;

import com.app.dto.EmployeeSpecificResp;
import com.app.dto.LoginRequestDto;
import com.app.entities.Employee;

public interface EmployeeService {
//get all emps
	List<Employee> getAllEmployeeDetails();

	Employee addEmployeeDetails(Employee transientEmp);

	String deleteEmployeeDetails(Long empId);

	Employee fetchEmployeeDetails(Long empId);

    Employee updateEmployeeDetails(Employee detachedEmp);

	Employee authenticateEmployee(LoginRequestDto dto);
//
//	List<Employee> getEmpsByDateAndDept(LocalDate joinDate1, String dept1);
//
//	List<EmployeeResponse> getEmpsBySalary(double minSal, double maxSal);
//
//	List<Employee> getEmpsByLastNameContainingKey(String key);
//
//	String applySalaryIncrement(EmpSalIncrementRequest dto);
}
