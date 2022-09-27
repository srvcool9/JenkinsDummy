package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Assessment", catalog = "Visit")
public class VisitAssessment implements Serializable {

    @Id
    @Column(name = "Assessmentid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long visitAssessmentId;


    @OneToOne
    @JoinColumn(name="UDISEcode", referencedColumnName = "UDISEcode")
    private SchoolMaster udiseCode;

    @Column(name = "Year")
    private Long year;

    @OneToMany(mappedBy = "assessment")
    @JsonIgnoreProperties(value = "assessment")
    private List<VisitAssessmentParameters> parametersList;

    @OneToMany(mappedBy = "assessment")
    @JsonIgnoreProperties(value = "assessment")
    private List<VisitAssessmentDocument> documentList;

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
