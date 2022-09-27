package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "Questionmaster", catalog = "Training")
public class QuestionMaster implements Serializable {

    @Id
    @Column(name="Questionid",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @ManyToOne
    @JoinColumn(name = "Quizid", nullable = false)
    private QuizMaster quizId;
    
    @Column(name = "Displayorder")
    private Integer displayOrder;

    @Column(name = "Question")
    private String question;

    @Column(name = "Option1")
    private String option1;

    @Column(name = "Option2")
    private String option2;

    @Column(name = "Option3")
    private String option3;

    @Column(name = "Option4")
    private String option4;

    @Column(name = "Answer")
    private String answer;

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

    @Transient
    private Long quizTypeId;

    @Transient
    private Integer day;

    @Transient
    private Boolean formValid;
}

