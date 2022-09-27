package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "Trainerattendanceverification",catalog = "Training")
public class TrainerAttendanceVerification implements Serializable {

    @Id
    @Column(name = "Trainerverificationid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trainerVerificationId;

    @OneToOne
    @JoinColumn(name="Trainerattendanceid",referencedColumnName = "Trainerattendanceid")
    private TrainerAttendance trainerAttendance;

    @OneToOne
    @JoinColumn(name="Trainerid",referencedColumnName = "Trainerid")
    private TrainerMaster trainer;

    @OneToOne
    @JoinColumn(name="Batchid",referencedColumnName = "Batchid")
    private BatchMaster batch;

    @Column(name="Verify")
    private Boolean verify;

    @Column(name="Verificationremark")
    private String verificationRemark;

    @Column(name="Rating")
    private Integer rating;

    @Column(name="Ratingremark")
    private String  ratingRemark;

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
