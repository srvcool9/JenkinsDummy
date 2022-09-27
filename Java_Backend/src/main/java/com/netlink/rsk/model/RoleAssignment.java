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
@Table(name = "Roleassignment",catalog = "Dbo")
public class RoleAssignment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Roleassignmentid", nullable = false)
    private Long roleAssignmentId;

    @Column(name = "Roleid")
    private Integer roleId;

    @Column(name = "Roletypeid")
    private Integer roleTypeId;

    @Column(name = "Createdby")
    private Integer createdBy;

    @Column(name = "Createdon")
    private Date createdOn;

    @Column(name = "Updatedby")
    private Integer updatedBy;

    @Column(name = "Updatedon")
    private Date updatedOn;

    @Column(name = "Userid")
    private Integer userId;

}
