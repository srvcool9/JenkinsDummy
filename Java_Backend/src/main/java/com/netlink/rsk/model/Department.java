package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

/**
 * $table.getTableComment()
 */
@Data
@Entity
@Table(name = "Department", catalog = "Dbo")
public class Department implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "DeptiD", nullable = false)
    private Integer deptID;

    @Column(name = "Deptname")
    private String deptName;

    @Column(name = "ManageriD")
    private Integer managerID;

    @Column(name = "ParentdeptiD")
    private Integer parentDeptID;

    @Column(name = "Userid")
    private Integer userId;

    @Column(name = "Validfrom", nullable = false)
    private Date validFrom;

    @Column(name = "Validto", nullable = false)
    private Date validTo;

    @Column(name = "Webaddress", nullable = false)
    private String webAddress;

}
