package com.spring.financial.database.entities;

import javax.persistence.*;

@Entity
@Table(name="PERSON")
public class Person {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String name;
	private String password;
	private String email;

	public Person() {
	}


	public int getId() {return id;}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {return password;}
	public void setPassword(String password) {this.password = password;}
	public String getEmail() {return email;}
	public void setEmail(String email) {this.email = email;}



	
}
