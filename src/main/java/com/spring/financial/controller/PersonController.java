package com.spring.financial.controller;

import com.spring.financial.database.entity.Person;
import com.spring.financial.database.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class PersonController {

    @Autowired
    PersonRepository personRepository;

    @RequestMapping(value = "/api/add-person", method = RequestMethod.GET)
    @ResponseBody
    public String saveTransaction(@RequestParam String name, @RequestParam String password) {
        Person person = new Person(name, password);
        personRepository.save(person);
        return "{status: \"completed\"}";
    }
}