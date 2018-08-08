package com.spring.financial.database.repositories;

import com.spring.financial.database.entities.Stocks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StocksRepository extends JpaRepository<Stocks, Integer> {
    List<Stocks> findByUserId(Integer UserId);
    List<Stocks> findByStockNameAndUserId( String StockName, Integer UserId);
}
