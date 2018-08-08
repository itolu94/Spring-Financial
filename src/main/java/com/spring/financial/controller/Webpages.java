package com.spring.financial.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
public class Webpages {
    @GetMapping(value = {"/", "/stock-market", "/create-account", "/login", "/stock-market"})
    public String getIndex() {
        return "index.html";
    }
}
