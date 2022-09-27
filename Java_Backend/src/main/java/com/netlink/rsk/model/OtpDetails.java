package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * $table.getTableComment()
 */
@Data
@Entity
@Table(name = "Otpdetails",catalog = "Dbo")
public class OtpDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Module")
    private String module;

    @Column(name = "Mobile")
    private String mobile;

    @Column(name = "OTP")
    private String OTP;

    @Column(name = "Timestamp")
    private LocalDateTime timeStamp;

    @Column(name = "Isverified")
    private Integer isVerified;

    @Column(name = "Isexpired")
    private Integer isExpired;

    @Column(name = "Createdby")
    private Integer createdBy;

}
