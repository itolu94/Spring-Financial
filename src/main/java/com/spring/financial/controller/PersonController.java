package com.spring.financial.controller;

import com.spring.financial.auth.HashManager;
import com.spring.financial.auth.TokenManager;
import com.spring.financial.database.entity.Person;
import com.spring.financial.database.entity.PersonInfo;
import com.spring.financial.database.repository.PersonRepository;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;


//TODO create controler to send all non api request to webpages;
//TODO return Response Entity for all API request;
@RestController
public class PersonController {

    @Autowired
    PersonRepository personRepository;

    @PostMapping(value = "/api/add-person")
    public String addPerson(@RequestBody Person person) {
        if(personRepository.findByEmail(person.getEmail()).isEmpty()){
            String hashedPassword = HashManager.hashpw(person.getPassword());
            person.setPassword(hashedPassword);
            personRepository.save(person);
            return "{\"completed\": true ,\"message\": \"account created\"}";
        }
        else {
            return "{\"completed\": false ,\"message\": \"account already exist\"}";
        }
    }
    @PostMapping(value = "/api/login")
    public ResponseEntity<Object> login(@RequestBody PersonInfo personInfo, HttpServletResponse response) {
        JSONObject Entity = new JSONObject();
        String email = personInfo.getEmail();
        String password =  personInfo.getPassword();
        if(!personRepository.findByEmail(email).isEmpty()){
            Person person = personRepository.findByEmail(email).get(0);
            String hashPassword = person.getPassword();
            if (HashManager.checkpw(password, hashPassword)) {
                String token = TokenManager.createJWT(email);
                Cookie cookie = new Cookie("sf", token);
                response.addCookie(cookie);
                Entity.put("completed", true);
                Entity.put("token", token);
                return new ResponseEntity<>(Entity, HttpStatus.OK);
            } else {
                Entity.put("completed", false);
                Entity.put("message", "Invalid credentials");
                return new ResponseEntity<>(Entity, HttpStatus.UNAUTHORIZED);

            }
        }
        else {
            Entity.put("completed", false);
            Entity.put("message", "\"Account not created for email\"");
            return new ResponseEntity<>(Entity, HttpStatus.NOT_FOUND);

        }
    }

}