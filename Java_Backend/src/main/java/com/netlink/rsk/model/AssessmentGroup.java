package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Groupmaster" ,catalog = "Assessment")
public class AssessmentGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Groupid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupId;

    @Column(name = "Groupname")
    private String groupName;

    @Column(name = "Description")
    private String description;

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

    @OneToMany(mappedBy = "group")
    @JsonIgnoreProperties(value = "group")
    private List<AssessmentMaster> assessmentList;
}
