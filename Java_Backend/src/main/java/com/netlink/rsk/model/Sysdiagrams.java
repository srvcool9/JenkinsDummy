package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

/**
 * $table.getTableComment()
 */
@Data
@Entity
@Table(name = "sysdiagrams")
public class Sysdiagrams implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "diagram_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diagramId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "principal_id", nullable = false)
    private Integer principalId;

    @Column(name = "version")
    private Integer version;

    @Column(name = "definition")
    private String definition;

}
