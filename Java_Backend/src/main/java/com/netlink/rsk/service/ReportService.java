package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.mapper.EnumeratorAllocationReport;
import com.netlink.rsk.mapper.EnumeratorReport;
import com.netlink.rsk.mapper.StateLevelEnumerator;
import com.netlink.rsk.repository.EnumeratorRegistrationRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService implements IReport{

    private static final Logger LOGGER = LogManager.getLogger(ReportService.class);

    @Autowired
    private EnumeratorRegistrationRepository repository;

    @Override
    public Response getStateLevelEnumerator(Long reportId,Long assessmentId) {
        if(reportId==1){
            LOGGER.info("Fetching report for district wise enumerator for assessment id:"+assessmentId);
            List<StateLevelEnumerator> stateLevelEnumeratorList = repository.getUpRptStateLevelEnumerator(assessmentId);
             if(stateLevelEnumeratorList.isEmpty()==false){
                 return new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED,stateLevelEnumeratorList);
             }
             else{
                 LOGGER.info("No data found for report");
                 return new Response(StaticResponse.FAILURE_Status,StaticResponse.NO_DATA,null);
             }
        }else if(reportId==2){
            LOGGER.info("Fetching enumerator registration report...");
            List<EnumeratorReport> enumeratorReportList = repository.getUpRptEnumeratorReport();
            if(enumeratorReportList.isEmpty()==false){
                return new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED,enumeratorReportList);
            }
            else{
                LOGGER.info("No data found for report");
                return new Response(StaticResponse.FAILURE_Status,StaticResponse.NO_DATA,null);
            }
        }
        else{
            LOGGER.info("Fetching enumerator allocation report for assessment id: "+assessmentId);
            List<EnumeratorAllocationReport> enumeratorAllocationReportList = repository.getUpRptAllocationList(assessmentId);
            if(enumeratorAllocationReportList.isEmpty()==false){
                return new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED,enumeratorAllocationReportList);
            }
            else{
                LOGGER.error("No data found");
                return new Response(StaticResponse.FAILURE_Status,StaticResponse.NO_DATA,null);
            }
        }
    }
}
