package com.netlink.email.enums;

import com.netlink.email.constants.SubjectConstants;

import java.util.Date;


public enum Subjects {
    JOBANNIVERSARY {
        @Override
        public String getValue(){
            return SubjectConstants.JOB_ANNIVERSARY;
        }
    },
    BIRTHDAY {
        @Override
        public String getValue(){
            return SubjectConstants.BIRTHDAY;
        }
    },
    OTP {
        @Override
        public String getValue() {
            return SubjectConstants.OTP;

        }},
    APPROVAL {
        @Override
        public String getValue() {
            return SubjectConstants.APPROVAL;

        }},
    ADMINAPPROVAL {
        @Override
        public String getValue() {
            return SubjectConstants.ADMINAPPROVAL;

        }},
    ADMINREJECT {
        @Override
        public String getValue() {
            return SubjectConstants.ADMINREJECT;

        }},
    REJECTED {
        @Override
        public String getValue() {
            return SubjectConstants.REJECTED;

        }},
    APPROVEDREWARDSTATUS {
        @Override
        public String getValue() {
            return SubjectConstants.APPROVEDREWARDSTATUS;

        }},
    PASSWORD {
        @Override
        public String getValue() {
            return SubjectConstants.PASSWORD;
        }
    };

    Subjects(){

    }
    public abstract String getValue();

}
