package com.spring.financial.database.repository;


import com.spring.financial.database.entity.Transactions;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TransactionsRepository extends CrudRepository<Transactions, Long> {

}
