package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

/**
 * $table.getTableComment()
 */
@Data
@Entity
@Table(name = "Roleassociationtype",catalog = "Dbo")
public class RoleAssociationType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Userid")
    private Integer userId;

    @Column(name = "Roleid")
    private Integer roleId;

    @Column(name = "Rolename")
    private String roleName;

    @Column(name = "Roletypeid")
    private Integer roleTypeId;

    @Column(name = "Roletypename")
    private String roleTypeName;

    @Column(name = "Areaid")
    private Integer areaId;

    @Column(name = "Areaname")
    private String areaName;

    @Column(name = "Isactive")
    private Boolean isActive;

    @Column(name = "Loginuserid")
    private Integer loginUserId;

}
