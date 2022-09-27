package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "Traineeattendanceverification",catalog = "Training")
public class TraineeAttendanceVerification implements Serializable {

    @Id
    @Column(name = "Traineeverificationid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long traineeAttendanceId;

    @OneToOne
    @JoinColumn(name="Traineeattendanceid",referencedColumnName = "Traineeattendanceid")
    private TraineeAttendance traineeAttendance;

    @Column(name="Verify")
    private Boolean verify;

    @Column(name="Verificationremark")
    private String verificationRemark;

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
