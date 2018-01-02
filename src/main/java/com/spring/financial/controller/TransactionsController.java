package com.spring.financial.controller;

import com.spring.financial.database.entity.Transactions;
import com.spring.financial.database.repository.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TransactionsController {

	@Autowired
	TransactionsRepository transactionsRepository;

	@RequestMapping(value = "/api/add-transaction", method = RequestMethod.GET)
	@ResponseBody
	public String saveTransaction(@RequestParam int amount, @RequestParam String category, @RequestParam String note, @RequestParam int userID) {
		Transactions transactions= new Transactions(userID, amount, category, note);
		transactionsRepository.save(transactions);
		return "{status: \"completed\"}";
	}
}