package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "Traineeattendance",catalog = "Training")
public class TraineeAttendance implements Serializable {

    @Id
    @Column(name = "Traineeattendanceid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trainingAttendanceId;

    @OneToOne
    @JoinColumn(name="Batchid",referencedColumnName = "Batchid")
    private BatchMaster batch;

    @Column(name = "Session")
    private String session;

    @OneToOne
    @JoinColumn(name = "Traineeid",referencedColumnName = "Traineeid")
    private Trainee trainee;

    @Column(name = "Attendance")
    private Boolean attendance;

    @Column(name = "Remark")
    private String remark;

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
