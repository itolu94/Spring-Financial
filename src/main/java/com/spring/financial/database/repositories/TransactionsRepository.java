package com.spring.financial.database.repositories;


import com.spring.financial.database.entities.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TransactionsRepository extends JpaRepository<Transactions, Integer> {
    List<Transactions> findByUserId(Integer userId);
    List<Transactions> findByUserIdAndCategory(Integer userId, String category);
}
