package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@Table(name = "Quatermaster", catalog = "Dbo")
public class QuaterMaster implements Serializable {

    @Id
    @Column(name = "Quaterid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quaterId;

    @Column(name = "Quatername")
    private String quaterName;

    @OneToMany(mappedBy = "quater")
    @JsonIgnoreProperties(value ="quater")
    private List<QuaterMonthMapping> quaterMonthMappingList;

}
