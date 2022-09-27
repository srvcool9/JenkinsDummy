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
@Table(name = "Rolemaster",catalog = "Dbo")
public class RoleMaster implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "RoleiD", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleID;

    @OneToOne
    @JoinColumn(name = "Roletypeid", referencedColumnName = "Roletypeid")
    private RoleTypeMaster roleTypeId;

    @Column(name = "Rolename", nullable = false)
    private String roleName;

    @Column(name = "Roledescription")
    private String roleDescription;

    @Column(name = "Isactive")
    private Boolean isActive;

    @Column(name = "Createdby")
    private Integer createdBy;

    @Column(name = "Createdon")
    private Date createdOn;

    @Column(name = "Updatedby")
    private Integer updatedBy;

    @Column(name = "Updatedon")
    private Date updatedOn;

}
