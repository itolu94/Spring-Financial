package com.spring.financial.controller;

import com.spring.financial.database.entity.Transactions;
import com.spring.financial.database.repository.TransactionsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

	@RequestMapping(value = "/api/add-transaction", method = RequestMethod.POST)
	@ResponseBody
	public String saveTransaction(@RequestParam String category, @RequestParam Integer amount,
								  @RequestParam String note, @RequestParam(value="userId", required = false, defaultValue = "1") Integer userId) {
		Integer transactionId;
		try {
			Transactions transactions= new Transactions(userId, amount, category, note);
			transactionsRepository.save(transactions);
			transactionId = transactions.getId();
		}
		catch (Exception e){
			return "{completed: \"False\", message: \"Transaction was unable to save.\"}";

		}
		return "{completed: \"True\", transactionId: " + transactionId  + "}";
	}


	@RequestMapping(value = "/api/delete-transaction", method = RequestMethod.DELETE)
	@ResponseBody
	public String saveTransaction(@RequestParam Integer transactionId) {
		try {
			transactionsRepository.deleteById(transactionId);
		}
		catch (Exception e){
			return "{completed: \"False\", message: \"Transaction was unable to be delete.\"}";

		}
		return "{completed: \"True\"}";
	}
}

