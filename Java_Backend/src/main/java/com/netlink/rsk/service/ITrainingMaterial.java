package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.TrainingMaterial;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ITrainingMaterial {
    public Response saveTrainingDocuments(List<TrainingMaterial> trainingMaterials, List<MultipartFile> files) throws Exception;
    public Response getTrainingMaterialData(Long id);
    public Response fetchByTrainingId(Long id);
    public Response deleteMaterial(Long id);
}

