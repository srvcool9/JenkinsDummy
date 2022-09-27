package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.EnumeratorRegistration;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.mail.Multipart;
import java.io.IOException;

public interface IEnumerator {
    public Response getEnumerators(Long id);
    public Response saveEnumerator(MultipartFile file, EnumeratorRegistration enumeratorRegistration) throws Exception;
    public Response verifyOtpDetails(String mobile,String otp) throws Exception;
    public Response resendOtp(String mobile) throws MessagingException, IOException;
    public Response verifyEnumerator(Long id);
    public Response verifyIFSC(String ifsc);
}
