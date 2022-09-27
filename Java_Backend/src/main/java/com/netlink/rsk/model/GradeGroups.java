package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "Gradegroup", catalog = "Visit")
public class GradeGroups implements Serializable {

    @Id
    @Column(name = "Ggid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gradeGroupId;


    @Column(name = "Gradeid", nullable = false)
    private String gradeId;

    @Column(name = "Gradegroupname", nullable = false)
    private String gradeGroupName;

}
