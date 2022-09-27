package com.netlink.rsk.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.management.ConstructorParameters;
import java.util.List;

@Data
@AllArgsConstructor
public class Response {

    private String status;
    private String message;
    private List<?> data;
}

