package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "Assessmentfiles", catalog = "Visit")
public class VisitAssessmentFiles implements Serializable {

    @Id
    @Column(name = "Assessmentfilesid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long visitAssessmentFileId;

    @ManyToOne
    @JoinColumn(name = "Assessmentdocumentid")
    private VisitAssessmentDocument visitAssessmentDocument;

    @Column(name = "Name")
    private String name;

    @Column(name = "Type")
    private String type;


    @Column(name = "Imagepath")
    private String imagePath;

    @Column(name = "Documentpath")
    private String documentPath;

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
