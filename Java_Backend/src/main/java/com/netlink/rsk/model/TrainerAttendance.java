package com.netlink.rsk.model;

import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "Trainerattendance",catalog = "Training")
public class TrainerAttendance implements Serializable {

    @Id
    @Column(name = "Trainerattendanceid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trainerAttendanceId;

    @OneToOne
    @JoinColumn(name="Batchid",referencedColumnName = "Batchid")
    private BatchMaster batch;

    @Column(name = "Session")
    private String session;

    @OneToOne
    @JoinColumn(name = "Trainerid",referencedColumnName = "Trainerid")
    private TrainerMaster trainerMaster;

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
