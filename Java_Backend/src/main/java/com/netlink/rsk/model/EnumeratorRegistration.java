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
@Table(name = "Enumeratorregistration", catalog = "Assessment")
public class EnumeratorRegistration implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "Enumeratorid", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long enumeratorId;

    @Column(name = "Enumeratorname", nullable = false)
    private String enumeratorName;

    @Column(name = "Dateofbirth")
    private Date dateOfBirth;

    @Column(name = "Mobile", nullable = false)
    private String mobile;

    @Column(name = "Email", nullable = false)
    private String email;

    @Column(name = "Fathername", nullable = false)
    private String fatherName;

    @Column(name = "Higherqualification", nullable = false)
    private String higherQualification;

    @Column(name = "Supportingdocument")
    private String supportingDocument;

    @OneToOne
    @JoinColumn(name = "Institutedistrict", referencedColumnName = "Districtid")
    private DistrictMaster instituteDistrict;

    @OneToOne
    @JoinColumn(name = "Instituteid", referencedColumnName = "Institutonid")
    private InstitutionMaster institute;

    @Column(name = "Courseid", nullable = false)
    private Integer courseId;

    @Column(name = "Residentialaddress")
    private String residentialAddress;

    @OneToOne
    @JoinColumn(name = "Districtid", referencedColumnName = "Districtid")
    private DistrictMaster district;

    @OneToOne
    @JoinColumn(name = "Blockid", referencedColumnName = "Blockid")
    private BlockMaster block;

    @Column(name = "Isactive")
    private Boolean isActive;

    @Column(name = "Verificationstatus")
    private Long verificationStatus;

    @OneToOne
    @JoinColumn(name = "Bankid", referencedColumnName = "BankId")
    private BankMaster bank;

    @Column(name = "IFSCcode")
    private String IFSCCode;

    @Column(name = "Bankaccountno")
    private String bankAccountNo;

    @Column(name = "Acountholder", nullable = false)
    private String acountHolder;

    @Column(name = "Createdby")
    private Integer createdBy;

    @Column(name = "Createdon")
    private Date createdOn;

    @Column(name = "Updatedby")
    private Integer updatedBy;

    @Column(name = "Updatedon")
    private Date updatedOn;

    @Column(name = "Registrationdate")
    private Date registrationDate;

    @Column(name = "Year")
    private Integer grade;

    @OneToOne
    @JoinColumn(name = "Verifiedby", referencedColumnName = "Userid")
    private UserMaster verifiedBy;

}
