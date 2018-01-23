package com.spring.financial.database.repository;


import com.spring.financial.database.entity.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TransactionsRepository extends JpaRepository<Transactions, Integer> {

}
