package com.netlink.rsk.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.util.List;

/**
 * $table.getTableComment()
 */
@Data
@Entity
@Table(name = "Employeemaster" ,catalog = "Employee")
public class EmployeeMaster implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Employeecode", nullable = false)
    private String employeeCode;

    @Column(name = "UDISEcode")
    private String UDISECode;

    @Column(name = "Employeename", nullable = false)
    private String employeeName;

    @Column(name = "Designation", nullable = false)
    private String designation;

    @Column(name = "Gender")
    private String gender;

    @Column(name = "Subjectexpert")
    private String subjectExpert;

    @Column(name = "DOB")
    private Date DOB;

    @Column(name = "DOJ")
    private Date DOJ;

    @Column(name = "Mobileno")
    private String mobileNo;


}
