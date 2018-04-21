package com.spring.financial.controller;


import com.spring.financial.api.ApiManager;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class StocksController {

    @Autowired
    ApiManager apiManager;
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
}
