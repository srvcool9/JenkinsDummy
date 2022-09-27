package com.netlink.rsk.controller;

import com.google.zxing.NotFoundException;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.BatchMaster;
import com.netlink.rsk.service.IBatch;
import com.netlink.rsk.utility.QRCodeUtility;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("Batch")
public class BatchController {
    private static final Logger LOGGER = LogManager.getLogger(BatchController.class);

    @Autowired
    private IBatch batchService;

    @Autowired
    private QRCodeUtility qrCodeUtility;

    @GetMapping(value={"/GetBatchList","/GetBatchList/{id}"})
    public ResponseEntity<Response> getBatchList(@PathVariable(value = "id",required = false) Long id) throws Exception {
        try {
            LOGGER.info("Fetching data for BatchInitiate...");
            Response response= batchService.getBatchList(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/AddUpdateBatch")
    public ResponseEntity<Response> saveBatch
            (@RequestBody BatchMaster batchMaster) throws Exception {
        try{
            LOGGER.info("Saving training.....");
            Response response = batchService.saveBatch(batchMaster);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.info("Error:"+ e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value="/GetBatches/{trainingId}")
    public ResponseEntity<Response> getBatches(@PathVariable(value = "trainingId") Long trainingId) throws Exception {
        try {
            LOGGER.info("Fetching batch data.....");
            Response response= batchService.getBatchByTraining(trainingId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/generateQRCode/{batchCode}")
    public void generateQRCode(@PathVariable(value = "batchCode") String qrContent, HttpServletResponse response) throws IOException {
        response.setContentType("image/png");
        LOGGER.info("Generating qr code for batch code: "+qrContent);
        byte[] qrCode = qrCodeUtility.generateQRCode(qrContent);
        OutputStream outputStream = response.getOutputStream();
        outputStream.write(qrCode);
    }
    @PostMapping(value = "/readQRCode",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Response> generateQRCode(@RequestPart(value = "file") MultipartFile file) throws IOException, NotFoundException {
        try {
            LOGGER.info("Fetching QR code .....");
            Response response= qrCodeUtility.qrcodeReader(file);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value="/GetAllBatch")
    public ResponseEntity<Response> getAllBatches() throws Exception {
        try {
            LOGGER.info("Fetching batch data.....");
            Response response=batchService.getAllBatches();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
