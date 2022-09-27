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
@Table(name = "Districtmaster",catalog = "UDISE")
public class DistrictMaster implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Districtid", nullable = false)
    private String districtId;

    @Column(name = "Divisionid", nullable = false)
    private Integer divisionId;

    @Column(name = "Districtname", nullable = false)
    private String districtName;

    @Column(name = "Districtnameh", nullable = false)
    private String districtNameH;

    @Column(name = "Isactive", nullable = false)
    private Boolean isActive;

}
