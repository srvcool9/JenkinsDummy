package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "AssessmentParameter", catalog = "Visit")
public class VisitAssessmentParameters implements Serializable {

    @Id
    @Column(name = "Visitassessmentparameterid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long visitAssessmentParameterId;

    @OneToOne
    @JoinColumn(name = "Parameterid", referencedColumnName = "Parameterid")
    private Parameter parameterId;

    @ManyToOne
    @JoinColumn(name = "Assessmentid")
    private VisitAssessment assessment;

    @Column(name = "Rating")
    private Integer rating;

    @Column(name = "Comment")
    private String comment;

    @OneToOne
    @JoinColumn(name="Createdby", referencedColumnName = "Userid")
    private UserMaster createdBy;

    @Column(name="Createdon")
    private Date createdOn;

    @OneToOne
    @JoinColumn(name="Updatedby", referencedColumnName = "Userid")
    private UserMaster updatedBy;

    @Column(name="Updatedon")
    private Date updatedOn;

}
