package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Materialmaster", catalog = "Training")
public class TrainingMaterial {

    @Id
    @Column(name="Materialid",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long materialId;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JsonIgnoreProperties({"subGroupId","status","materialListList"})
    @JoinColumn(name = "Trainingid", nullable = false)
    private Training trainingId;

    @Column(name="Documentname")
    private String documentName;

    @Column(name="Documentpath")
    private String documentPath;

    @Column(name="Linkname")
    private String linkName;

    @Column(name="Linkpath")
    private String linkPath;


    @OneToOne
    @JoinColumn(name="Createdby", referencedColumnName = "Userid")
    private UserMaster createdBy;

    @Column(name="Createdon")
    private Date createdOn;

    @OneToOne
    @JoinColumn(name="Updatedby", referencedColumnName = "Userid")
    private UserMaster updatedBy;

    @Column(name="Updatedon")
    private Date updatedOn;
}
