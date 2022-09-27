package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Groupmaster",catalog = "Training")
public class TrainingGroupMaster implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Groupid", nullable=false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupId;

    @Column(name = "Groupname", nullable = false)
    private String groupName;

    @Column(name = "Description")
    private String description;

    @Column(name = "isactive")
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

    @OneToMany(mappedBy = "group")
    @JsonIgnoreProperties(value = "group")
    private List<TrainingSubGroupMaster> trainingSubGroupList;
}
