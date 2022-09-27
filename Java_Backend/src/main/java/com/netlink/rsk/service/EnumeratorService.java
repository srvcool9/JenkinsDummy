package com.netlink.rsk.service;

import com.netlink.email.enums.Type;
import com.netlink.email.model.Mail;
import com.netlink.email.service.EmailService;
import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.BankBranchMaster;
import com.netlink.rsk.model.EnumeratorRegistration;
import com.netlink.rsk.model.OtpDetails;
import com.netlink.rsk.repository.BankBranchMasterRepository;
import com.netlink.rsk.repository.EnumeratorRegistrationRepository;
import com.netlink.rsk.repository.OtpDetailsRepository;
import com.netlink.rsk.utility.FileUtility;
import com.netlink.rsk.utility.OtpGenerator;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.IOException;
import java.nio.file.Path;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class EnumeratorService implements IEnumerator{

    private static final Logger LOGGER = LogManager.getLogger(EnumeratorService.class);
    @Autowired
    private EnumeratorRegistrationRepository enumeratorRepository;

    @Autowired
    private BankBranchMasterRepository bankBranchRepository;

    @Autowired
    private OtpGenerator otpGenerator;

    @Autowired
    private OtpDetailsRepository otpDetailsRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private FileUtility fileUtility;

    private List<EnumeratorRegistration> enumeratorList;
    private String text="Enumerator";


    @Override
    public Response getEnumerators(Long id) {
        if(id!=null){
            LOGGER.info("Fetching data for enumerator id: "+id);
            EnumeratorRegistration enumerator= enumeratorRepository.findById(id).get();
            enumeratorList= new ArrayList<>();
            enumeratorList.add(enumerator);
        }else{
            enumeratorList=new ArrayList<>();
            LOGGER.info("Fetching all enumerators data...");
            enumeratorList= enumeratorRepository.findAll();
        }
        if(enumeratorList.isEmpty()==true){
            LOGGER.error("No data found...");
            return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }
        return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED ,enumeratorList);
    }

    @Override
    public Response saveEnumerator(MultipartFile file, EnumeratorRegistration enumerator) throws Exception {
        String otp=null;
        Map<String,String> map= new HashMap<>();
        ArrayList<Map<String,String>> data=new ArrayList<>();
        if(enumerator!=null){
            LOGGER.info("Checking if enumerator mob or email is already exists in the database....");
            EnumeratorRegistration exists = enumeratorRepository.findByMobile(enumerator.getMobile());
            EnumeratorRegistration existsEmail = enumeratorRepository.findByEmail(enumerator.getEmail());
            if(exists!=null || existsEmail!=null){
                LOGGER.error("User mob or email is already exists in the database....");
                return new Response(StaticResponse.FAILURE_Status,text+StaticResponse.MOBILE_REGISTERED,null);
            }
            else {
                LOGGER.info("Saving data for enumerator "+enumerator.getEnumeratorName());
                EnumeratorRegistration persisted = enumeratorRepository.save(enumerator);
                saveEnumeratorDocument(file,persisted);
            if(persisted!=null){
                LOGGER.info(" data for enumerator "+persisted.getEnumeratorName()+" has been saved successfully");
                otp=otpGenerator.generateOtp();
                LOGGER.info(" OTP generated for enumerator "+persisted.getEnumeratorName()+":"+otp);
                saveOtpDetails(otp,persisted);
                map.put("EnumeratorId",persisted.getEnumeratorId().toString());
                map.put("Otp",otp);
                data.add(map);
            }
            if(enumerator.getEnumeratorId()!=null){
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.UPDATE_SUCCESS_MESSAGE,data);
            }else{
                sendOTP(persisted,otp);
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,data);
            }
        }
        }
        else{
            return new Response(StaticResponse.FAILURE_Status,StaticResponse.FIELD_MISSING,null);
        }
    }

    public void saveEnumeratorDocument(MultipartFile file,EnumeratorRegistration registration) throws Exception {
        if(file!=null){
            LOGGER.info("Saving Enumerator supporting document");
            String fileName = StaticResponse.ENUMERATOR_DOC_PREFIX + registration.getEnumeratorId()+ StaticResponse.SEPRATOR + file.getOriginalFilename();
            fileUtility.save(file);
            LOGGER.info("Enumerator supporting document successfully uploaded to the server");
            Path filePath = fileUtility.getRoot(file.getOriginalFilename());
            registration.setSupportingDocument(filePath.toString());
            LOGGER.info("Updating supporting document path on enumerator id:"+ registration.getEnumeratorId());
            EnumeratorRegistration persist= enumeratorRepository.save(registration);
            if(persist!=null){
                LOGGER.info("Supporting document updated successfully");
            }else{
                LOGGER.error("Supporting document not updated");
            }
        }
    }

    public OtpDetails saveOtpDetails(String otp,EnumeratorRegistration persisted){
        OtpDetails savedOtp = new OtpDetails();
        OtpDetails existingOtp = otpDetailsRepository.findByMobile(persisted.getMobile());
        if(existingOtp!=null){
            existingOtp.setOTP(otp);
            existingOtp.setTimeStamp(LocalDateTime.now());
            LOGGER.info("Saving OTP in the database for mobile"+persisted.getMobile());
            savedOtp= otpDetailsRepository.save(existingOtp);
        }
        else {
            OtpDetails otpDetails = new OtpDetails();
            otpDetails.setOTP(otp);
            otpDetails.setIsExpired(0);
            otpDetails.setMobile(persisted.getMobile());
            otpDetails.setIsVerified(0);
            otpDetails.setModule("Enumerator");
            otpDetails.setTimeStamp(LocalDateTime.now());
            LOGGER.info("Saving Generated OTP in the database for mobile"+persisted.getMobile());
            savedOtp = otpDetailsRepository.save(otpDetails);
        }
        LOGGER.info("Generated OTP saved successfully in the database for mobile"+persisted.getMobile());
         return savedOtp;
    }

    @Override
    public Response verifyOtpDetails(String mobile, String otp) throws Exception {

        return new Response(StaticResponse.SUCCESS_Status, StaticResponse.OTP_VERIFICATION_SUCCESS, null);
//        OtpDetails otpDetails= otpDetailsRepository.findByMobile(mobile);
//        LocalDateTime currentDate = LocalDateTime.now();
//        long diff = Duration.between(otpDetails.getTimeStamp(),currentDate).toMinutes();
//        LOGGER.info("Checking is OTP is not expired...");
//        if(diff>10){
//            LOGGER.error("OTP expired....");
//            return new Response(StaticResponse.FAILURE_Status,StaticResponse.OTP_EXPIRED,null);
//        }else {
//            LOGGER.info("OTP verified successfully.");
//            return new Response(StaticResponse.SUCCESS_Status, StaticResponse.OTP_VERIFICATION_SUCCESS, null);
//        }
    }

    @Override
    public Response resendOtp(String mobile) throws MessagingException, IOException {
        EnumeratorRegistration enumeratorRegistration= enumeratorRepository.findByMobile(mobile);
        Map<String,String> map= new HashMap<>();
        ArrayList<Map<String,String>> data=new ArrayList<>();
        OtpDetails otpDetailsData= otpDetailsRepository.findByMobile(mobile);
        OtpDetails otpDetails = new OtpDetails();
        if(otpDetailsData!=null){
         otpDetails.setId(otpDetailsData.getId());
        }
        String otp=otpGenerator.generateOtp();
        otpDetails.setOTP(otp);
        otpDetails.setIsExpired(0);
        otpDetails.setMobile(mobile);
        otpDetails.setIsVerified(0);
        otpDetails.setModule("Enumerator");
        otpDetails.setTimeStamp(LocalDateTime.now());
        OtpDetails savedOtp= otpDetailsRepository.save(otpDetails);
        map.put("mobile",savedOtp.getMobile());
        map.put("Otp",savedOtp.getOTP());
        data.add(map);
        LOGGER.info("OTP generated successfully for mobile/email :"+otp);
        sendOTP(enumeratorRegistration,otp);
        return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.UPDATE_SUCCESS_MESSAGE,data);
    }

    @Override
    public Response verifyEnumerator(Long id) {
        LOGGER.info("Verifying enumerator id: "+id);
        EnumeratorRegistration enumerator= enumeratorRepository.findById(id).get();
        enumerator.setVerificationStatus(Long.valueOf(47));
        EnumeratorRegistration persisted= enumeratorRepository.save(enumerator);
        if(persisted!=null){
            LOGGER.info("Enumerator verified successfully");
            return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.UPDATE_SUCCESS_MESSAGE,null);
        }else{
            LOGGER.error("Enumerator verification failed");
            return new Response(StaticResponse.UPDATE_FAIL_MESSAGE,text+StaticResponse.UPDATE_FAIL_MESSAGE,null);
        }
    }

    @Override
    public Response verifyIFSC(String ifsc) {
        List<BankBranchMaster> bankBranchList = new ArrayList<>();
        LOGGER.info("Verifying IFSC code: "+ifsc);
        BankBranchMaster bankBranchMaster = bankBranchRepository.findByIFSCCode(ifsc);
        if(bankBranchMaster!=null){
            bankBranchList.add(bankBranchMaster);
            return new Response(StaticResponse.SUCCESS_Status,StaticResponse.BANK_BRANCH_VERIFICATION_SUCCESS,bankBranchList);
        }
        LOGGER.error("IFSC verification failed");
        return new Response(StaticResponse.FAILURE_Status,StaticResponse.BANK_BRANCH_VERIFICATION_FAILURE,null);
    }

    private boolean sendOTP(EnumeratorRegistration enumerator,String otp) throws MessagingException, IOException {
        boolean mailSent = false;
        Map map= new HashMap();
        Mail mailInfo = new Mail();
        mailInfo.setMailTo(enumerator.getEmail());
        mailInfo.setSubject("One Time Password");
        map.put("name",enumerator.getEnumeratorName());
        map.put("otp",otp);
        mailInfo.setProps(map);
        if (null != mailInfo && null != map) {
            LOGGER.info("Sending OTP to the registered email & mobile...");
            emailService.send(mailInfo, Type.OTP);
            return true;
        }
        LOGGER.error("Error! mail not sent..");
        return false;
    }
}
