package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Time;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Batchmaster",catalog = "Training")
public class BatchMaster implements Serializable {

    @Id
    @Column(name = "Batchid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long batchId;

    @OneToOne
    @JoinColumn(name="Trainingid", referencedColumnName = "Trainingid")
    private Training training;

    @OneToOne
    @JoinColumn(name="Trainingareaid", referencedColumnName = "Trainingareaid")
    private TrainingArea trainingArea;

    @Column(name = "Batchnumber")
    private Integer batchNumber;

    @Column(name = "Venue")
    private String venue;

    @Column(name = "Address")
    private String address;

    @Column(name = "Startdate")
    private Date startDate;

    @Column(name = "Enddate")
    private Date endDate;

    @Column(name = "Starttime")
    private Time startTime;

    @Column(name = "Endtime")
    private Time endTime;

    @OneToOne
    @JoinColumn(name="Launchstatus", referencedColumnName = "id")
    private EntityMaster launchStatus;

    @Column(name="Launchdate")
    private Date launchDate;

    @Column(name = "Createdby")
    private Integer createdBy;

    @Column(name = "Createdon")
    private Date createdOn;

    @Column(name = "Updatedby")
    private Integer updatedBy;

    @Column(name = "Updatedon")
    private Date updatedOn;

    @OneToMany(mappedBy = "batchId")
    @JsonIgnoreProperties(value = "batchId")
    private List<MonitorPhotos> monitorPhotosList;

    @OneToOne
    @JoinColumn(name="Trainertype", referencedColumnName = "id")
    private EntityMaster trainerType;

    @Column(name = "Checklistid")
    private Long checkListId;
}
