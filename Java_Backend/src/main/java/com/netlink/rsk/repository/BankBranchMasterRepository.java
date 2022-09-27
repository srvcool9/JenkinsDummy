package com.netlink.rsk.repository;

import com.netlink.rsk.model.BankBranchMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface BankBranchMasterRepository extends JpaRepository<BankBranchMaster, Long>, JpaSpecificationExecutor<BankBranchMaster> {
      public BankBranchMaster findByIFSCCode(String ifsc);
}