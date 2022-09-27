package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Subgroupmaster", catalog = "Training")
public class TrainingSubGroupMaster implements Serializable {
    @Id
    @Column(name = "Subgroupid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subGroupId;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "Groupid", nullable = false)
    private TrainingGroupMaster group;

    @Column(name = "Subgroupname")
    private String subGroupName;

    @Column(name = "Description")
    private String description;

    @Column(name = "Isactive")
    private Boolean isActive;

    @Column(name = "Createdby")
    private Integer createdBy;

    @Column(name = "Createdon")
    private Date createdOn;

    @OneToOne
    @JoinColumn(name = "Updatedby", referencedColumnName = "Userid")
    private UserMaster updatedBy;

    @Column(name = "Updatedon")
    private Date updatedOn;

    @OneToMany(mappedBy = "subGroupId")
    @JsonIgnoreProperties(value = "subGroupId")
    private List<Training> trainingList;
}
