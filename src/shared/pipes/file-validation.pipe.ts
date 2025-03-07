import { type ArgumentMetadata, BadRequestException, Injectable, type PipeTransform } from "@nestjs/common";
import { ReadStream } from "fs";
import { validateFileFormat, validateFileSize } from "../utils/file.util";

@Injectable()
export class FileValidationPipe implements PipeTransform {
    public async transform(value: any, metadata: ArgumentMetadata) {
        if(!value.filename) throw new BadRequestException('File not uploaded')

        const { filename, createReadStream } = value

        const fileStream = createReadStream() as ReadStream

        const allowedFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp']
        const isFileFormatValid = validateFileFormat(filename, allowedFormats)

        if(!isFileFormatValid) throw new BadRequestException('Not allowed file format')
        
        const isFileSizeValid = await validateFileSize(fileStream, 10 * 1024 * 1024)

        if(!isFileSizeValid) throw new BadRequestException('File size exceeds 10MB')

        return value
    }
}