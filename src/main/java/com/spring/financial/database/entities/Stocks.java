package com.spring.financial.database.entities;


import javax.persistence.*;

@Entity
@Table(name="STOCKS")
public class Stocks {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int userId;
    private String stockName;

    public Stocks() {
    }

    public Stocks(int userId, String stockName) {
        this.userId = userId;
        this.stockName = stockName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getStockName() {
        return stockName;
    }

    public void setStockName(String stockName) {
        this.stockName = stockName;
    }

}
