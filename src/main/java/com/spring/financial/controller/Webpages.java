package com.spring.financial.controller;

import com.spring.financial.api.ApiManager;
import com.spring.financial.auth.TokenManager;
import com.spring.financial.database.entities.Stocks;
import com.spring.financial.database.repositories.StocksRepository;
import io.jsonwebtoken.Claims;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
public class Webpages {
    @GetMapping(value = {"/", "/stock-market", "/create-account", "/login", "/stock-market"})
    public String getIndex() {
        return "index.html";
    }
}
