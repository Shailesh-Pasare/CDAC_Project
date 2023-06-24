package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "milk_rate")
public class MilkRate {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "date_of_MilkRate",length = 20)
	@NotNull(message = "Name  required")
	private  LocalDate dateOfMilkRate;
	
	@Column(name = "cow_fat",length = 30)
	@NotNull(message = "cowFat required")
	private  Double cowFat;
	
	@NotNull(message = "buffaloFat required")
	@Column(name = "buffalo_fat",length = 30)
	private Double buffaloFat;
	
	@Column(name = "cow_Milk_Rate",length = 30)
	@NotNull(message = "cowMilkRate required")
	private  Double cowMilkRate;
	
	@Column(name = "buffalo_Milk_Rate",length = 30)
	@NotNull(message = "buffaloMilkRate required")
	private  Double buffaloMilkRate;

	public Long getId() {
		return id;
	}
 
}

