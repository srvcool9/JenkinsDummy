package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.VisitAssessmentDocument;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IAssessmentDocumentFiles {
  public Response saveDocumentsFiles(VisitAssessmentDocument visitAssessmentDocument,
                                     List<MultipartFile> docList,List<MultipartFile> imageList) throws Exception;

}
