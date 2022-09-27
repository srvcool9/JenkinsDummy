package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * $table.getTableComment()
 */
@Data
@Entity
@Table(name = "Usermaster",catalog = "Dbo")
public class UserMaster implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Userid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "Loginid", nullable = false)
    private String loginId;

    @Column(name = "Password", nullable = false)
    private String password;

    @OneToOne
    @JoinColumn(name = "Empcode", referencedColumnName = "Employeecode")
    private EmployeeMaster empCode;

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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "userMaster")
    private List<UserRole> userRoleList;
}
