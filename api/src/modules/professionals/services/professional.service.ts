import { Injectable, NotFoundException } from "@nestjs/common";
import { ProfessionalRepository } from "../repositories/professional.repository";
import { PaginationDto } from "src/common/dtos/request/pagination.dto";
import { ProfessionalResponseDto } from "../dtos/response/professional-response.dto";
import { PaginatedResponseDto } from "src/common/dtos/response/paginated-response.dto";
import { CreateProfessionalDto } from "../dtos/request/create-professional.dto";
import { LevelRepository } from "src/modules/levels/repositories/level.repository";


@Injectable()
export class ProfessionalService {
    constructor(private readonly professionalRepository: ProfessionalRepository, private readonly levelRepository: LevelRepository) { }

    async delete(id: string): Promise<void> {
        const professional = await this.professionalRepository.findOne(id);

        if (!professional) {
            throw new NotFoundException(`Profissional com ID ${id} não encontrado.`);
        }

        await this.professionalRepository.delete(id);
    }

    async update(id: string, data: CreateProfessionalDto): Promise<void> {
        const level = await this.levelRepository.findOne(data.nivel_id);

        if (!level) {
            throw new NotFoundException(`Nível com ID ${data.nivel_id} não encontrado.`);
        }

        const professional = await this.professionalRepository.findOne(id);

        if (!professional) {
            throw new NotFoundException(`Profissional com ID ${id} não encontrado.`);
        }

        await this.professionalRepository.update(id, data);
    }

    async create(data: CreateProfessionalDto): Promise<ProfessionalResponseDto> {
        const level = await this.levelRepository.findOne(data.nivel_id);

        if (!level) {
            throw new NotFoundException(`Nível com ID ${data.nivel_id} não encontrado.`);
        }

        return this.professionalRepository.create(data);
    }

    async findAll(queryParams: PaginationDto): Promise<PaginatedResponseDto<ProfessionalResponseDto>> {
        const professionals = await this.professionalRepository.findAll(queryParams);

        professionals.data = professionals.data.map(professional => ({
            ...professional,
            idade: this.calculateAge(professional.data_nascimento),
        }));

        return professionals;
    }

    private calculateAge(data_nascimento: Date): number {
        const today = new Date();
        const birthDate = new Date(data_nascimento);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }
}