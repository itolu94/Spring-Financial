package com.spring.financial.database.entity;

import javax.persistence.*;

@Entity
@Table(name="PERSON")
public class Person {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	private String name;
	private String password;


	public Person() {
	}

	public Person(String name, String password) {
		this.name = name;
		this.password = password;
	}

	public int getId() {

		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	

	
	@Override
	public String toString() {
		return "";
	}
	
	
}
