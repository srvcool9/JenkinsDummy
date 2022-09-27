package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Parametermaster", catalog = "Visit")
public class Parameter implements Serializable {

    @Id
    @Column(name = "Parameterid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long parameterId;

    @ManyToOne
  //  @JsonIgnoreProperties(value ="parameterList")
    @JoinColumn(name = "Sectionid")
    private SectionMaster section;

    @OneToOne
    @JoinColumn(name="Purposeid",referencedColumnName = "id")
    private EntityMaster purposeId;

    @OneToOne
    @JoinColumn(name="Typeid",referencedColumnName = "Typeid")
    private TypeMaster typeId;

    @Column(name = "Quaterid")
    private String quaterId;

    @Column(name = "Parametername")
    private String parameterName;

    @Column(name = "Gradegroupid")
    private String gradeGroupIds;

    @Column(name = "Visitorroleid")
    private String visitorRoleIds;

    @Column(name = "Mandatory")
    private Boolean mandatory;

    @Column(name = "Isactive")
    private Boolean isActive;

    @OneToMany(mappedBy = "parameter")
    @JsonIgnoreProperties(value = "parameter")
    private List<ParameterValues> parameterValuesList;

    @Transient
    List<RoleMaster> roleList;

    @Transient
    List<GradeGroups> gradeList;

    @Transient
    List<QuaterMaster> quaterMaster;

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
