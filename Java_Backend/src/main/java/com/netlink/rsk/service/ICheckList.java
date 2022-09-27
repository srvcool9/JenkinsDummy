package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.CheckListMaster;
import com.netlink.rsk.model.CheckListItems;

import java.util.List;


public interface ICheckList {
    public Response getCheckList(Long id);
    public Response saveCheckList(List<CheckListMaster> checkList);
    public Response getCheckListByTrainingId(Long id);
    public Response deleteCheckListMaster(Long id);
    public Response deleteCheckListItem(Long id);
}
