package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.VisitAssessmentDocument;
import com.netlink.rsk.model.VisitAssessmentFiles;
import com.netlink.rsk.repository.VisitAssessmentDocumentRepository;
import com.netlink.rsk.repository.VisitAssessmentFilesRepository;
import com.netlink.rsk.utility.FileUtility;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@Service
public class AssessmentDocumentFilesService implements IAssessmentDocumentFiles{

    private static final Logger LOGGER = LogManager.getLogger(AssessmentDocumentFilesService.class);

    private List<VisitAssessmentDocument> visitAssessmentDocumentList;
    private String text="Visit Assessment document";
    @Autowired
    private VisitAssessmentDocumentRepository documentRepository;

    @Autowired
    private FileUtility fileUtility;

    @Autowired
    private VisitAssessmentFilesRepository filesRepository;

    @Override
    @Transactional
    public Response saveDocumentsFiles(VisitAssessmentDocument visitAssessmentDocument,
                                       List<MultipartFile> docList, List<MultipartFile> imageList) throws Exception {
        visitAssessmentDocumentList= new ArrayList<>();
        if(visitAssessmentDocument!=null){
            List<VisitAssessmentFiles> savedDocumentFiles= new ArrayList<>();
            LOGGER.info("Saving assessment related documents for section id: "+visitAssessmentDocument.getSection().getSectionId());
            VisitAssessmentDocument persist= new VisitAssessmentDocument();
            persist= documentRepository.save(visitAssessmentDocument);
            LOGGER.info("Visit assessment document transaction saved successfully by id: "+persist.getVisitAssessmentDocumentId());
            if(persist!=null){
                if(docList.isEmpty()==false){
                    List<VisitAssessmentFiles> savedDocsList=uploadSaveDocuments(docList,persist);
                     savedDocumentFiles.addAll(savedDocsList);
                }
                if(imageList.isEmpty()==false){
                    List<VisitAssessmentFiles> savedImageList=uploadSaveImages(imageList,persist);
                    savedDocumentFiles.addAll(savedImageList);
                }

            if(savedDocumentFiles.isEmpty()==false){
                LOGGER.info("All documents uploaded successfully over server & database");
                persist.setFilesList(savedDocumentFiles);
                visitAssessmentDocumentList.add(persist);
                return new Response(StaticResponse.SUCCESS_Status, StaticResponse.FILE_SAVED,visitAssessmentDocumentList);
            }

            }else{
                LOGGER.error("Error! Visit Assessment document data not saved..");
                return new Response(StaticResponse.FAILURE_Status, StaticResponse.ERROR, null);
            }
        }
        LOGGER.error("Error! no data found..");
        return new Response(StaticResponse.FAILURE_Status, StaticResponse.FIELD_MISSING, null);
    }
    @Transactional
    public List<VisitAssessmentFiles> uploadSaveDocuments(List<MultipartFile> docList,VisitAssessmentDocument vsd)throws Exception{
        List<VisitAssessmentFiles> savedFilesList=new ArrayList<>();
        docList.forEach(document->{
               try {
                   LOGGER.info("Saving document under self assessment document id: "+vsd.getVisitAssessmentDocumentId());
                  Path fileLocation= fileUtility.saveSelfAssessmentDocs(document,vsd.getVisitAssessmentDocumentId(),docList.indexOf(document));
                   VisitAssessmentFiles vsf = new VisitAssessmentFiles();
                   vsf.setName(document.getOriginalFilename());
                   vsf.setDocumentPath(fileLocation.toString());
                   vsf.setType(document.getContentType());
                   vsf.setVisitAssessmentDocument(vsd);
                   VisitAssessmentFiles persist = filesRepository.save(vsf);
                   LOGGER.info("Document details saved successfully by id: "+persist.getVisitAssessmentFileId());
                   savedFilesList.add(persist);
               } catch (Exception e) {
                   LOGGER.error("Error: "+e.getMessage());
                   throw new RuntimeException(e);
               }
           });
        return savedFilesList;
    }
    @Transactional
    public List<VisitAssessmentFiles> uploadSaveImages(List<MultipartFile> imageList,VisitAssessmentDocument vsd){
      List<VisitAssessmentFiles> savedFilesList=  new ArrayList<>();
        imageList.forEach(document->{
            try {
                LOGGER.info("Saving image under self assessment document id: "+vsd.getVisitAssessmentDocumentId());
                Path fileLocation=fileUtility.saveSelfAssessmentImages(document,vsd.getVisitAssessmentDocumentId(),imageList.indexOf(document));
                VisitAssessmentFiles vsf = new VisitAssessmentFiles();
                vsf.setName(document.getOriginalFilename());
                vsf.setDocumentPath(fileLocation.toString());
                vsf.setType(document.getContentType());
                vsf.setVisitAssessmentDocument(vsd);
                VisitAssessmentFiles persist = filesRepository.save(vsf);
                LOGGER.info("Document details saved successfully by id: "+persist.getVisitAssessmentFileId());
                savedFilesList.add(persist);

            } catch (Exception e) {
                LOGGER.error("Error: "+e.getMessage());
                throw new RuntimeException(e);
            }
        });
        return savedFilesList;
    }
}
