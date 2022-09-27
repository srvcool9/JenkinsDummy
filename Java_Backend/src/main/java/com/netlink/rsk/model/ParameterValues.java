package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "Parametervalues", catalog = "Visit")
public class ParameterValues implements Serializable {

    @Id
    @Column(name = "Parametervalueid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long parameterValueId;

    @ManyToOne
    @JoinColumn(name = "Parameterid")
    private Parameter parameter;

    @Column(name = "Orderno")
    private Integer orderNumber;

    @Column(name = "Description")
    private String description;

    @Column(name = "Actionprompts")
    private String actionPrompts;

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
