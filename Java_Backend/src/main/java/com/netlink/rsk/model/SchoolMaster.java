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
@Table(name = "Schoolmaster", catalog = "UDISE")
public class SchoolMaster implements Serializable {

    @Id
    @Column(name = "UDISEcode", nullable = false)
    private String udiseCode;

    @Column(name = "Schoolname", nullable = false)
    private String schoolName;

    @Column(name = "Blockcode", nullable = false)
    private String blockCode;

    @Column(name = "Clustercode", nullable = false)
    private String clusterCode;

    @Column(name = "Categoryid")
    private Integer categoryId;

    @Column(name = "Mgmtid")
    private Integer mgmtId;

    @Column(name = "Locationid")
    private Integer locationId;

    @Column(name = "Typeid")
    private Integer typeId;

}
