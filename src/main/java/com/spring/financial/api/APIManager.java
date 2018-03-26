package com.spring.financial.api;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;



public class APIManager {
  private String apiKey =  System.getenv("ALPHA_VANTAGE");
  private String server = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY";
  private RestTemplate rest;
  private HttpHeaders headers;
  private HttpStatus status;

  public APIManager() {
    this.rest = new RestTemplate();
    this.headers = new HttpHeaders();
    headers.add("Content-Type", "application/json");
    headers.add("Accept", "*/*");
  }

  public String get(String uri) {
    String url = server + "&symbol="+ uri + "&apikey=" + apiKey;
    HttpEntity<String> requestEntity = new HttpEntity<String>("", headers);
    ResponseEntity<String> responseEntity = rest.exchange(url, HttpMethod.GET, requestEntity, String.class);
    this.setStatus(responseEntity.getStatusCode());
    return responseEntity.getBody();
  }


  public HttpStatus getStatus() {
    return status;
  }

  public void setStatus(HttpStatus status) {
    this.status = status;
  } 
}