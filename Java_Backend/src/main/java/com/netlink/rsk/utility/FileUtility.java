package com.netlink.rsk.utility;

import com.netlink.rsk.constants.StaticResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Component
public class FileUtility {

    private static final Logger logger = LogManager.getLogger(FileUtility.class);
    private final Path fileStorageLocation;
    private final Path monitorPisPathLocation;
    private final Path selfAssessmentDocsPath;
    private final Path selfAssessmentImagesPath;
    public String fileName;

    /* User below constructor for server  */
    @Autowired
    public FileUtility(@Value("${file.uploadDir}") String uploadDir
            ,@Value("${file.uploadMonitorPhotos}") String monitorPicsDir,
                       @Value("${file.uploadSelfAssessmentDocs}") String selfAssessmentDocsDir,
                       @Value("${file.uploadSelfAssessmentPhotos}") String selfAssessmentImagesDir
    ) throws Exception {
        String rootPath = System.getenv("CATALINA_HOME");
        rootPath = rootPath + File.separator +uploadDir;
        this.fileStorageLocation = Paths.get(rootPath).toAbsolutePath().normalize();
       String monitorPicsPath=System.getenv("CATALINA_HOME") + File.separator +monitorPicsDir;
       this.monitorPisPathLocation=Paths.get(monitorPicsPath).toAbsolutePath().normalize();
        String selfAssessmentDocs=System.getenv("CATALINA_HOME") + File.separator +selfAssessmentDocsDir;
       this.selfAssessmentDocsPath=Paths.get(selfAssessmentDocs).toAbsolutePath().normalize();
       String selfAssessmentImages=System.getenv("CATALINA_HOME") + File.separator +selfAssessmentImagesDir;
       this.selfAssessmentImagesPath=Paths.get(selfAssessmentImages).toAbsolutePath().normalize();
        logger.info("FOR Upload file FinalPath: "+this.fileStorageLocation);
        logger.info("FOR Upload monitor pics path FinalPath: "+this.monitorPisPathLocation);
        logger.info("FOR Upload self assessment docs path FinalPath: "+this.selfAssessmentDocsPath);
        logger.info("FOR Upload self assessment images path FinalPath: "+this.selfAssessmentImagesPath);
        try {
            Files.createDirectories(this.fileStorageLocation);
            Files.createDirectories(this.monitorPisPathLocation);
            Files.createDirectories(this.selfAssessmentDocsPath);
            Files.createDirectories(this.selfAssessmentImagesPath);
        } catch (Exception ex) {
            throw new Exception("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    /* Use below constructor for local system  */
//    @Autowired
//    public FileUtility(@Value("${file.localSystemPath}") String uploadDir) throws Exception {
//        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
//        logger.info("FOR Upload file FinalPath: "+this.fileStorageLocation);
//        try {
//            Files.createDirectories(this.fileStorageLocation);
//        } catch (Exception ex) {
//            throw new Exception("Could not create the directory where the uploaded files will be stored.", ex);
//        }
//    }

    public void save(MultipartFile file) throws Exception {
        fileName = StringUtils.cleanPath(file.getOriginalFilename());
        if (fileName.contains("..")) {
            logger.info("Error : Incorrect file type");
            throw new Exception(StaticResponse.INVALID_FILE + fileName);
        }
        try {
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            logger.info("Saving file over location: "+targetLocation.toString());
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            logger.info("File saved successfully over server");
        } catch (Exception e) {
            throw new RuntimeException(StaticResponse.FILE_ALREADY_EXIST);
        }
    }

    public void saveMonitorPics(MultipartFile file,Long batchId) throws Exception {
        String prefix= "Batch_Id_";
        fileName = prefix+batchId+"_"+StringUtils.cleanPath(file.getOriginalFilename());
        if (fileName.contains("..")) {
            logger.info("Error : Incorrect file type");
            throw new Exception(StaticResponse.INVALID_FILE + fileName);
        }
        try {
            Path targetLocation = this.monitorPisPathLocation.resolve(fileName);
            logger.info("Saving file over location: "+targetLocation.toString());
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            logger.info("File saved successfully over server");
        } catch (Exception e) {
            throw new RuntimeException(StaticResponse.FILE_ALREADY_EXIST);
        }
    }

    public Path saveSelfAssessmentDocs(MultipartFile file,Long assessmentId,Integer index) throws Exception {
        String prefix= "Assessment_Id_";
        fileName = prefix+assessmentId+"_i"+index+"_"+StringUtils.cleanPath(file.getOriginalFilename());
        if (fileName.contains("..")) {
            logger.info("Error : Incorrect file type");
            throw new Exception(StaticResponse.INVALID_FILE + fileName);
        }
        try {
            Path targetLocation = this.selfAssessmentDocsPath.resolve(fileName);
            logger.info("Saving file over location: "+targetLocation.toString());
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            logger.info("File saved successfully over server");
            return targetLocation;
        } catch (Exception e) {
            throw new RuntimeException(StaticResponse.FILE_ALREADY_EXIST);
        }
    }

    public Path saveSelfAssessmentImages(MultipartFile file,Long assessmentId,Integer index) throws Exception {
        String prefix= "Assessment_Id_";
        fileName = prefix+assessmentId+"_i"+index+"_"+StringUtils.cleanPath(file.getOriginalFilename());
        if (fileName.contains("..")) {
            logger.info("Error : Incorrect file type");
            throw new Exception(StaticResponse.INVALID_FILE + fileName);
        }
        try {
            Path targetLocation = this.selfAssessmentImagesPath.resolve(fileName);
            logger.info("Saving file over location: "+targetLocation.toString());
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            logger.info("File saved successfully over server");
            return targetLocation;
        } catch (Exception e) {
            throw new RuntimeException(StaticResponse.FILE_ALREADY_EXIST);
        }
    }

    public Path getRoot(String filename) {
        Path file = this.fileStorageLocation.resolve(filename);
        return file;
    }

    public Path getMonitorPicsRoot(String filename) {
        Path file = this.monitorPisPathLocation.resolve(filename);
        return file;
    }

    public Resource download(String filename) {
        Resource resource=null;
        try {
            String words[] = filename.split(" ");
            for(String word : words) {
                Character initial= word.charAt(0);
                Character c= 'T';
                if(initial.equals(c)){
                    Path file = Paths.get(String.valueOf(this.fileStorageLocation))
                            .resolve(filename);
                    resource = new UrlResource(file.toUri());
                }else{
                    Path file = Paths.get(String.valueOf(this.fileStorageLocation))
                            .resolve(filename);
                    resource = new UrlResource(file.toUri());
                }
            }

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException(StaticResponse.NON_READABLE_FILE);
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException(StaticResponse.ERROR + e.getMessage());
        }
    }

    public static Boolean deleteFileViaPath(String path) throws Exception {
        File file
                = new File(path);
        logger.info("Deleting document from path:"+ path);
        if (file.delete()) {
            return true;
        }
        else {
            throw new Exception("File not deleted");
        }
    }

}
