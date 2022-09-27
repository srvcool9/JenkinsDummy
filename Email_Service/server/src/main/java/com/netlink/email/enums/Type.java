package com.netlink.email.enums;

import com.netlink.email.constants.AppConstant;

/**
 * This is a enum class to define the type template to be used
 */
public enum Type {
    JOBANNIVERSARY {
        @Override
        public String getValue(){
            return AppConstant.JOB_ANNIVERSARY;
        }
    },
    BIRTHDAY {
        @Override
        public String getValue(){
            return AppConstant.BIRTHDAY;
        }
    },
    OTP {
        @Override
        public String getValue() {
            return AppConstant.OTP;
        }
    },
    APPROVAL {
        @Override
        public String getValue() {
            return AppConstant.APPROVAL;
        }
    },
    ADMINAPPROVAL {
        @Override
        public String getValue() {
            return AppConstant.ADMINAPPROVAL;
        }
    },
    ADMINREJECT {
        @Override
        public String getValue() {
            return AppConstant.ADMINREJECT;
        }
    },
    REJECTED {
        @Override
        public String getValue() {
            return AppConstant.REJECTED;
        }
    },
    REWARDAPPROVAL {
        @Override
        public String getValue() {
            return AppConstant.REAWRDAPPROVAL;
        }
    },
    REAWARDREJECT {
        @Override
        public String getValue() {
            return AppConstant.REWARDREJECT;
        }
    },
    APPROVEDREWARDSTATUS {
        @Override
        public String getValue() {
            return AppConstant.APPROVEDREWARDSTATUS;
        }
    },
    PASSWORD {
        @Override
        public String getValue() {
            return AppConstant.PASSWORD;
        }
    },
    REDEEMREQUEST {
        @Override
        public String getValue() {
            return AppConstant.REDEEMREQUEST;
        }
    },
    NEWREQUEST {
        @Override
        public String getValue() {
            return AppConstant.NEWREQUEST;
        }
    };

    Type(){

    }
    public abstract String getValue();


}
