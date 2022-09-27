package com.netlink.rsk.model;

import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "Monitorquestions", catalog = "Training")
public class MonitorQuestions implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Monitorquestionid", nullable = false)
    private Long monitorQuestionId;

    @OneToOne
    @JoinColumn(name="Trainingid", referencedColumnName = "Trainingid")
    private Training training;

    @Column(name = "Question")
    private String question;

    @Column(name = "Createdby")
    private Integer createdBy;

    @Column(name = "Createdon")
    private Date createdOn;

    @Column(name = "Updatedby")
    private Integer updatedBy;

    @Column(name = "Updatedon")
    private Date updatedOn;
}
