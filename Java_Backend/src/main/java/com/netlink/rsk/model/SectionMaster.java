package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Sectionmaster", catalog = "Training")
public class SectionMaster implements Serializable {

    @Id
    @Column(name = "Sectionid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sectionId;

    @Column(name = "Sectionname")
    private String section;

    @Column(name = "Description")
    private String description;

    @Column(name = "Status")
    private Boolean status;

    @OneToMany(mappedBy = "section")
    @JsonIgnoreProperties(value = "section")
    private List<Parameter> parameterList;

    @OneToOne
    @JoinColumn(name = "Createdby", referencedColumnName = "Userid")
    private UserMaster createdBy;

    @Column(name = "Createdon")
    private Date createdOn;

    @OneToOne
    @JoinColumn(name = "Updatedby", referencedColumnName = "Userid")
    private UserMaster updatedBy;

    @Column(name = "Updatedon")
    private Date updatedOn;
}
