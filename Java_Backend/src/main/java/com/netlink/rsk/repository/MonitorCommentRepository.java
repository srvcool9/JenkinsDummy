package com.netlink.rsk.repository;

import com.netlink.rsk.model.MonitorComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface MonitorCommentRepository extends JpaRepository<MonitorComment,Long>, JpaSpecificationExecutor<MonitorComment> {
}
