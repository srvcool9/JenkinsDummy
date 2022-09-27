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
@Table(name = "Roleareatype",catalog = "Dbo")
public class RoleAreaType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Roleid", nullable = false)
    private Integer roleId;

    @Column(name = "Areaid", nullable = false)
    private Integer areaId;

}
