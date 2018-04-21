package com.spring.financial.api;

import org.json.simple.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;


@Component
public class ApiManager {
  private String apiKey =  System.getenv("ALPHA_VANTAGE");
  private String server = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=60min";
  private RestTemplate rest;
  private HttpHeaders headers;

  public ApiManager() {
    this.rest = new RestTemplate();
    this.headers = new HttpHeaders();
    headers.add("Content-Type", "application/json");
    headers.add("Accept", "*/*");
  }

  public ResponseEntity<String> getStocks(String uri) {
    JSONObject Entity = new JSONObject();
    String url = server + "&symbol="+ uri + "&apikey=" + apiKey;
    HttpEntity<String> requestEntity = new HttpEntity<String>("", headers);
    ResponseEntity<String> responseEntity = rest.exchange(url, HttpMethod.GET, requestEntity, String.class);
    return responseEntity;
  }

}