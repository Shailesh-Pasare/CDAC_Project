package com.app.entities;
/*
 * <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.workLocation}</td>
                <td>{employee.department}</td>
                <td>{employee.joinDate}</td>
                <td>{employee.salary}</td>
                <td>
 */

import java.time.LocalDate;
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
import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//JPA annotations
@Entity
@Table(name="Suppliers")
//Lombok annotations
@NoArgsConstructor //=def arg less ctor
@AllArgsConstructor //all args ctor
@Getter //all getters
@Setter //all setters
@ToString(exclude = "password")//toString excluding password
//how to exclude null or blank(default) values during ser ?
//@JsonInclude(Include.NON_DEFAULT)

public class Suppliers {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long supplierId;
	
	@Column(length = 45)
	@NotNull(message = "First Name is required!!!!")
     private String supplierName;
	@Column(length = 25,unique = true,nullable = false)
	@NotNull
	private String email;
	@Column(length=25,nullable = false)
	//How to tell Jackson (i.e a vendor for ser n deserial) to skip the property
	//from ser yet retain during de-ser ? 
	@JsonProperty(access = Access.WRITE_ONLY) // only setter will be accessible during conversion
	//Jackson uses : getters : during ser. n setters during de-ser.
	@NotNull
	private String password;
	
	@Column(length=20)
	@NotNull
	@Length(min = 10, max = 10)
	private String phoneNumber;
	@Column(length=50,nullable = false)
	@NotNull
	private String address;
	@Future(message = "join  date must be in future")
	@Column(nullable = false)
	@NotNull
	private LocalDate registrationDate;


	public Suppliers(@NotBlank(message = "First Name is required!!!!") String supplierName,String phoneNumber, String email, String password,String address, 
			@Future(message = "join  date must be in future") LocalDate registrationDate)
			 {
		super();
		this.supplierName = supplierName;
		this.phoneNumber=phoneNumber;
		this.email = email;
		this.password = password;
		this.address = address;
		this.registrationDate = registrationDate;

	}	
	
	//-----------------------------------------------------
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "employee_id")
//	@JsonIgnore
//	private Employee suppliersEmployee;

	@OneToMany(mappedBy = "supplierId",fetch = FetchType.EAGER, cascade = CascadeType.ALL,orphanRemoval = true)
	@JsonIgnore
	List <Bill> billList = new ArrayList<Bill>();
//--------------------------------------------------
	
	//----------------------------------------
		public void addBill(Bill bill ,Suppliers supplier) {
			billList.add(bill);
			bill.setSupplierId(supplier);
		  }
		
		public void deleteBill(Bill bill) {
			billList.remove(bill);
			bill.setSupplierId(null);
		  }
		
		//--------------------------
}
