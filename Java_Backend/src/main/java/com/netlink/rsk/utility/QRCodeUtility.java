package com.netlink.rsk.utility;

import com.google.zxing.*;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.qrcode.QRCodeReader;
import com.google.zxing.qrcode.QRCodeWriter;
import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.controller.QuizController;
import com.netlink.rsk.dto.Response;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.mail.Multipart;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class QRCodeUtility {

    private static final Logger LOGGER = LogManager.getLogger(QRCodeUtility.class);

   public byte[] generateQRCode(String qrContent){
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            int width=500;
            int height=500;
            LOGGER.info("Encoding the qr content into bit....");
            BitMatrix bitMatrix = qrCodeWriter.encode(qrContent, BarcodeFormat.QR_CODE, width, height);
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", byteArrayOutputStream);
            return byteArrayOutputStream.toByteArray();
        } catch (WriterException e) {
            LOGGER.error(e.getMessage(), e);
        } catch (IOException e) {
            LOGGER.error(e.getMessage(), e);
        }
        return null;
    }

    public Response qrcodeReader(MultipartFile multipartFile) throws IOException, NotFoundException {
        File file = convertMultiPartToFile(multipartFile);
        BufferedImage bufferedImage = ImageIO.read(file);
        BufferedImageLuminanceSource bufferedImageLuminanceSource = new BufferedImageLuminanceSource(bufferedImage);
        HybridBinarizer hybridBinarizer = new HybridBinarizer(bufferedImageLuminanceSource);
        BinaryBitmap binaryBitmap = new BinaryBitmap(hybridBinarizer);
        MultiFormatReader multiFormatReader = new MultiFormatReader();
        Result result = multiFormatReader.decode(binaryBitmap);
        String code = result.getText();
        LOGGER.info("Code retrived successfully");
        List<String> codeList = new ArrayList<>();
        codeList.add(code);
        return new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED,codeList);
    }

    private File convertMultiPartToFile(MultipartFile file ) throws IOException {
        File convFile = new File( file.getOriginalFilename() );
        FileOutputStream fos = new FileOutputStream( convFile );
        fos.write( file.getBytes() );
        fos.close();
        return convFile;
    }
}
