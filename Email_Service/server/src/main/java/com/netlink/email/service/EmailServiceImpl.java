package com.netlink.email.service;

import com.netlink.email.constants.AppConstant;
import com.netlink.email.constants.ErrorMessage;
import com.netlink.email.controller.EmailController;
import com.netlink.email.model.Mail;
import com.netlink.email.enums.Type;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

/**
 * This is Implementation class for Email Service
 */
@Service
public class EmailServiceImpl implements EmailService {

    private static Logger log = LoggerFactory.getLogger(EmailServiceImpl.class);

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

    /**
     * This Method is used for sending Email Notification using Templates
     * @param mail
     * @param mailType
     * @throws MessagingException
     * @throws IOException
     */
    public void send(Mail mail, Type mailType) throws MessagingException, IOException {
        if(null==mail || null==mailType){
            throw new MessagingException(ErrorMessage.EITHER_OF_THE_PARAM_NOT_AVAILABLE);
        }
        String template=null;
        String type=null;
        String subject=null;
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());
        Context context = new Context();
        context.setVariables(mail.getProps());
        type = mailType.getValue();
        mail.setFrom("no-reply@netlink.com");
        template = getTemplate(context, type);
        sendEmailGenerater(mail, template, message, helper);
    }

    /**
     * This method returns the email template on the basis of @param type
     * also injects the required data contained in @param context
     *
     * @param context
     * @param type
     * @return String
     */
    private String getTemplate(Context context, String type) {
        String template;
        switch (type) {
            case "JobAnniversary":
                template = generateTemplate(AppConstant.ANNIVERSARY_TEMPLATE, context);
                break;
            case "Birthday":
                template = generateTemplate(AppConstant.Birthday_Points_TEMPLATE, context);
                break;
            case "Otp":
                template = generateTemplate(AppConstant.OTP_TEMPLATE, context);
                break;
            case "Password":
                template = generateTemplate(AppConstant.PASSWORD_TEMPLATE, context);
                break;
            case "Approval":
                template = generateTemplate(AppConstant.APPROVAL_TEMPLATE, context);
                break;
            case "Rejected":
                template = generateTemplate(AppConstant.REJECTED_TEMPLATE, context);
                break;
            case "AdminApproval":
                template = generateTemplate(AppConstant.ADMIN_APPROVAL_TEMPLATE, context);
                break;
            case "AdminReject":
                template = generateTemplate(AppConstant.ADMIN_REJECTED_TEMPLATE, context);
                break;
            case "RewardApproval":
                template = generateTemplate(AppConstant.REWARD_APPROVAL_TEMPLATE, context);
                break;
            case "RewardReject":
                template = generateTemplate(AppConstant.REWARD_REJECTED_TEMPLATE, context);
                break;
            case "ApprovedRewardStatus":
                template = generateTemplate(AppConstant.APPROVED_REWARD_TEMPLATE, context);
                break;
            case "RedeemRequest":
                template = generateTemplate(AppConstant.REDEEM_REQUEST_TEMPLATE, context);
                break;
            case "NewRequest":
                template = generateTemplate(AppConstant.NEW_REQUEST_TEMPLATE, context);
                break;

            default:
                template = generateTemplate(AppConstant.ANNIVERSARY_TEMPLATE, context);
        }
        return template;
    }

    /**
     * This method is for generate Template on the basis @param type
     * @param mailType
     * @param context
     * @return String
     */

    private final String generateTemplate(String mailType, Context context) {
        if(null!=mailType && null!=context) {
            return templateEngine.process(mailType, context);
        }
        return null;
    }

    /**
     * This method will  Generate Email on the basis of @param type
     * @param mail
     * @param html
     * @param message
     * @param helper
     * @throws MessagingException
     * @throws IOException
     */
    private final void sendEmailGenerater(Mail mail, String html, MimeMessage message, MimeMessageHelper helper) throws MessagingException, IOException {
        if (null != mail.getMailTo() && null != html && null != mail.getFrom()) {
            helper.setTo(mail.getMailTo());
            helper.setText(html, true);
            helper.setSubject(mail.getSubject());
            helper.setFrom(mail.getFrom());
            Thread thread= new Thread() {
                public void run() {
                    try {
                        log.info("Sending Email ");
                        emailSender.send(message);
                        log.info("Mail Sent Successfully ");
                    } catch (Exception e) {
                        e.printStackTrace();
                        log.info("Failed to send email ");
                    }
                }
            };
            thread.start();
        }
    }
}

