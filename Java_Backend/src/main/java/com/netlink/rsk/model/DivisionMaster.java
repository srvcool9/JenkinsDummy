package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

/**
 * $table.getTableComment()
 */
@Data
@Entity
@Table(name = "Divisionmaster",catalog = "UDISE")
public class DivisionMaster implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Divisionid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long divisionId;

    @Column(name = "Divisionname", nullable = false)
    private String divisionName;

    @Column(name = "Divisionnameh", nullable = false)
    private String divisionNameH;

    @Column(name = "Isactive", nullable = false)
    private Boolean isActive;

}
