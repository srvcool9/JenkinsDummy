package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

/**
 * $table.getTableComment()
 */
@Data
@Entity
@Table(name = "Statemaster",catalog = "UDISE")
public class StateMaster implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Stateid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stateId;

    @Column(name = "Statename", nullable = false)
    private String stateName;

    @Column(name = "Statenameh", nullable = false)
    private String stateNameH;

    @Column(name = "Isactive", nullable = false)
    private Boolean isActive;

}
