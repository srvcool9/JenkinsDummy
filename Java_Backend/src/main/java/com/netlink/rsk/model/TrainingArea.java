package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Trainingarea", catalog = "Training")
public class TrainingArea implements Serializable  {

    @Id
    @Column(name="Trainingareaid",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trainingAreaId;


    @ManyToOne
    @JoinColumn(name = "Trainingid")
    private Training training;

    @OneToOne
    @JoinColumn(name="Trainingtypeid", referencedColumnName = "id")
    private EntityMaster trainingTypeId;

    @Column(name="Areaid")
    private Long areaId;

    @OneToOne
    @JoinColumn(name="Status", referencedColumnName = "id")
    private EntityMaster status;

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

    @Transient
    private Object trainingArea;
}






















































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































