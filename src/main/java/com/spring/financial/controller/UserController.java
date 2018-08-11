package com.spring.financial.controller;

import com.spring.financial.auth.HashManager;
import com.spring.financial.auth.TokenManager;
import com.spring.financial.database.entities.Person;
import com.spring.financial.controller.RequestBody.PersonInfo;
import com.spring.financial.database.entities.Stocks;
import com.spring.financial.database.entities.Transactions;
import com.spring.financial.database.repositories.PersonRepository;
import com.spring.financial.database.repositories.StocksRepository;
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
public class UserController {
    @Autowired
    PersonRepository personRepository;

    @Autowired
    TransactionsRepository transactionsRepository;

    @Autowired
    StocksRepository stocksRepository;

    @PostMapping(value = "/api/add-person")
    public ResponseEntity<Object> addPerson(@RequestBody Person person) {
        JSONObject Entity = new JSONObject();
        if(personRepository.findByEmail(person.getEmail()).isEmpty()){
            String hashedPassword = HashManager.hashpw(person.getPassword());
            person.setPassword(hashedPassword);
            personRepository.save(person);
            Entity.put("completed", true);
            return new ResponseEntity<>(Entity, HttpStatus.OK);
        }
        else {
            Entity.put("completed", false);
            Entity.put("message", "Account already exist");
            return new ResponseEntity<>(Entity, HttpStatus.CONFLICT);
        }
    }

    @PostMapping(value = "/api/login")
    public ResponseEntity<Object> login(@RequestBody PersonInfo personInfo) {
        JSONObject Entity = new JSONObject();
        String email = personInfo.getEmail();
        String password =  personInfo.getPassword();
        if(!personRepository.findByEmail(email).isEmpty()){
            Person person = personRepository.findByEmail(email).get(0);
            String hashPassword = person.getPassword();
            Integer userID = person.getId();
            if (HashManager.checkpw(password, hashPassword)) {
                String token = TokenManager.createJWT(userID.toString());
                Entity.put("completed", true);
                Entity.put("token", token);
                return new ResponseEntity<>(Entity, HttpStatus.OK);
            } else {
                Entity.put("completed", false);
                Entity.put("message", "Invalid password");
                return new ResponseEntity<>(Entity, HttpStatus.UNAUTHORIZED);
            }
        }
        else {
            Entity.put("completed", false);
            Entity.put("message", "Email has not been registered");
            return new ResponseEntity<>(Entity, HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/api/get-user-information")
    public ResponseEntity<Object> getUserInformation(@CookieValue(value = "sf", defaultValue = "") String sf) {
        JSONObject Entity = new JSONObject();
        List<Transactions> transactionsList = new ArrayList<>();
        List<Stocks> stocksList = new ArrayList<>();
        if (!sf.isEmpty()) {
            try {
                Claims claims = TokenManager.parseJWT(sf);
                Integer userId = Integer.parseInt(claims.getSubject());
                stocksList = stocksRepository.findByUserId(userId);
                transactionsList =	transactionsRepository.findByUserId(userId);
                Entity.put("transactions", transactionsList);
                Entity.put("usersStocks", stocksList);
                Entity.put("completed", true);
                return new ResponseEntity<>(Entity, HttpStatus.OK);
            }
            catch (Exception e) {
                Entity.put("completed", false);
                Entity.put("message", e.getMessage());
                return new ResponseEntity<>(Entity, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        else {
            Entity.put("completed", false);
            Entity.put("message", "Invalid credentials");
            return new ResponseEntity<>(Entity, HttpStatus.FORBIDDEN);
        }
    }
}