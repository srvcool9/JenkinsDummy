package com.netlink.rsk.utility;

import com.netlink.rsk.constants.StaticResponse;
import org.springframework.stereotype.Component;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

@Component
public class OtpGenerator {
    public final SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG");
    public OtpGenerator() throws NoSuchAlgorithmException {
    }

    public  String generateOtp(){
        final StringBuilder otp = new StringBuilder(StaticResponse.DEFAULT_LENGTH);
        for (int i = 0; i < StaticResponse.DEFAULT_LENGTH; i++) {
            otp.append(secureRandom.nextInt(StaticResponse.DEFAULT_LENGTH));
        }
        return otp.toString();
    }
}
