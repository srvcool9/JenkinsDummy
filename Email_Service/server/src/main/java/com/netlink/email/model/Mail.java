package com.netlink.email.model;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * This is model class for Email
 */

public class Mail {

    private String from;
    private String mailTo;
    private String subject;
    private List<Object> attachments;
    private Map<String, Object> props;
    private String msg;

    public Mail() {}

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getMailTo() {
        return mailTo;
    }

    public void setMailTo(String mailTo) {
        this.mailTo = mailTo;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public List<Object> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<Object> attachments) {
        this.attachments = attachments;
    }

    public Map<String, Object> getProps() {
        return props;
    }

    public void setProps(Map<String, Object> props) {
        this.props = props;
    }

    public String getMsg() { return msg; }

    public void setMsg(String msg) { this.msg = msg; }

    @Override
    public String toString() {
        return "Mail{" +
                "from='" + from + '\'' +
                ", mailTo='" + mailTo + '\'' +
                ", subject='" + subject + '\'' +
                ", attachments=" + attachments +
                ", props=" + props +
                ", msg='" + msg + '\'' +
                '}';
    }
}

