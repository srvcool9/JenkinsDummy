package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

/**
 * $table.getTableComment()
 */
@Data
@Entity
@Table(name = "Institutionmaster",catalog = "UDISE")
public class InstitutionMaster implements Serializable {

    @Id
    @Column(name = "Institutonid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long institutonId;

    @Column(name = "Typeid", nullable = false)
    private Integer typeId;

    @OneToOne
    @JoinColumn(name = "Districtcode", referencedColumnName = "Districtid")
    private DistrictMaster districtCode;

    @Column(name = "Institutioncode", nullable = false)
    private String institutionCode;

    @Column(name = "Institutionname", nullable = false)
    private String institutionName;

    @Column(name = "Isactive", nullable = false)
    private Boolean isActive;

}
