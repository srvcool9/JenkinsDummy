package com.netlink.rsk.controller;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.EnumeratorRegistration;
import com.netlink.rsk.service.IEnumerator;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("Enumerator")
public class EnumeratorController {

    private static final Logger LOGGER = LogManager.getLogger(EnumeratorController.class);

    @Autowired
    private IEnumerator enumeratorService;

    @GetMapping(value={"/GetEnumeratorList","/GetEnumeratorList/{id}"})
    public ResponseEntity<Response> getEnumerators(@PathVariable(value = "id",required = false) Long id) throws Exception {
        try {
            LOGGER.info("Fetching data for enumerator....");
            Response response = enumeratorService.getEnumerators(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error !"+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/AddUpdateEnumerator" ,consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Response> saveRole(@RequestPart(value = "file", required = false) MultipartFile file, @RequestPart("enumerator") EnumeratorRegistration enumerator) throws Exception {
        try{
            LOGGER.info("saving data for enumerator....");
            Response response = enumeratorService.saveEnumerator(file,enumerator);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("Error "+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value={"/OTPVerification/{mobile}/{otp}"})
    public ResponseEntity<Response> verifyOtp(@PathVariable(value = "mobile") String mobile,@PathVariable(value = "otp") String otp) throws Exception {
        try {
            LOGGER.info("OTP verification for mobile/email in process....");
            Response response = enumeratorService.verifyOtpDetails(mobile,otp);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.info("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping(value={"/GenerateOTP/{mobile}"})
    public ResponseEntity<Response> resendOtp(@PathVariable(value = "mobile") String mobile) throws Exception {
        try {
            LOGGER.info("Resending OTP..");
            Response response = enumeratorService.resendOtp(mobile);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value={"/EnumeratorVerification/{id}"})
    public ResponseEntity<Response> verifyEnumerator(@PathVariable(value = "id") Long enumeratorId) throws Exception {
        try {
            LOGGER.info("Verifying enumerator....");
            Response response = enumeratorService.verifyEnumerator(enumeratorId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.info("Error! "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value={"/GetBranch/{IFSC}"})
    public ResponseEntity<Response> getBranchIFSC(@PathVariable(value = "IFSC") String ifsc) throws Exception {
        try {
            LOGGER.info("Verifying IFSC code....");
            Response response = enumeratorService.verifyIFSC(ifsc);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("IFSC verification failed....");
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
