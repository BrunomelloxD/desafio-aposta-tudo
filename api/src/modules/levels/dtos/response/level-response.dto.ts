import { ApiProperty } from "@nestjs/swagger";

export class LevelResponseDto {
    @ApiProperty({ 
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'ID do nível'
    })
    id: string;

    @ApiProperty({ 
        example: 'Júnior',
        description: 'Nome do nível'
    })
    nivel: string;
}
