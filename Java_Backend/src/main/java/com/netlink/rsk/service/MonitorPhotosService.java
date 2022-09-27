package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.BatchMaster;
import com.netlink.rsk.model.EnumeratorRegistration;
import com.netlink.rsk.model.MonitorPhotos;
import com.netlink.rsk.repository.MonitorPhotosRepository;
import com.netlink.rsk.utility.FileUtility;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Access;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@Service
public class MonitorPhotosService implements IMonitorPhotos {

    @Autowired
    private FileUtility fileUtility;

    @Autowired
    private MonitorPhotosRepository monitorPhotosRepository;

    private List<MonitorPhotos> monitorPhotosList;
    private String text="Monitor Photos";
    private static final Logger LOGGER = LogManager.getLogger(MonitorPhotosService.class);

    @Override
    public Response uploadPhotos(List<MultipartFile> files,Long batchId) {

        if(files.isEmpty()==false){
            monitorPhotosList= new ArrayList<>();
            files.forEach(file->{
                try {
                    fileUtility.saveMonitorPics(file,batchId);
                    MonitorPhotos monitorPhotos = new MonitorPhotos();
                    monitorPhotos.setPhotoName(file.getOriginalFilename());
                    Path filePath= fileUtility.getMonitorPicsRoot(file.getOriginalFilename());
                    monitorPhotos.setPath(filePath.toString());
                    BatchMaster batchMaster= new BatchMaster();
                    batchMaster.setBatchId(batchId);
                    monitorPhotos.setBatchId(batchMaster);
                    MonitorPhotos persist= monitorPhotosRepository.save(monitorPhotos);
                    monitorPhotosList.add(persist);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            });
            return new Response(StaticResponse.SUCCESS_Status,StaticResponse.FILE_SAVED,monitorPhotosList);
        }
        LOGGER.error("No image found to save...");
        return  new Response(StaticResponse.FAILURE_Status,StaticResponse.NO_DATA,null);
    }
}
