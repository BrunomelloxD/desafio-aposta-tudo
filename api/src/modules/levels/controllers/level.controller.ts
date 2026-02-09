import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { PaginatedResponseDto } from "src/common/dtos/paginated-response.dto";
import { LevelService } from "../services/level.service";
import { CreateLevelDto } from "../dtos/create-level.dto";
import { LevelResponseDto } from "../dtos/response/level-response.dto";
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags('Níveis')
@Controller('api/niveis')
export class LevelController {
    constructor(private readonly levelService: LevelService) { }

    @Get()
    @ApiOperation({
        summary: 'Listar todos os níveis',
        description: 'Retorna uma lista paginada de níveis'
    })
    @ApiQuery({
        name: 'page',
        required: false,
        type: Number,
        description: 'Número da página (padrão: 1)',
        example: 1
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Itens por página (padrão: 10)',
        example: 10
    })
    @ApiQuery({
        name: 'search',
        required: false,
        type: String,
        description: 'Buscar por nome do nível',
        example: 'Júnior'
    })
    @ApiOkResponse({
        description: 'Níveis recuperados com sucesso',
        type: PaginatedResponseDto<LevelResponseDto>
    })
    @ApiBadRequestResponse({
        description: 'Parâmetros de consulta inválidos'
    })
    async findAll(@Query() queryParams: PaginationDto): Promise<PaginatedResponseDto<LevelResponseDto>> {
        return await this.levelService.findAll(queryParams);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Deletar um nível',
        description: 'Remove um nível pelo ID'
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'ID do nível',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    @ApiNoContentResponse({
        description: 'Nível deletado com sucesso'
    })
    @ApiNotFoundResponse({
        description: 'Nível não encontrado'
    })
    @ApiBadRequestResponse({
        description: 'Formato de ID do nível inválido'
    })
    async delete(@Param('id') id: string): Promise<void> {
        await this.levelService.delete(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Criar um novo nível',
        description: 'Cria um novo nível com as informações fornecidas'
    })
    @ApiBody({
        type: CreateLevelDto,
        description: 'Dados de criação do nível',
        examples: {
            example1: {
                summary: 'Criar nível Júnior',
                description: 'Exemplo de criação de nível Júnior',
                value: {
                    nome: 'Júnior'
                }
            },
            example2: {
                summary: 'Criar nível Pleno',
                description: 'Exemplo de criação de nível Pleno',
                value: {
                    nome: 'Pleno'
                }
            },
            example3: {
                summary: 'Criar nível Sênior',
                description: 'Exemplo de criação de nível Sênior',
                value: {
                    nome: 'Sênior'
                }
            }
        }
    })
    @ApiCreatedResponse({
        description: 'Nível criado com sucesso',
        type: LevelResponseDto
    })
    @ApiConflictResponse({
        description: 'Nível com este nome já existe'
    })
    @ApiBadRequestResponse({
        description: 'Dados de entrada inválidos'
    })
    async create(@Body() data: CreateLevelDto): Promise<LevelResponseDto> {
        return await this.levelService.create(data);
    }

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Atualizar um nível',
        description: 'Atualiza as informações de um nível pelo ID'
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'ID do nível',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    @ApiBody({
        type: CreateLevelDto,
        description: 'Dados de atualização do nível',
        examples: {
            example1: {
                summary: 'Atualizar nome do nível',
                description: 'Exemplo de atualização do nome do nível',
                value: {
                    nome: 'Sênior'
                }
            }
        }
    })
    @ApiNoContentResponse({
        description: 'Nível atualizado com sucesso'
    })
    @ApiNotFoundResponse({
        description: 'Nível não encontrado'
    })
    @ApiBadRequestResponse({
        description: 'Dados de entrada inválidos ou formato de ID inválido'
    })
    async update(@Body() data: CreateLevelDto, @Param('id') id: string): Promise<void> {
        await this.levelService.update(id, data);
    }
}