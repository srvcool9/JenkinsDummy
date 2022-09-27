package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

/**
 * $table.getTableComment()
 */
@Data
@Entity
@Table(name = "Entitymaster",catalog = "Dbo")
public class EntityMaster implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Entityid", nullable = false)
    private Integer entityId;

    @Column(name = "Entitytypeid", nullable = false)
    private Integer entityTypeId;

    @Column(name = "Entityname", nullable = false)
    private String entityName;

    @Column(name = "Isactive", nullable = false)
    private Boolean isActive;

    @Transient
    @Column(name = "name")
    private String name;

}
