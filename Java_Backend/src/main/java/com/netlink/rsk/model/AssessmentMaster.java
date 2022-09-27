package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.netlink.rsk.dto.ClassDTO;
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
@Table(name = "Assessmentmaster", catalog ="Assessment" )
public class AssessmentMaster implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Assessmentid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assessmentId;

    @Column(name = "Assessmentname", nullable = false)
    private String assessmentName;

    @ManyToOne(cascade=CascadeType.DETACH)
    @JoinColumn(name = "Groupid")
    private GroupMaster group;

    @OneToOne
    @JoinColumn(name = "Criteriaid", referencedColumnName = "id")
    private EntityMaster criteria;

    @OneToOne
    @JoinColumn(name = "Typeid", referencedColumnName = "id")
    private EntityMaster typeId;

    @Column(name = "Startdate")
    private Date startDate;

    @Column(name = "Enddate")
    private Date endDate;

    @OneToOne
    @JoinColumn(name = "Enumeratorid", referencedColumnName = "id")
    private EntityMaster enumerator;

    @Column(name = "Classid", nullable = false)
    private String classList;

    @OneToOne
    @JoinColumn(name = "Modeid", referencedColumnName = "id")
    private EntityMaster modeId;

    @Column(name = "Isactive")
    private Boolean isActive;

    @OneToOne
    @JoinColumn(name = "Roletypeid", referencedColumnName = "id")
    private EntityMaster roleTypeId;

    @OneToOne
    @JoinColumn(name = "Schooltypeid", referencedColumnName = "id")
    private EntityMaster schoolTypeId;

    @Column(name = "Minstudents")
    private Integer minStudents;

    @Column(name = "Ruralratio")
    private Integer ruralRatio;

    @Column(name = "Urbanratio")
    private Integer urbanRatio;

    @Column(name = "Createdby")
    private Integer createdBy;

    @Column(name = "Createdon")
    private Date createdOn;

    @Column(name = "Updatedby")
    private Integer updatedBy;

    @Column(name = "Updatedon")
    private Date updatedOn;

    @Column(name = "Description")
    private String description;

    @Column(name = "numberofschool")
    private Integer numberOfSchool;

    @Transient
    private List<ClassDTO> classes;
}
