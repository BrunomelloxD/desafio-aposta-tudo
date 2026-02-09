import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLevelDto {
    @ApiProperty({ 
        example: 'Júnior',
        description: 'Nome do nível'
    })
    @IsNotEmpty()
    @IsString()
    nome: string;
}