package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "Typemaster", catalog = "Visit")
public class TypeMaster implements Serializable {

    @Id
    @Column(name = "Typeid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long typeId;

    @Column(name = "Typename")
    private String typeName;

    @Column(name = "Scoringpercentage")
    private Integer scoringPercentage;

    @Column(name = "Isactive")
    private Boolean isActive;

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
