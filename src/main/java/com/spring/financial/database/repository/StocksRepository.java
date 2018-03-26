package com.spring.financial.database.repository;

import com.spring.financial.database.entity.Stocks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StocksRepository extends JpaRepository<Stocks, Integer> {
    List<Stocks> findByUserId(Integer UserId);
}
