package com.netlink.rsk.repository;

import com.netlink.rsk.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DepartmentRepository extends JpaRepository<Department, Integer>, JpaSpecificationExecutor<Department> {

}