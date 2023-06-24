  package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.app.entities.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class LoginRequestDto {
	// data members MUST MATCH with JSON prop names
	@NotBlank(message = "Email can't be blank!")
	@Email(message = "Invalid Email Format")
	private String email;

	private String password;
	
	
	private Role role;
}
