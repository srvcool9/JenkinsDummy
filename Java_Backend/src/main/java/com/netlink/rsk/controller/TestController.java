package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.BatchMaster;
import com.netlink.rsk.model.Coordinator;
import com.netlink.rsk.model.EmployeeMaster;
import com.netlink.rsk.repository.*;
import com.netlink.rsk.service.IBlock;
import com.netlink.rsk.service.ITraineeAnswerSheet;
import com.netlink.rsk.utility.ExcelGenerator;
import com.netlink.rsk.utility.MessageService;
import com.netlink.rsk.utility.PDFUtility;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.JsonPath;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import javax.xml.bind.annotation.W3CDomHandler;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping
public class TestController {

    private static final Logger LOGGER = LogManager.getLogger(TestController.class);

    @Autowired
    private IBlock block;

    @Autowired
    ExcelGenerator excel;

    @Autowired
    private PDFUtility pdfUtility;


    @Autowired
    private ITraineeAnswerSheet traineeAnswerSheet;

    public static final String username="rskmp-cpi=";
    public static final String password="Cpirsk#1234";
    public static final String message="Helloooooo";
    public static final String senderId="RSKCPI";
    public static final String mobileNumber="9575455117";
    public static final String secureKey="f6f8142a-39a5-4ea9-81be-2b722fcd30aa";
    public static final Long templateId=Long.valueOf(1);
    MessageService messageService = new MessageService();


//    @GetMapping(value={"/GetData"})
//    public ResponseEntity<List<?>> getGroups() throws Exception {
//        try {
//            List<?> list = repository.findAll();
//            return new ResponseEntity<>(list, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }


    @GetMapping("/sendSMS")
    public ResponseEntity<String> get() throws Exception {
        try {
           String sent= messageService.sendSingleSMS(username,password,message,senderId,mobileNumber,secureKey,null);
            return new ResponseEntity<>(sent, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/downloadExcel")
    public void export(HttpServletResponse response) throws Exception {
        response.setContentType("application/octet-stream");
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=Report.xlsx";
        response.setHeader(headerKey, headerValue);
        excel.export(response);
        LOGGER.info("Data generated...");
    }

    @GetMapping("/export1")
    public void exportToPDF() throws IOException {
        pdfUtility.pdfCreator();
    }

}
