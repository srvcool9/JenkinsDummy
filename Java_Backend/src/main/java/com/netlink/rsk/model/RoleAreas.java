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
@Table(name = "Roleareas",catalog = "Dbo")
public class RoleAreas implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Roleareaid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleAreaId;

    @Column(name = "Roleassignmentid")
    private Integer roleAssignmentId;

    @Column(name = "Roletypeid")
    private Integer roleTypeId;

    @Column(name = "Areaid")
    private Integer areaId;

    @Column(name = "Areaname")
    private String areaName;

    @Column(name = "Createdby")
    private Integer createdBy;

    @Column(name = "Createdon")
    private Date createdOn;

    @Column(name = "Updatedby")
    private Integer updatedBy;

    @Column(name = "Updatedon")
    private Date updatedOn;

}
