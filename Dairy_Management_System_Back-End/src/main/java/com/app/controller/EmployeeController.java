package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.entities.Employee;
import com.app.service.EmployeeService;

import lombok.NoArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000")//To enable CORS header 
@RequestMapping("/employees")
@Validated
@NoArgsConstructor
public class EmployeeController {

	//dependency : service layer i.f
	@Autowired
	private EmployeeService empService;


	//add REST end point to get all emps
	// http:host:port/employees/get-employees , method=GET
	@GetMapping("/get-employees")
	public List<Employee> getAllEmps() {
		return empService.getAllEmployeeDetails();
	}
	

	@PostMapping("/save-employees")
	public Employee saveEmpDetails(@RequestBody @Valid Employee transientEmp) {
		return empService.addEmployeeDetails(transientEmp);
	}

	// http:host:port/employees/delete-employees/123 , method=DELATE
	@DeleteMapping("/delete-employees/{empId}")
	public ApiResponse deleteEmpDetails(@PathVariable Long empId) {
		return new ApiResponse(empService.deleteEmployeeDetails(empId));
	}
	
	// http:host:port/employees/get-employees/123 , method=GET
	@GetMapping("/get-employee/{id}")
	public ResponseEntity<?> getEmployeeDetailsById(@PathVariable Long id)
	{
		System.out.println("get emp dtls "+id);
		try {
		return ResponseEntity.ok(empService.fetchEmployeeDetails(id));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(new ApiResponse("Invalid Employee ID!!!!!!"), 
					HttpStatus.NOT_FOUND);
		}
	}
	
	// http:host:port/employees , method=PUT
	@PutMapping("/update-employee")
	public Employee updateEmployeeDetails(@RequestBody @Valid Employee detachedEmp) {
		return empService.updateEmployeeDetails(detachedEmp);
	}
	
//----------------------------------------------------------------------------------------------
	// Add REST end point for Emp siginin
	// URL --- http://host:port/employees/signin
//	@PostMapping("/signin")
//	public ResponseEntity<?> validateEmployee(@RequestBody @Valid LoginRequestDto dto) {
//		System.out.println("in emp signin " + dto);
//		// try {
//		return ResponseEntity.ok(empService.authenticateEmp(dto));
//		} catch (RuntimeException e) {
//			System.out.println("err in emp controller " + e);
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).
//					body(new ApiResponse(e.getMessage()));
//		}
//	}

	// Add REST end point for searching emps by dept n date
	// http://host:port/employees/date/2020-1-1/dept/rnd , method =GET
//	@GetMapping("/date/{joinDate1}/dept/{dept1}")
//	public List<Employee> getAllEmpsByDateAndDept(
//			@PathVariable @DateTimeFormat(pattern = "yyyy-M-d") LocalDate joinDate1, @PathVariable String dept1) {
//		System.out.println("in get all emps by date n dept " + joinDate1 + " " + dept1);
//		return empService.getEmpsByDateAndDept(joinDate1, dept1);
//	}
//
//	// Add REST end point for searching emps by sal range , method = GET
//	// pass payload as req params
//	@GetMapping("/salary")
//	public List<EmployeeResponse> getAllEmpsBySalaryRange(@RequestParam double minSal, double maxSal) {
//		System.out.println("in get emps by sal " + minSal + " " + maxSal);
//		return empService.getEmpsBySalary(minSal, maxSal);
//	}
//
//	// Add REST end point to :get all emps -- added in ResponseEntity (=resp packet)
//	// having last name containing some keyword
//	@GetMapping("/last_name/{key}")
//	public ResponseEntity<?> getEmpsByLastNameKey(@PathVariable String key) {
//		System.out.println("in get emps by last name containing key " + key);
//		// API of ResponseEntity : status() body()
//		List<Employee> list = empService.getEmpsByLastNameContainingKey(key);
//		if (list.isEmpty())
//			// simple ret RespEnt : HttpStatus
//			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
//		else
//			// sts : OK , list
//			return ResponseEntity.ok(list);
//	}
//
//	// Add REST end point to : apply salry increment(UPDATE) to those emps from
//	// specific department , joined before
//	// specific date
//	@PutMapping("/sal_incr")
//	public ApiResponse applySalaryIncrement(@RequestBody EmpSalIncrementRequest dto) {
//		System.out.println("in apply sal incr " + dto);
//		return new ApiResponse(empService.applySalaryIncrement(dto));
//	}

}
