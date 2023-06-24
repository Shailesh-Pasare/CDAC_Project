package com.app.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "password")
@Entity
@Table(name = "store")

public class Store {
	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "store_name",length = 20)
	@NotBlank(message = "Name must be required")
	private  String storeName;
	
	@Column(name = "address",length = 30)
	@NotBlank(message = "Address required")
	private  String address;
	
	@NotBlank(message = "Email Should not be blank")
	@Column(name = "email",length = 30)
	private String email;
	
	@NotBlank
//	@JsonProperty(access = Access.WRITE_ONLY)//will be used during deserilization
	private String password;
	
	@NotNull
	@Column(name = "phone_no",length = 20)
	private Long phoneNumber;

	public Store(@NotBlank(message = "Name must be required") String storeName,
			@NotBlank(message = "Address required") String address,
			@NotBlank(message = "Email Should not be blank") String email, @NotNull Long phoneNumber) {
		super();
		this.storeName = storeName;
		this.address = address;
		this.email = email;
		this.phoneNumber = phoneNumber;
	}
	
//---------------------------------------------------------------------------------------------
	//@JsonIgnoreProperties(value = "employee")
//	@ManyToMany
//	@JoinTable(
//			  name = "employee_store", 
//			  joinColumns = @JoinColumn(name = "employee_id"), 
//			  inverseJoinColumns = @JoinColumn(name = "store_id"))
//	private Set<Employee> employees = new HashSet<>();
	
//	 public void addStore(Employee oneEmployee) {
//	        this.employees.add(oneEmployee);
//	        oneEmployee.stores.add(this);
//     }
//	 
//	 //add a method(convenience/helper) to remove a bi dir asso. between entities
//	 public void removeStore(Employee oneEmployee) {
//		//parent ----X---> child
//		 oneEmployee.stores.add(this);
//		//child ----X----> parent
//	     this.employees.remove(oneEmployee);
//  }


//---------------------------------------------------------------------------------------------

	// -------------------------------

		@OneToMany(mappedBy = "store",fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
		@JsonIgnore
		List<Order> orderList = new ArrayList<>();

		public void placeOrder(Order placedOrder, Store store) {
			orderList.add(placedOrder);
			placedOrder.setStore(store);
		}

		public void cancelOrder(Order cancelledOrder) {
			orderList.remove(cancelledOrder);
			cancelledOrder.setStore(null);
		}
		
		/// -------------------------------
}

