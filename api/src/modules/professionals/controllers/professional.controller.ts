import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { ProfessionalService } from "../services/professional.service";
import { ProfessionalResponseDto } from "../dtos/response/professional-response.dto";
import { PaginationDto } from "src/common/dtos/request/pagination.dto";
import { PaginatedResponseDto } from "src/common/dtos/response/paginated-response.dto";
import { CreateProfessionalDto } from "../dtos/request/create-professional.dto";
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags('Profissionais')
@Controller('api/profissionais')
export class ProfessionalController {
    constructor(private readonly professionalService: ProfessionalService) { }

    @Get()
    @ApiOperation({
        summary: 'Listar todos os profissionais',
        description: 'Retorna uma lista paginada de profissionais'
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
        description: 'Buscar por nome do profissional',
        example: 'Lucas'
    })
    @ApiOkResponse({
        description: 'Profissionais recuperados com sucesso',
        type: PaginatedResponseDto<ProfessionalResponseDto>
    })
    @ApiBadRequestResponse({
        description: 'Parâmetros de consulta inválidos'
    })
    async findAll(@Query() queryParams: PaginationDto): Promise<PaginatedResponseDto<ProfessionalResponseDto>> {
        return this.professionalService.findAll(queryParams);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    @ApiOperation({
        summary: 'Criar um novo profissional',
        description: 'Cria um novo profissional com as informações fornecidas'
    })
    @ApiBody({
        type: CreateProfessionalDto,
        description: 'Dados de criação do profissional',
        examples: {
            example1: {
                summary: 'Criar profissional',
                description: 'Exemplo de criação de um profissional',
                value: {
                    nome: 'Lucas Martins',
                    nivel_id: '141dcdc1-b5a0-44fe-b23f-e54581b937c4',
                    sexo: 'Masculino',
                    data_nascimento: '2000-03-14',
                    hobby: 'Games'
                }
            },
            example2: {
                summary: 'Criar profissional feminino',
                description: 'Exemplo de criação de uma profissional',
                value: {
                    nome: 'Maria Silva',
                    nivel_id: '141dcdc1-b5a0-44fe-b23f-e54581b937c4',
                    sexo: 'Feminino',
                    data_nascimento: '1995-08-22',
                    hobby: 'Leitura'
                }
            }
        }
    })
    @ApiCreatedResponse({
        description: 'Profissional criado com sucesso',
        type: ProfessionalResponseDto
    })
    @ApiNotFoundResponse({
        description: 'Nível não encontrado'
    })
    @ApiBadRequestResponse({
        description: 'Dados de entrada inválidos'
    })
    async create(@Body() data: CreateProfessionalDto):Promise<ProfessionalResponseDto> {
        return this.professionalService.create(data);
    }

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Atualizar um profissional',
        description: 'Atualiza as informações de um profissional pelo ID'
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'ID do profissional',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    @ApiBody({
        type: CreateProfessionalDto,
        description: 'Dados de atualização do profissional',
        examples: {
            example1: {
                summary: 'Atualizar profissional',
                description: 'Exemplo de atualização de um profissional',
                value: {
                    nome: 'Lucas Martins Silva',
                    nivel_id: '141dcdc1-b5a0-44fe-b23f-e54581b937c4',
                    sexo: 'Masculino',
                    data_nascimento: '2000-03-14',
                    hobby: 'Games e Programação'
                }
            }
        }
    })
    @ApiNoContentResponse({
        description: 'Profissional atualizado com sucesso'
    })
    @ApiNotFoundResponse({
        description: 'Profissional ou nível não encontrado'
    })
    @ApiBadRequestResponse({
        description: 'Dados de entrada inválidos ou formato de ID inválido'
    })
    async update(@Body() data: CreateProfessionalDto, @Param('id') id: string):Promise<void> {
        return this.professionalService.update(id, data);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Deletar um profissional',
        description: 'Remove um profissional pelo ID'
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'ID do profissional',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    @ApiNoContentResponse({
        description: 'Profissional deletado com sucesso'
    })
    @ApiNotFoundResponse({
        description: 'Profissional não encontrado'
    })
    @ApiBadRequestResponse({
        description: 'Formato de ID do profissional inválido'
    })
    async delete(@Param('id') id: string): Promise<void> {
        await this.professionalService.delete(id);
    }
}