package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "Scoringweightage", catalog = "Training")
public class ScoringWeightage implements Serializable {

    @Id
    @Column(name = "Scoringweightageid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ScoringWeightageId;

    @Column(name = "Academic")
    private Integer academic;

    @Column(name = "Administration")
    private Integer administration;

    @Column(name = "Infrastructure")
    private Integer infrastructure;

    @Column(name = "Overallweightage")
    private Integer overAllWeightage;

    @OneToOne
    @JoinColumn(name = "Createdby", referencedColumnName = "Userid")
    private UserMaster createdBy;

    @Column(name = "Createdon")
    private Date createdOn;

    @OneToOne
    @JoinColumn(name = "Updatedby", referencedColumnName = "Userid")
    private UserMaster updatedBy;

    @Column(name = "Updatedon")
    private Date updatedOn;

}
