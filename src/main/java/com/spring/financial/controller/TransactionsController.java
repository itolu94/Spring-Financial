package com.spring.financial.controller;

import com.spring.financial.database.entity.Transactions;
import com.spring.financial.database.repository.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class TransactionsController {

	@Autowired
	TransactionsRepository transactionsRepository;

	@GetMapping(value = "/api/get-transactions")
	public List<Transactions> getTransactions(){
		List<Transactions> transactionsList = new ArrayList<>();
		try {
			transactionsList =	transactionsRepository.findAll();
		}
		catch (Exception e){
			return transactionsList;
		}
		return transactionsList;
	}

	@PostMapping(value = "/api/add-transaction")
	public String saveTransaction(@RequestBody Transactions transaction, @CookieValue(value = "sf", defaultValue = "false") String sf) {
		System.out.println(sf);
		Integer transactionId;
		try {
			Date date = new Date();
			transaction.setCreated(date);
			transactionsRepository.save(transaction);
			transactionId = transaction.getId();
		}
		catch (Exception e){
			return "{\"completed\": \"false\", \"message\": \"Transaction was unable to save.\"}";

		}
		return "{\"completed\": true, \"transactionId\": " + transactionId  + "}";
	}



	@DeleteMapping(value = "/api/delete-transaction")
	public String deleteTransaction(@RequestParam Integer transactionId) {
		try {
			transactionsRepository.deleteById(transactionId);
		}
		catch (Exception e){
			return "{\"completed\" : \"false\", \"message \": \"Transaction was unable to be delete.\"}";

		}
		return "{\"completed\": \"true\"}";
	}

	@PutMapping(value = "/api/update-transaction")
	public String updateTransaction(@RequestBody Transactions transaction) {
		Integer transactionId;
		try {
			transactionsRepository.save(transaction);
			transactionId = transaction.getId();
		}
		catch (Exception e){
			return "{\"completed\": \"false\", \"message\": \"Transaction was unable to save.\"}";

		}
		return "{\"completed\": true, \"transactionId\": " + transactionId  + "}";
	}
}

