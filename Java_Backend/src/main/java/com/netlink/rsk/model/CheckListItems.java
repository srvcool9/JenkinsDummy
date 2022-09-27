package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "Checklistitems",catalog = "Training")
public class CheckListItems implements Serializable {

    @Id
    @Column(name = "Checklistitemid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long checkListItemId;

    @ManyToOne(cascade=CascadeType.DETACH)
    @JoinColumn(name = "Checklistid")
    private CheckListMaster checkList;

    @Column(name = "Checklistitemname")
    private String checkListItemName;

    @Column(name = "Createdby")
    private Integer createdBy;

    @Column(name = "Createdon")
    private Date createdOn;

    @Column(name = "Updatedby")
    private UserMaster updatedBy;

    @Column(name = "Updatedon")
    private Date updatedOn;

}
