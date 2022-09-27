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
@Table(name = "Rolemenupermission",catalog = "Dbo")
public class RoleMenuPermission implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Rolemenupermissionid", nullable = false)
    private Long roleMenuPermissionId;

    @Column(name = "Roleid", nullable = false)
    private Integer roleId;

    @Column(name = "Roletypeid", nullable = false)
    private Integer roleTypeId;

    @Column(name = "Menuid", nullable = false)
    private Integer menuId;

    @Column(name = "View")
    private Boolean view;

    @Column(name = "Add")
    private Boolean add;

    @Column(name = "Edit")
    private Boolean edit;

    @Column(name = "Delete")
    private Boolean delete;

    @Column(name = "Createdby")
    private Integer createdBy;

    @Column(name = "Createdon")
    private Date createdOn;

    @Column(name = "Updatedby")
    private Integer updatedBy;

    @Column(name = "Updatedon")
    private Date updatedOn;

}
