package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IMonitorPhotos {

    public Response uploadPhotos(List<MultipartFile> files,Long batchId);
}
