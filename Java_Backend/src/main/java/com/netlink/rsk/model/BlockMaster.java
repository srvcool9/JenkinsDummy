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
@Table(name = "Blockmaster",catalog = "UDISE")
public class BlockMaster implements Serializable {

    @Id
    @Column(name = "Blockid", nullable = false)
    private String blockId;

    @Column(name = "Districtid", nullable = false)
    private String districtId;

    @Column(name = "Blockname", nullable = false)
    private String blockName;

    @Column(name = "Blocknameh", nullable = false)
    private String blockNameH;

    @Column(name = "Isheadquater", nullable = false)
    private Boolean isHeadQuater;

    @Column(name = "Isactive", nullable = false)
    private Boolean isActive;

}
