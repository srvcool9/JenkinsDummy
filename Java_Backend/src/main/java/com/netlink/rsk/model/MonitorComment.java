package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "Monitorcomment", catalog = "Training")
public class MonitorComment implements Serializable {

    @Id
    @Column(name = "Monitorcommentid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long monitorCommentId;


    @OneToOne
    @JoinColumn(name="Trainerid",referencedColumnName = "Trainerid")
    private TrainerMaster trainerMaster;

    @OneToOne
    @JoinColumn(name="Batchid",referencedColumnName = "Batchid")
    private BatchMaster batchMaster;

    @Column(name="Comment")
    private String comment;

    @Column(name = "Createdby")
    private Integer createdBy;

    @Column(name = "Createdon")
    private Date createdOn;

    @OneToOne
    @JoinColumn(name = "Updatedby", referencedColumnName = "Userid")
    private UserMaster updatedBy;

    @Column(name = "Updatedon")
    private Date updatedOn;
}
