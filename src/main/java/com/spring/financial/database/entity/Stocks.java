package com.spring.financial.database.entity;


import javax.persistence.*;

@Entity
@Table(name="PERSON")
public class Stocks {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int userId;
    private String stockName;
    private int StocksOwned;

    public Stocks() {
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

    public int getStocksOwned() {
        return StocksOwned;
    }

    public void setStocksOwned(int stocksOwned) {
        StocksOwned = stocksOwned;
    }
}
