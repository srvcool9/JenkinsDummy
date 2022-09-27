package com.netlink.rsk.service;

import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.SpringSecurityMessageSource;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class UserService implements UserDetailsService {

    protected MessageSourceAccessor messages = SpringSecurityMessageSource.getAccessor();
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (null == username) {
            //throw new UsernameNotFoundException(ErrorMessage.USER_IS_NULL);
            throw new BadCredentialsException(this.messages.getMessage("EmptyUsername", "Empty username not allowed!"));
        }
     else {
            UserDetails userDetails = new User(username, "123456", new ArrayList<>());
            return userDetails;
        }

    }
}
