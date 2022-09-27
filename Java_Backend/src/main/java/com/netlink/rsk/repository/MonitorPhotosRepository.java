package com.netlink.rsk.repository;

import com.netlink.rsk.model.MonitorPhotos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface MonitorPhotosRepository extends JpaRepository<MonitorPhotos,Long>, JpaSpecificationExecutor<MonitorPhotos> {
}
