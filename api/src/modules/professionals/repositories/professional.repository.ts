import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { IProfessionalRepository } from "./professional.repository.interface";
import { PrismaService } from "src/common/prisma/services/prisma.service";
import { PaginationDto } from "src/common/dtos/request/pagination.dto";
import { PaginatedResponseDto } from "src/common/dtos/response/paginated-response.dto";
import { ProfessionalResponseDto } from "../dtos/response/professional-response.dto";
import { CreateProfessionalDto } from "../dtos/request/create-professional.dto";
import { GetAllProfessionalDto } from "../dtos/request/get-all-professional.dto";

@Injectable()
export class ProfessionalRepository implements IProfessionalRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async findOne(id: string): Promise<ProfessionalResponseDto | null> {
        const professional = await this.prismaService.professionals.findUnique({
            where: { id },
            select: {
                id: true,
                nome: true,
                sexo: true,
                data_nascimento: true,
                hobby: true,
                nivel: { select: { nivel: true } },
            },
        });

        if (!professional) return null;

        return {
            id: professional.id,
            nome: professional.nome,
            sexo: professional.sexo,
            data_nascimento: professional.data_nascimento,
            hobby: professional.hobby,
            nivel: professional.nivel?.nivel ?? "",
        };
    }

    async update(id: string, data: CreateProfessionalDto): Promise<ProfessionalResponseDto> {
        const professional = await this.prismaService.professionals.update({
            where: { id },
            data: {
                nome: data.nome,
                sexo: data.sexo,
                data_nascimento: data.data_nascimento,
                hobby: data.hobby,
                nivel_id: data.nivel_id,
            },
            select: {
                id: true,
                nome: true,
                sexo: true,
                data_nascimento: true,
                hobby: true,
                nivel: { select: { nivel: true } },
            },
        });

        return {
            id: professional.id,
            nome: professional.nome,
            sexo: professional.sexo,
            data_nascimento: professional.data_nascimento,
            hobby: professional.hobby,
            nivel: professional.nivel?.nivel ?? "",
        };
    }

    async create(data: CreateProfessionalDto): Promise<ProfessionalResponseDto> {
        const professional = await this.prismaService.professionals.create({
            data: {
                nome: data.nome,
                sexo: data.sexo,
                data_nascimento: data.data_nascimento,
                hobby: data.hobby,
                nivel_id: data.nivel_id,
            },
            select: {
                id: true,
                nome: true,
                sexo: true,
                data_nascimento: true,
                hobby: true,
                nivel: { select: { nivel: true } },
            },
        });

        return {
            id: professional.id,
            nome: professional.nome,
            sexo: professional.sexo,
            data_nascimento: professional.data_nascimento,
            hobby: professional.hobby,
            nivel: professional.nivel?.nivel ?? "",
        };
    }

    async delete(id: string): Promise<void> {
        await this.prismaService.professionals.delete({
            where: { id },
        })
    }

    async findAll({ page = 1, limit = 10, search, gender }: GetAllProfessionalDto): Promise<PaginatedResponseDto<ProfessionalResponseDto>> {
        const where: Prisma.ProfessionalsWhereInput = {
            ...(search && { nome: { contains: search, mode: Prisma.QueryMode.insensitive } }),
            ...(gender && { sexo: gender }),
        };
        const [professionals, total] = await this.prismaService.$transaction([
            this.prismaService.professionals.findMany({
                skip: (page - 1) * limit,
                select: {
                    id: true,
                    nome: true,
                    sexo: true,
                    data_nascimento: true,
                    hobby: true,
                    nivel: true,
                },
                take: limit,
                where: where,
                orderBy: { data_nascimento: 'desc' },
            }),
            this.prismaService.professionals.count({
                where: where,
            }),
        ]);

        return {
            data: professionals.map(professional => ({
                id: professional.id,
                nome: professional.nome,
                sexo: professional.sexo,
                data_nascimento: professional.data_nascimento,
                hobby: professional.hobby,
                nivel: professional.nivel?.nivel ?? "",
            })),
            meta: {
                total,
                page,
                last_page: Math.ceil(total / limit),
            },
        };
    }

    async existsProfessionalForSeniorityLevel(levelId: string): Promise<boolean> {
        const count = await this.prismaService.professionals.count({
            where: { nivel_id: levelId },
        });
        
        return count > 0;
    }
}