package com.netlink.rsk.utility;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.service.IBlock;
import lombok.AllArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

@Component
@AllArgsConstructor
public class ExcelGenerator {

    @Autowired
    private IBlock block;

    private List<?> list = new ArrayList<>();

    public void createData(){
        Response response= block.fetchALLBlock(null);
        list=response.getData();
    }
    public void createExcel( XSSFWorkbook workbook) throws IOException, IllegalAccessException {
        XSSFSheet sheet = workbook.createSheet("report");
        setRow(workbook,sheet);
        Iterator<?> i = list.iterator();
        int rownum = 1;
        int cellnum = 0;
        while (i.hasNext()) {
            Object templist = i.next();
            List<Field> fields= Arrays.asList(templist.getClass().getDeclaredFields());
            Iterator<?> fieldsIterator = fields.iterator();
            Row row = sheet.createRow(rownum++);
            cellnum = 0;
            while (fieldsIterator.hasNext()) {
                Field field= (Field) fieldsIterator.next();
                field.setAccessible(true);
                Object value= field.get(templist);
                Cell cell = row.createCell(cellnum++);
                cell.setCellValue(value.toString());
            }
        }
    }
    public void export(HttpServletResponse response) throws Exception {
        createData();
        XSSFWorkbook workbook = new XSSFWorkbook();
        ServletOutputStream out = response.getOutputStream();
        createExcel(workbook);
        workbook.write(out);
        workbook.close();
        out.close();
    }

    public void setRow(XSSFWorkbook workbook, XSSFSheet sheet){
        Iterator<?> i = list.iterator();
        int rownum = 0;
        int cellnum = 0;
        XSSFFont font = workbook.createFont();
        font.setColor(IndexedColors.WHITE.index);
        CellStyle style = sheet.getWorkbook().createCellStyle();
        style.setFillForegroundColor(IndexedColors.BLACK1.index);
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setFont(font);
        font.setBold(true);
        font.setFontHeight(14);
        style.setFont(font);
        style.setAlignment(HorizontalAlignment.CENTER);
        //sheet.addMergedRegion(new CellRangeAddress(0,0,0,4));
        font.setFontHeightInPoints((short) (10));
        while (i.hasNext()) {
            Object templist = i.next();
            List<Field> fields= Arrays.asList(templist.getClass().getDeclaredFields());
            Iterator<?> fieldsIterator = fields.iterator();
            Row row = sheet.createRow(rownum++);
            cellnum = 0;
            while (fieldsIterator.hasNext()) {
                Field field= (Field) fieldsIterator.next();
                Cell cell = row.createCell(cellnum++);
                cell.setCellValue(field.getName());
            }
            break;
        }
    }

//    public CellStyle setRowHeader(CellStyle style, XSSFFont font){
//        style.setFillForegroundColor(IndexedColors.BLACK1.index);
//        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
//        style.setFont(font);
//        font.setBold(true);
//        font.setFontHeight(14);
//        style.setFont(font);
//        style.setAlignment(HorizontalAlignment.CENTER);
//        return style;
//    }
}
