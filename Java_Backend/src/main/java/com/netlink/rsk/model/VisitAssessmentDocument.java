package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Assessmentdocument", catalog = "Visit")
public class VisitAssessmentDocument implements Serializable {

    @Id
    @Column(name = "Assessmentdocumentid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long visitAssessmentDocumentId;

    @OneToOne
    @JoinColumn(name="Sectionid", referencedColumnName = "Sectionid")
    private SectionMaster section;

    @ManyToOne
    @JoinColumn(name = "Assessmentid")
    private VisitAssessment assessment;

    @OneToMany(mappedBy = "visitAssessmentDocument")
    @JsonIgnoreProperties(value = "visitAssessmentDocument")
    private List<VisitAssessmentFiles> filesList;

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
