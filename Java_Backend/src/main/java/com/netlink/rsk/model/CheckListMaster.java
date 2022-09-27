package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Checklistmaster",catalog = "Training")
public class CheckListMaster implements Serializable {

    @Id
    @Column(name = "Checklistid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long checkListId;

    @OneToOne
    @JoinColumn(name="Trainingid", referencedColumnName = "Trainingid")
    private Training training;

    @Column(name="Checklistname")
    private String checkListName ;

    @Column(name="Createdby")
    private Long createdBy ;

    @Column(name="Createdon")
    private Date createdOn ;

    @Column(name="Updatedby")
    private Long updatedBy ;

    @Column(name="Updatedon")
    private Date updatedOn ;

    @OneToMany(mappedBy = "checkList")
    @JsonIgnoreProperties(value = "checkList")
    private List<CheckListItems> checkListItems;

}
