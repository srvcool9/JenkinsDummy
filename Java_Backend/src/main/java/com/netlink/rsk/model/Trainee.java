package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "Trainee", catalog = "Training")
public class Trainee {
    @Id
    @Column(name = "Traineeid", nullable=false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long traineeId;

    @OneToOne
    @JoinColumn(name = "Empcode", referencedColumnName = "Employeecode")
    private EmployeeMaster empCode;

    @OneToOne
    @JoinColumn(name = "Batchid", referencedColumnName = "Batchid")
    private BatchMaster batchId;

    @Column(name = "Createdby")
    private Integer createdBy;

    @Column(name = "Createdon")
    private Date createdOn;

    @Column(name = "Updatedby")
    private Long updatedBy;

    @Column(name = "Updatedon")
    private Date updatedOn;

}
