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
@Table(name = "Entitytypemaster", catalog = "Dbo")
public class EntityTypeMaster implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Entitytypeid", nullable = false)
    private Integer entityTypeId;

    @Column(name = "Schemaname")
    private String schemaName;

    @Column(name = "Entitytypename", nullable = false)
    private String entityTypeName;

    @Column(name = "Isactive", nullable = false)
    private Boolean isActive;

}
