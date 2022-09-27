package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "Bankmaster")
public class BankMaster implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Bankid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bankId;

    @Column(name = "Bankname", nullable = false)
    private String bankName;

    @Column(name = "Isactive", nullable = false)
    private Boolean isActive;

}
