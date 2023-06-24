package com.app.entities;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
//exclude null or blank(default)
public class Bill {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE , generator = "billIdSequence")
	@SequenceGenerator(allocationSize = 1, initialValue = 9000, name = "billIdSequence")
	private Long billId;
	
	@Column(length = 20)
	@NotNull
	private LocalDate billDate;
	
	@Column(length = 5)
	private Double buffaloMilkQuantity;
	
	@Column(length = 5, precision = 2)
	private Double buffaloMilkFat;
	
	@Column(length = 4)
	private Double cowMilkQuantity;
	
	@Column(precision = 2)
	private Double cowMilkFat;
	
	@Column(precision = 2)
	private Double totalAmount;
	
	
	//-------------------------------------------
		//(fetch = FetchType.LAZY)
		@ManyToOne
		@JoinColumn(name = "supplier_id")
//		@JsonIgnore
//		@JsonProperty("supplier_id")
		private Suppliers supplierId;
		
	//--------------------------------------------
		
		
		
}
