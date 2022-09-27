package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * $table.getTableComment()
 */
@Data
@Entity
@Table(name = "Groupmaster",catalog = "Assessment")
public class GroupMaster implements Serializable,Comparable<GroupMaster> {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Groupid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupId;

    @Column(name = "Groupname", nullable = false)
    private String groupName;

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

    @Override
    public int compareTo(GroupMaster o) {
        return this.updatedOn.compareTo(new Date());
    }
}
