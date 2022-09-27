package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Quizmaster", catalog = "Training")
public class QuizMaster implements Serializable {

    @Id
    @Column(name="Quizid",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quizId;

    @OneToOne
    @JoinColumn(name="Trainingid", referencedColumnName = "Trainingid")
    private Training trainingId;

    @OneToOne
    @JoinColumn(name="Quiztypeid", referencedColumnName = "id")
    private EntityMaster quizTypeId;

    @Column(name="Day")
    private Integer day;

    @Column(name="Noofquestions")
    private Integer noOfQuestions;

    @OneToOne
    @JoinColumn(name="Createdby", referencedColumnName = "Userid")
    private UserMaster createdBy;

    @Column(name="Createdon")
    private Date createdOn;

    @OneToOne
    @JoinColumn(name="Updatedby", referencedColumnName = "Userid")
    private UserMaster updatedBy;

    @Column(name="Updatedon")
    private Date updatedOn;

    @OneToMany(mappedBy = "quizId",cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value = "quizId")
    private List<QuestionMaster> questions;
}
