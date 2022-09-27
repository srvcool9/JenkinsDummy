package com.netlink.rsk.model;

import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "Monitorphotos", catalog = "Training")
public class MonitorPhotos  implements Serializable {

    @Id
    @Column(name = "Monitorphotoid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long monitorPhotoId;

    @Column(name="Photoname")
    private String photoName;

    @Column(name="Path")
    private String path;

    @ManyToOne(cascade=CascadeType.DETACH)
    @JoinColumn(name = "Batchid")
    private BatchMaster batchId;

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
