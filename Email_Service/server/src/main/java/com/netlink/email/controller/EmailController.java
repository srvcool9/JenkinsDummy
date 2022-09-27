package com.netlink.email.controller;

import com.netlink.email.service.EmailService;
import com.netlink.email.model.Mail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.MessagingException;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping

/**
 * This class serves as controller for email-notification
 */
public class EmailController {

    @Autowired
    private EmailService emailService;

    private static Logger log = LoggerFactory.getLogger(EmailController.class);

    /**
     * This method  to send Mail
     * @return ResponseEntity
     * @throws IOException
     * @throws MessagingException
     */
    @GetMapping("/getOtp")
    public ResponseEntity<Boolean> getOtp() throws IOException, MessagingException {

        log.info("START... Sending Otp");

        Mail mail = new Mail();

        mail.setFrom("meatcapslock@gmail.com");//replace with your desired email
        mail.setMailTo("amalviya@netlink.com");//replace with your desired email
        mail.setSubject("OTP");//enter subject
        mail.setMsg("");//enter msg

        Map<String, Object> model = new HashMap<String, Object>();
        model.put("name", "Brajesh");
        model.put("location", "India");
        model.put("sign", "Avani");
        model.put("otp", "234567");
        mail.setProps(model);

//        emailService.send(mail, Type.BIRTHDAY);
        log.info("END... Email sent success");
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}




