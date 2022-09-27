package com.netlink.rsk.utility;

import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import org.springframework.stereotype.Component;


import java.io.IOException;

@Component
public class PDFUtility {

    public void pdfCreator() throws IOException {
        String hindiFontPath = "src/main/resources/fonts/KrishnaBold-KqB7.ttf";
        PdfFont hindiFont = PdfFontFactory.createFont(hindiFontPath);
        String heading = "mi;ksxdrkZ";
        PdfWriter pdfWriter = new PdfWriter("simple.pdf");
        PdfDocument pdfDocument = new PdfDocument(pdfWriter);
        pdfDocument.addNewPage();
        Paragraph p1 = new Paragraph();
        Paragraph p2 = new Paragraph();
        p1.add(heading).setFont(hindiFont);
        p2.add("hello");
        Document document = new Document(pdfDocument);
        document.add(p1);
        document.add(p2);
        document.close();
    }
}
