package com.spring.financial.controller;


import com.spring.financial.api.ApiManager;

import com.spring.financial.auth.TokenManager;
import com.spring.financial.database.entity.Stocks;
import com.spring.financial.database.entity.Transactions;
import com.spring.financial.database.repository.StocksRepository;
import io.jsonwebtoken.Claims;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
public class StocksController {

    @Autowired
    ApiManager apiManager;

    @Autowired
    StocksRepository stocksRepository;

    JSONParser parser = new JSONParser();

    @GetMapping(value = "/api/get-stocks")
    public ResponseEntity<String> getSockValue(@RequestParam String stock, @CookieValue(value = "sf", defaultValue = "") String sf){
       try {
           ResponseEntity<String> response = apiManager.getStocks(stock);
           JSONObject responseObject =  (JSONObject) parser.parse(response.getBody());
           if(responseObject.containsKey("Error Message")){
               return new ResponseEntity<> ("Stock does not exist", HttpStatus.NOT_FOUND);
           }
           else{
               return new ResponseEntity<> (response.getBody(), HttpStatus.ACCEPTED);
           }
       }
       catch(Exception e){
           System.out.println(e);
            return new ResponseEntity<> ("Internal error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/api/save-stock")
    public ResponseEntity<Object> getStocks(@RequestBody String stock, @CookieValue(value = "sf", defaultValue = "") String sf){
        JSONObject Entity = new JSONObject();
        if(!sf.isEmpty()){
            try {
                Claims claims = TokenManager.parseJWT(sf);
                Integer userId = Integer.parseInt(claims.getSubject());
                Stocks stocks = new Stocks(userId, stock);
                stocksRepository.save(stocks);
                Entity.put("completed", true);
                return new ResponseEntity<Object>(Entity, HttpStatus.OK);
            }
            catch(Exception e){
                System.out.println(e);
                Entity.put("completed", false);
                Entity.put("message", "Internal server error.");
                return new ResponseEntity<Object>(Entity, HttpStatus.INTERNAL_SERVER_ERROR);
            }

        }
        Entity.put("completed", false);
        Entity.put("message", "Please login.");
        return new ResponseEntity<Object>(Entity, HttpStatus.FORBIDDEN);

    }
}
