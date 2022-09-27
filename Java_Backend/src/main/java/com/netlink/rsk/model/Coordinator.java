package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "Coordinator", catalog = "Training")
public class Coordinator implements Serializable {
    @Id
    @Column(name = "Coordinatorid", nullable=false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long coordinatorId;

    @OneToOne
    @JoinColumn(name="Empcode", referencedColumnName = "Employeecode")
    private EmployeeMaster empCode;


    @OneToOne
    @JoinColumn(name="Batchid", referencedColumnName = "Batchid")
    private BatchMaster batch;

    @Column(name = "Createdby")
    private Integer createdBy;

    @Column(name = "Createdon")
    private Date createdOn;

    @Column(name = "Updatedby")
    private Long updatedBy;

    @Column(name = "Updatedon")
    private Date updatedOn;

}
