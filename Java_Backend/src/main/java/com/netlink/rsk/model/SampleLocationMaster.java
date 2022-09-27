package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * $table.getTableComment()
 */
@Data
@Entity
@Table(name = "SampleLocationMaster")
public class SampleLocationMaster implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Id", nullable = false)
    private Integer id;

    @Column(name = "AssessmentId", nullable = false)
    private Integer assessmentId;

    @Column(name = "UDISECode", nullable = false)
    private String UDISECode;

    @Column(name = "ClassId", nullable = false)
    private String classId;

    @Column(name = "IsActive", nullable = false)
    private Boolean isActive;

}
