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
	private String username;

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
	public String getUsername() {return username;}
	public void setUsername(String username) { this.username = username; }
	@Override
	public String toString() {
		return getName() + "is already registed" + getId();
	}
	
	
}
