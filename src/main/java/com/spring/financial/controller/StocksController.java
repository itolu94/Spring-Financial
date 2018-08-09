package com.spring.financial.controller;


import com.spring.financial.api.ApiManager;

import com.spring.financial.auth.TokenManager;
import com.spring.financial.database.entities.Stocks;
import com.spring.financial.database.repositories.StocksRepository;
import io.jsonwebtoken.Claims;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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
           if(responseObject.containsKey("Error Message")) return new ResponseEntity<> ("Stock does not exist", HttpStatus.NOT_FOUND);
           else return new ResponseEntity<> (response.getBody(), HttpStatus.ACCEPTED);
       }
       catch(Exception e){
           System.out.println(e);
           return new ResponseEntity<> (e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/api/save-stock")
    public ResponseEntity<Object> getStocks(@RequestBody String stock, @CookieValue(value = "sf", defaultValue = "") String sf){
        stock = stock.replace('=', ' ').trim();
        JSONObject Entity = new JSONObject();
        if(!sf.isEmpty()){
            try {
                Claims claims = TokenManager.parseJWT(sf);
                Integer userId = Integer.parseInt(claims.getSubject());
                //check if user has already saved the stock
                if(stocksRepository.findByStockNameAndUserId(stock, userId).isEmpty()) {
                    Stocks stocks = new Stocks(userId, stock);
                    stocksRepository.save(stocks);
                    Entity.put("completed", true);
                    return new ResponseEntity<Object>(Entity, HttpStatus.OK);
                } else {
                    Entity.put("completed", false);
                    Entity.put("message", "Stock has already been saved.");
                    return new ResponseEntity<Object>(Entity, HttpStatus.BAD_REQUEST);
                }
            }
            catch(Exception e){
                System.out.println(e);
                Entity.put("completed", false);
                Entity.put("message", "Internal server error.");
                return new ResponseEntity<Object>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }

        }
        Entity.put("completed", false);
        Entity.put("message", "Please login.");
        return new ResponseEntity<Object>(Entity, HttpStatus.FORBIDDEN);

    }
}
