package com.app.dto;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class BillDto {

private Long billId;
	
	
	@NotNull
	private LocalDate billDate;
	
	
	private Double buffaloMilkQuantity;
	
	
	private Double buffaloMilkFat;
	
	
	private Double cowMilkQuantity;
	
	
	private Double cowMilkFat;
	
	
	private Double totalAmount;	
	
		@JsonProperty("supplier_id")
		private Long supplierId;
}
