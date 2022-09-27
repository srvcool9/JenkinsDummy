package com.netlink.rsk.model;

import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
@Data
@Entity
@Table(name = "Redflag", catalog = "Training")
public class RedFlag implements Serializable {

    @Id
    @Column(name="Redflagid",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long redFlagId;

    @OneToOne
    @JoinColumn(name="Batchid", referencedColumnName = "Batchid")
    private BatchMaster batchId;

    @Column(name = "Remark")
    private String remark;

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
