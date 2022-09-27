package com.netlink.rsk.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * $table.getTableComment()
 */
@Data
@Entity
@Table(name = "EmployeeHistory")
public class EmployeeHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "EmployeeID", nullable = false)
    private Integer employeeID;

    @Column(name = "Name", nullable = false)
    private String name;

    @Column(name = "Position", nullable = false)
    private String position;

    @Column(name = "Department", nullable = false)
    private String department;

    @Column(name = "Address", nullable = false)
    private String address;

    @Column(name = "AnnualSalary", nullable = false)
    private BigDecimal annualSalary;

    @Column(name = "ValidFrom", nullable = false)
    private Date validFrom;

    @Column(name = "ValidTo", nullable = false)
    private Date validTo;

}
