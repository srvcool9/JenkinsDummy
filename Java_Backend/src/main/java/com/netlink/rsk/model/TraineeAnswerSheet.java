package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "Traineeanswersheet",catalog = "Training")
public class TraineeAnswerSheet implements Serializable {

    @Id
    @Column(name = "Traineeanswersheetid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long traineeAnswerSheetId;


    @OneToOne
    @JoinColumn(name="Traineeid",referencedColumnName = "Traineeid")
    private Trainee trainee;

    @OneToOne
    @JoinColumn(name="Trainingid",referencedColumnName = "Trainingid")
    private Training training;

    @OneToOne
    @JoinColumn(name="Questionid",referencedColumnName = "Questionid")
    private QuestionMaster question;

    @OneToOne
    @JoinColumn(name="Status",referencedColumnName = "id")
    private EntityMaster status;


    @Column(name = "Answer")
    private String answer;

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
