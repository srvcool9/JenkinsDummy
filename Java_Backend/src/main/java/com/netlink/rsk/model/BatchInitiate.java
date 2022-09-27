package com.netlink.rsk.model;

import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "Batchinitiate",catalog = "Training")
public class BatchInitiate implements Serializable {

    @Id
    @Column(name = "Batchinitiateid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long batchinitiateId;

    @OneToOne
    @JoinColumn(name="Trainingid", referencedColumnName = "Trainingid")
    private Training training;

    @OneToOne
    @JoinColumn(name="Trainingareaid", referencedColumnName = "Trainingareaid")
    private TrainingArea trainingArea;

    @Column(name = "Maxbatchsize")
    private Integer maxBatchSize;

    @OneToOne
    @JoinColumn(name = "Trainertypeid", referencedColumnName = "id")
    private EntityMaster trainerType;

    @Column(name = "Tentitiveparticipants")
    private Integer tentitiveParticipants;

    @Column(name = "Noofrooms")
    private Integer noOfRooms;

    @Column(name = "Calculatedbatch")
    private Integer calculatedBatch;

    @Column(name = "Cycle")
    private Integer cycle;

    @Column(name = "Createdby")
    private Integer createdBy;

    @Column(name = "Createdon")
    private Date createdOn;

    @Column(name = "Updatedby")
    private Integer updatedBy;

    @Column(name = "Updatedon")
    private Date updatedOn;



}
