package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * $table.getTableComment()
 */
@Data
@Entity
@Table(name = "Userrole",catalog = "Dbo")
public class UserRole implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Userroleid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userRoleID;

    @Column(name = "Userid")
    private Integer userId;

    @Column(name = "Roleid", nullable = false)
    private Integer roleId;

    @Column(name = "Isactive", nullable = false)
    private Boolean isActive;

    @Column(name = "Createdby")
    private Integer createdBy;

    @Column(name = "Createdon")
    private Date createdOn;

    @Column(name = "Updatedby")
    private Integer updatedBy;

    @Column(name = "Updatedon")
    private Date updatedOn;

    @ManyToOne
    @JoinColumn(name = "Userid", nullable = false,insertable = false,updatable = false)
    @JsonBackReference(value = "userMaster")
    private UserMaster user;

}
