import { ApiProperty } from "@nestjs/swagger";

export class ProfessionalResponseDto {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    id: string;

    @ApiProperty({ example: 'Lucas Martins' })
    nome: string;

    @ApiProperty({ example: 'Júnior' })
    nivel: string;

    @ApiProperty({ example: 'Masculino' })
    sexo: string;

    @ApiProperty({ example: '2000-03-14T00:00:00.000Z' })
    data_nascimento: Date;

    @ApiProperty({ example: 'Games' })
    hobby: string;
}