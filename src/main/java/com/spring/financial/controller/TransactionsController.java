package com.spring.financial.controller;

import com.spring.financial.database.entity.Transactions;
import com.spring.financial.database.repository.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
public class TransactionsController {

	@Autowired
	TransactionsRepository transactionsRepository;

	@RequestMapping(value = "/api/get-transactions", method = RequestMethod.GET)
	@ResponseBody
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

	@RequestMapping(value = "/api/add-transaction", method = RequestMethod.POST, produces = "application/json")
	@ResponseBody
	public String saveTransaction(@RequestBody Transactions transaction) {
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



	@RequestMapping(value = "/api/delete-transaction", method = RequestMethod.DELETE)
	@ResponseBody
	public String deleteTransaction(@RequestParam Integer transactionId) {
		try {
			transactionsRepository.deleteById(transactionId);
		}
		catch (Exception e){
			return "{\"completed\" : \"false\", \"message \": \"Transaction was unable to be delete.\"}";

		}
		return "{\"completed\": \"true\"}";
	}
}

