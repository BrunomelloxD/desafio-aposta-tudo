import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { LevelRepository } from "../repositories/level.repository";
import { PaginatedResponseDto } from "src/common/dtos/response/paginated-response.dto";
import { PaginationDto } from "src/common/dtos/request/pagination.dto";
import { CreateLevelDto } from "../dtos/request/create-level.dto";
import { LevelResponseDto } from "../dtos/response/level-response.dto";
import { ProfessionalRepository } from "src/modules/professionals/repositories/professional.repository";

@Injectable()
export class LevelService {
    constructor(private readonly levelRepository: LevelRepository, private readonly professionalRepository: ProfessionalRepository) { }

    async update(id: string, data: CreateLevelDto): Promise<void> {
        const level = await this.levelRepository.findOne(id);
        if (!level) {
            throw new NotFoundException(`Nível com ID ${id} não encontrado.`);
        }

        const existsByName = await this.levelRepository.existsByName(data.nome);

        if (existsByName) {
            throw new ConflictException(`Já existe um nível com o nome ${data.nome}.`);
        }

        await this.levelRepository.update(id, data);
    }

    async create(data: CreateLevelDto): Promise<LevelResponseDto> {
        const existsByName = await this.levelRepository.existsByName(data.nome);

        if (existsByName) {
            throw new ConflictException(`Já existe um nível com o nome ${data.nome}.`);
        }

        return await this.levelRepository.create(data);
    }

    async findAll(queryParams: PaginationDto): Promise<PaginatedResponseDto<LevelResponseDto>> {
        return await this.levelRepository.findAll(queryParams);
    }

    async delete(id: string): Promise<void> {
        const level = await this.levelRepository.findOne(id);
        if (!level) {
            throw new NotFoundException(`Nível com ID ${id} não encontrado.`);
        }

        const hasProfessionals = await this.professionalRepository.existsProfessionalForSeniorityLevel(id);

        if (hasProfessionals) {
            throw new ConflictException(`Não é possível excluir o nível "${level.nivel}" existem profissionais associados a ele.`);
        }

        await this.levelRepository.delete(id);
    }
}