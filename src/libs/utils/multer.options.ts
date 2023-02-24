import { HttpException, HttpStatus } from "@nestjs/common";
import { diskStorage, memoryStorage } from "multer";
import { extname, basename } from "path";

export const multerMemoryOptions = {
  fileFilter: (request, file, callback) => {
    //if (extname(file.originalname).match(/\/(xls|xlsx)$/)) {
    if (extname(file.originalname).match(/(.xlsx|.xls)/g)) {
      callback(null, true)
    } else {
      callback(
        new HttpException(
          {
            message: 1,
            error: '엑셀 파일만 업로드 가능합니다.',
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: memoryStorage(),
  limits: {
    fieldNameSize: 200,
    filedSize: 1024 * 1024,
    fields: 5,
    fileSize: 16777216,
    files: 3,
  }
}

export const multerDiskDestinationOutOptions = {
  fileFilter: (request, file, callback) => {
    if (extname(file.originalname).match(/(.xlsx|.xls)/g)) {
      callback(null, true)
    } else {
      callback(
        new HttpException(
          {
            result: "FAIL",
            message: "엑셀 파일만 업로드 가능합니다."
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    filename: (request, file, callback) => {
      callback(null, `${basename(file.originalname, extname(file.originalname))}_${Date.now()}${extname(file.originalname)}`)
    }
  }),
  limits: {
    fieldNameSize: 200,
    filedSize: 16 * 1024 * 1024,
    fields: 5,
    fileSize: 16777216,
    files: 3,
  }
}