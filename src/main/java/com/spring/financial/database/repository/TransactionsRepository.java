package com.spring.financial.database.repository;


import com.spring.financial.database.entity.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TransactionsRepository extends JpaRepository<Transactions, Integer> {
    List<Transactions> findByUserId(Integer userID);
}
