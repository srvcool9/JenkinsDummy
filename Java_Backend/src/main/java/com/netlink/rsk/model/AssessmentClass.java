package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

/**
 * $table.getTableComment()
 */
@Data
@Entity
@Table(name = "Assessmentclass" ,catalog = "Assessment")
public class AssessmentClass implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Assessmentid", nullable = false)
    private Integer assessmentId;

    @Column(name = "Classid", nullable = false)
    private Integer classId;

    @ManyToOne
    @JoinColumn(name = "Userid", nullable = false,insertable = false,updatable = false)
    @JsonBackReference(value = "userMaster")
    private UserMaster user;

}
