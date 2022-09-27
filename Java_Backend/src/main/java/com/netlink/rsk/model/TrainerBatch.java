package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Trainerbatch",catalog = "Training")
public class TrainerBatch implements Serializable {

    @Id
    @Column(name = "Trainerbatchid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trainerBatchId;

    @ManyToOne(cascade=CascadeType.DETACH)
    @JoinColumn(name = "Trainerid")
    private TrainerMaster trainer;

    @ManyToOne(cascade=CascadeType.DETACH)
    @JoinColumn(name = "Batchid")
    private BatchMaster batch;

    @Column(name = "Isactive")
    private Boolean isActive;

    @Column(name = "Createdby")
    private Integer createdBy;

    @Column(name = "Createdon")
    private Date createdOn;

    @OneToOne
    @JoinColumn(name = "Updatedby", referencedColumnName = "Userid")
    private UserMaster updatedBy;

    @Column(name = "Updatedon")
    private Date updatedOn;
}
