package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.EnumeratorRegistration;
import com.netlink.rsk.model.VisitAssessmentDocument;
import com.netlink.rsk.service.IAssessmentDocumentFiles;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("AssessmentDocFiles")
public class AssessmentDocumentFilesController {

    private static final Logger LOGGER = LogManager.getLogger(AssessmentDocumentFilesController.class);

    @Autowired
    private IAssessmentDocumentFiles assessmentDocFilesService;


    @PostMapping(value = "/AddUpdateDocumentFiles" ,consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Response> saveAssessmentDocument(@RequestPart(value = "document") List<MultipartFile> docList,
                                             @RequestPart(value = "images") List<MultipartFile> imageList,
                                             @RequestPart("assessmentDocument") VisitAssessmentDocument visitAssessmentDocument) throws Exception {
        try{
            LOGGER.info("Saving self assessment documents.........");
            Response response =assessmentDocFilesService.saveDocumentsFiles(visitAssessmentDocument,docList,imageList);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("Error "+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
