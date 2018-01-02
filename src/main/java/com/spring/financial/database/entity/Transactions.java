package com.spring.financial.database.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Transactions {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	private int userId;
	private int amount;
	private String category;
	private String Note;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Transactions(int userId, int amount, String category, String note) {
		this.userId = userId;
		this.amount = amount;
		this.category = category;
		Note = note;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getNote() {
		return Note;
	}

	public void setNote(String note) {
		Note = note;
	}
}
