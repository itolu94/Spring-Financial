package com.spring.financial.controller;

import com.spring.financial.auth.TokenManager;
import com.spring.financial.database.entities.Transactions;
import com.spring.financial.database.repositories.TransactionsRepository;
import io.jsonwebtoken.Claims;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class TransactionsController {

	@Autowired
	TransactionsRepository transactionsRepository;

	@GetMapping(value = "/api/get-transactions")
	public ResponseEntity<Object> getTransactions(
			@RequestParam (value = "category", required = false, defaultValue = "") String category,
			@CookieValue(value = "sf", defaultValue = "") String sf)
	{
		JSONObject Entity = new JSONObject();
		List<Transactions> transactionsList = new ArrayList<>();
		if (!sf.isEmpty()) {
			try {
				Claims claims = TokenManager.parseJWT(sf);
				Integer userId = Integer.parseInt(claims.getSubject());
				if (!category.isEmpty())
					transactionsList = transactionsRepository.findByUserIdAndCategory(userId, category);
				else
					transactionsList = transactionsRepository.findByUserId(userId);
				Entity.put("transactions", transactionsList);
				Entity.put("completed", true);
				return new ResponseEntity<>(Entity, HttpStatus.OK);
			} catch (Exception e) {
				Entity.put("message", e.getMessage());
				Entity.put("completed", false);
				return new ResponseEntity<>(Entity, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		Entity.put("completed", false);
		Entity.put("message", "Please login");
		return new ResponseEntity<>(Entity, HttpStatus.UNAUTHORIZED);
	}



	@PostMapping(value = "/api/add-transaction")
	public ResponseEntity<Object> saveTransaction(@RequestBody Transactions transaction, @CookieValue(value = "sf", defaultValue = "") String sf) {
		JSONObject Entity = new JSONObject();

		if (!sf.isEmpty()) {
			try {
				Claims claims = TokenManager.parseJWT(sf);
				Integer userId = Integer.parseInt(claims.getSubject());
				Date date = new Date();
				transaction.setDate(date);
				transaction.setUserId(userId);
				transactionsRepository.save(transaction);
				Entity.put("completed", true);
				Entity.put("transactionId", transaction.getId());
				return new ResponseEntity<>(Entity, HttpStatus.OK);
			} catch (Exception e) {
				Entity.put("completed", false);
				Entity.put("message", "Transaction was unable to save");
				return new ResponseEntity<>(Entity, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		Entity.put("completed", false);
		Entity.put("message", "Please login");
		return new ResponseEntity<>(Entity, HttpStatus.UNAUTHORIZED);
	}

	@DeleteMapping(value = "/api/delete-transaction")
	public ResponseEntity<Object> deleteTransaction(@RequestParam Integer transactionId) {
		JSONObject Entity = new JSONObject();
		try {
			transactionsRepository.deleteById(transactionId);
		}
		catch (Exception e){
			Entity.put("completed", false);
			Entity.put("message", "Transaction was unable to be delete");
			return new ResponseEntity<>(Entity, HttpStatus.INTERNAL_SERVER_ERROR);

		}
		Entity.put("completed", true);
		return new ResponseEntity<>(Entity, HttpStatus.OK);
	}

	@PutMapping(value = "/api/update-transaction")
	public ResponseEntity<Object>  updateTransaction(@RequestBody Transactions transaction) {
		JSONObject Entity = new JSONObject();
		Integer transactionId;
		try {
			transactionsRepository.save(transaction);
			transactionId = transaction.getId();
		}
		catch (Exception e){
			Entity.put("completed", false);
			Entity.put("message", "Transaction was unable to save");
			return new ResponseEntity<>(Entity, HttpStatus.INTERNAL_SERVER_ERROR);

		}
		Entity.put("completed", true);
		Entity.put("transactionId", transactionId);
		return new ResponseEntity<>(Entity, HttpStatus.OK);
	}
}

