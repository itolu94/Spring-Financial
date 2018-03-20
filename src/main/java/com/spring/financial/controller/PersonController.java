package com.spring.financial.controller;

import com.spring.financial.auth.HashManager;
import com.spring.financial.auth.TokenManager;
import com.spring.financial.database.entity.Person;
import com.spring.financial.database.entity.PersonInfo;
import com.spring.financial.database.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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
    public ResponseEntity<String> login(@RequestBody PersonInfo personInfo) {
        String email = personInfo.getEmail();
        String password =  personInfo.getPassword();
        if(!personRepository.findByEmail(email).isEmpty()){
            Person person = personRepository.findByEmail(email).get(0);
            String hashPassword = person.getPassword();
            if (HashManager.checkpw(password, hashPassword)) {
                String token = TokenManager.createJWT(email);
                return new ResponseEntity<>("{\"completed\": true,  \"token\": " + token +  "}", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);

            }
        }
        else {
            return new ResponseEntity<>("Account not created for email", HttpStatus.NOT_FOUND);

        }
    }

}