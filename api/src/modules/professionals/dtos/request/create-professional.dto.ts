import { IsString, IsNotEmpty, IsUUID, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProfessionalDto {
    @ApiProperty({ example: 'Lucas Martins' })
    @IsString()
    @IsNotEmpty()
    nome: string;

    @ApiProperty({ example: '9c2b3e5a-4d7f-4f5a-9a9d-1f2e3d4c5b6a' })
    @IsUUID()
    @IsNotEmpty()
    nivel_id: string;

    @ApiProperty({ example: 'Masculino' })
    @IsString()
    @IsNotEmpty()
    sexo: string;

    @ApiProperty({ example: '2000-03-14' })
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    data_nascimento: Date;

    @ApiProperty({ example: 'Games' })
    @IsString()
    @IsNotEmpty()
    hobby: string;
}