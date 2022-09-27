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
@Table(name = "Menumaster", catalog = "Dbo")
public class MenuMaster implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "MenuiD", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuID;

    @Column(name = "Menuname")
    private String menuName;

    @Column(name = "URL")
    private String URL;

    @Column(name = "MenuparentiD")
    private Integer menuParentID;

    @Column(name = "Displayname")
    private String displayName;

    @Column(name = "Menuorder")
    private Integer menuOrder;

    @Column(name = "Imagename")
    private String imageName;

    @Column(name = "Createdby")
    private Integer createdBy;

    @Column(name = "Createdon")
    private Date createdOn;

    @Column(name = "Updatedby")
    private Integer updatedBy;

    @Column(name = "Updatedon")
    private Date updatedOn;

    @Column(name = "Isactive")
    private Boolean isActive;

}
