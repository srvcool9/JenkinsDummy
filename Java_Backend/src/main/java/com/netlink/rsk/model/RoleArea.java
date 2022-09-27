package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * $table.getTableComment()
 */
@Data
@Entity
@Table(name = "Rolearea",catalog = "Dbo")
public class RoleArea implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Roleareaid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleAreaId;

    @Column(name = "Roleassignmentid")
    private Integer roleAssignmentId;

    @Column(name = "Stateid")
    private Integer stateId;

    @Column(name = "Divisionid")
    private Integer divisionId;

    @Column(name = "Districtid")
    private String districtId;

    @Column(name = "Blockid")
    private String blockId;

    @Column(name = "Clusterid")
    private String clusterId;

    @Column(name = "Schoolid")
    private String schoolId;

    @Column(name = "Createdby")
    private Integer createdBy;

    @Column(name = "Createdon")
    private Date createdOn;

    @Column(name = "Updatedby")
    private Integer updatedBy;

    @Column(name = "Updatedon")
    private Date updatedOn;

}
