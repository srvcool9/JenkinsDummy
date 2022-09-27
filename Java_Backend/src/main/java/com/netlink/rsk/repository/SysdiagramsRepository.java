package com.netlink.rsk.repository;

import com.netlink.rsk.model.Sysdiagrams;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SysdiagramsRepository extends JpaRepository<Sysdiagrams, Long>, JpaSpecificationExecutor<Sysdiagrams> {

}