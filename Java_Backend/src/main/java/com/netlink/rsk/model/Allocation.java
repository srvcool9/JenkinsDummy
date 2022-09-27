package com.netlink.rsk.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.netlink.rsk.dto.ClassDTO;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Allocation" ,catalog = "Assessment")
public class Allocation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Allocationid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long allocationId;

    @OneToOne
    @JoinColumn(name = "Enumeratorid", referencedColumnName = "Enumeratorid")
    private EnumeratorRegistration enumerator;

    @OneToOne
    @JsonIgnoreProperties(value = "assessmentList")
    @JoinColumn(name = "Groupid", referencedColumnName = "Groupid")
    private AssessmentGroup group;

    @OneToOne
    @JsonIgnoreProperties(value = "group")
    @JoinColumn(name = "Assessmentid", referencedColumnName = "Assessmentid")
    private AssessmentMaster assessment ;

    @Column(name = "Classids")
    private String classes;

    @OneToOne
    @JoinColumn(name = "Districtid", referencedColumnName = "Districtid")
    private DistrictMaster district ;

    @OneToOne
    @JoinColumn(name = "Blockid", referencedColumnName = "Blockid")
    private BlockMaster block ;

    @OneToOne
    @JoinColumn(name = "UDISEcode", referencedColumnName = "UDISEcode")
    private SchoolMaster school;

    @OneToOne
    @JoinColumn(name = "Createdby", referencedColumnName = "Userid")
    private UserMaster createdBy;

    @Column(name = "Createdon")
    private Date createdOn;

    @Column(name = "Updatedby")
    private Integer updatedBy;

    @Column(name = "Updatedon")
    private Date updatedOn;

    @Transient
    private List<ClassDTO> classList;

}
