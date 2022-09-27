package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import net.bytebuddy.dynamic.loading.InjectionClassLoader;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Trainingmaster", catalog = "Training")
public class Training implements Serializable {

    @Id
    @Column(name="Trainingid",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trainingId;

    @ManyToOne
    @JsonIgnoreProperties(value ={"group","trainingList"})
    @JoinColumn(name = "Subgroupid", nullable = false)
    private TrainingSubGroupMaster subGroupId;

    @Column(name="Trainingname", nullable = false)
    private String trainingName;

    @Column(name="Description")
    private String description;

    @OneToOne
    @JoinColumn(name="Traininglevelid", referencedColumnName = "id")
    private EntityMaster trainingLevelId;

    @Column(name="Approxtrainees")
    private Integer approxTrainees;

    @Column(name="Startdate", nullable = false)
    private Date startDate;

    @Column(name="Enddate", nullable = false)
    private Date endDate;

    @Column(name="Noofdays")
    private Integer noOfDays;

    @Column(name="Minimumtrainer")
    private Integer minimumTrainer;

    @Column(name="Maximumbatchsize")
    private Integer maximumBatchSize;

    @Column(name="Isactive")
    private Boolean isActive;

    @OneToOne
    @JoinColumn(name="Status", referencedColumnName = "id")
    private EntityMaster status;

    @OneToOne
    @JoinColumn(name="Initiatetrainingstatus", referencedColumnName = "id")
    private EntityMaster initiateTrainingStatus;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name="Createdby", referencedColumnName = "Userid")
    private UserMaster createdBy;

    @Column(name="Createdon")
    private Date createdOn;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name="Updatedby", referencedColumnName = "Userid")
    private UserMaster updatedBy;

    @Column(name="Updatedon")
    private Date updatedOn;

    @JsonIgnore
    @OneToMany(mappedBy = "trainingId")
    @JsonIgnoreProperties(value = "trainingId")
    private List<TrainingMaterial> materialList;

    @JsonIgnore
    @OneToMany(mappedBy = "training")
    @JsonIgnoreProperties(value = "training")
    private List<TrainingArea> trainingAreaList;

    //Usage: Trainee assessment attempt record.
    @Transient
    private Long traineeId;

    @Transient
    private TrainingGroupMaster group;


}
