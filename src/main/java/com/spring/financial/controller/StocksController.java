package com.spring.financial.controller;


import com.spring.financial.api.APIManager;
import com.spring.financial.database.entity.Transactions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class StocksController {

    @GetMapping(value = "/api/get-stocks")
    public ResponseEntity<String> getSockValue(@CookieValue(value = "sf", defaultValue = "") String sf){
        APIManager apiManager = new APIManager();
        String response = apiManager.get("Googl");
        System.out.println(response);
        return new ResponseEntity ("OK", HttpStatus.ACCEPTED);
    }
}
