package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Trainermaster",catalog = "Training")
public class TrainerMaster implements Serializable {

    @Id
    @Column(name = "Trainerid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trainerId;

    @Column(name = "Trainername")
    private String trainerName;

    @Column(name = "Mobile")
    private String mobile;

    @Column(name = "Email")
    private String email;

    @Column(name = "Organizationname")
    private String organizationName;

    @Column(name = "Aadharno")
    private String aadharNo;

    @OneToOne
    @JoinColumn(name = "Bankid", referencedColumnName = "Bankid")
    private BankMaster bankId;

    @Column(name = "Ifsccode")
    private String IFSCcode;

    @Column(name = "Bankaccountno")
    private String bankAccountNo;

    @Column(name = "Acountholder")
    private String acountHolder;

    @OneToOne
    @JoinColumn(name = "Trainertype", referencedColumnName = "id")
    private EntityMaster trainerType;


    @OneToMany(mappedBy = "trainer")
    @JsonIgnoreProperties(value = "trainer")
    private List<TrainerBatch> trainerBatches;

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
