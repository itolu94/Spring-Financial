package com.spring.financial.controller;

import com.spring.financial.auth.HashManager;
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

    @RequestMapping(value = "/api/add-person", method = RequestMethod.POST)
    @ResponseBody
    public String saveTransaction(@RequestParam String name, @RequestParam String username, @RequestParam String password) {
        if(personRepository.findByUsername(username).isEmpty()){
            Person person = new Person();
            String hashedPassword = HashManager.hashpw(password);
            person.setName(name);
            person.setUsername(username);
            person.setPassword(hashedPassword);
            personRepository.save(person);
            return "{status: \"completed\"}";
        }
        else {
            return "{status: \"account already exist\"}";
        }
    }
}