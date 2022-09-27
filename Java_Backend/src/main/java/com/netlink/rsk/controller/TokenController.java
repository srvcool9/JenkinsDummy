package com.netlink.rsk.controller;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.service.UserService;
import com.netlink.rsk.utility.JSONWebTokenGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("Token")
public class TokenController {

    @Autowired
    private UserService userService;

    @Autowired
    private JSONWebTokenGenerator tokenGenerator;

    @GetMapping(value={"/GetToken/{userName}"})
    public ResponseEntity<Response> getToken(@PathVariable(value = "userName") String userName ) throws Exception {
        try {
            final UserDetails userDetails = userService.loadUserByUsername(userName);
            final String token = tokenGenerator.generateToken(userDetails);
            List<String> tokenList = new ArrayList<>();
            tokenList.add(token);
            return new ResponseEntity<>(new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED,tokenList), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
