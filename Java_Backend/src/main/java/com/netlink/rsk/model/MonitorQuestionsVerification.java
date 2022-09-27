package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "Monitorquestionsverification", catalog = "Training")
public class MonitorQuestionsVerification implements Serializable {

    @Id
    @Column(name = "Questionverificationid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionVerificationId;

    @OneToOne
    @JoinColumn(name="Monitorquestionid", referencedColumnName = "Monitorquestionid")
    private MonitorQuestions monitorQuestions;

    @OneToOne
    @JoinColumn(name="Trainingid",referencedColumnName = "Trainingid")
    private Training training;

    @OneToOne
    @JoinColumn(name="Trainerid",referencedColumnName = "Trainerid")
    private TrainerMaster trainerMaster;

    @OneToOne
    @JoinColumn(name="Batchid",referencedColumnName = "Batchid")
    private BatchMaster batchMaster;

    @Column(name="Answer")
    private Boolean answer;

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
