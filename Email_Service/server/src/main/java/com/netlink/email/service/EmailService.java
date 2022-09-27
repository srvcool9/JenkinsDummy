package com.netlink.email.service;

import com.netlink.email.model.Mail;
import com.netlink.email.enums.Type;

import javax.mail.MessagingException;
import java.io.IOException;

/**
 * This is an interface for EmailService
 */
public interface EmailService {

    public void send(Mail mail, Type type)  throws MessagingException, IOException;

}

