package com.spring.financial.database.entity;

import javax.persistence.*;

@Entity
@Table(name="TRANSACTIONS")
public class Transactions {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	private int userId;
	private int amount;
	private String category;
	private String note;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Transactions() {
	}

	public Transactions(int userId, int amount, String category, String note) {
		this.userId = userId;
		this.amount = amount;
		this.category = category;
		note = note;
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
		return note;
	}

	public void setNote(String note) {
		note = note;
	}

	@Override
	public String toString() {
		return String.format("\nTransaction [id=%s, amount=%s, note=%s, category=%s]", id, amount, note, category);
	}
}
