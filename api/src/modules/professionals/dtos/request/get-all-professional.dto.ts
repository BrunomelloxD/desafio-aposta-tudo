import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { PaginationDto } from "src/common/dtos/request/pagination.dto";
import { GenderEnum } from "src/common/enums/gender.enum";

export class GetAllProfessionalDto extends PaginationDto {
    @ApiProperty({
        description: 'Filter by professional gender',
        enum: GenderEnum,
        required: false,
        example: GenderEnum.MALE
    })
    @IsOptional()
    gender?: GenderEnum;
}