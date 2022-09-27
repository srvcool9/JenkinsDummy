package com.netlink.rsk.utility;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Component
public class ExcelReader {

    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    public static boolean hasExcelFormat(MultipartFile file) {
        return TYPE.equals(file.getContentType());
    }
    static String SHEET = "Trainee_Sheet";


    public static List<String> excelToList(InputStream is) throws Exception {
        try {
            Workbook workbook = new XSSFWorkbook(is);
            Sheet sheet = workbook.getSheet(SHEET);
            Iterator<Row> rows = sheet.iterator();
            List<String> empData = new ArrayList<>();
            int rowNumber = 0;
            while (rows.hasNext())
            {
                Row currentRow = rows.next();
                if (rowNumber == 0) {
                    Iterator<Cell> cellsInRow = currentRow.iterator();
                    Cell currentCell = cellsInRow.next();
                    CellType cellType = currentCell.getCellType();
                    empData.add(currentCell.getStringCellValue());
                    rowNumber++;
                    continue;
                }
            }
            workbook.close();
            return empData;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
        }
    }
}
