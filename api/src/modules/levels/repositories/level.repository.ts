import { PrismaService } from "src/common/prisma/services/prisma.service";
import { ILevelRepository } from "./level.repository.interface";
import { Injectable } from "@nestjs/common";
import { PaginationDto } from "src/common/dtos/request/pagination.dto";
import { PaginatedResponseDto } from "src/common/dtos/response/paginated-response.dto";
import { CreateLevelDto } from "../dtos/request/create-level.dto";
import { LevelResponseDto } from "../dtos/response/level-response.dto";

@Injectable()
export class LevelRepository implements ILevelRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async existsByName(name: string): Promise<boolean> {
        const count = await this.prismaService.niveis.count({
            where: { nivel: name },
        });
        
        return count > 0;
    }

    async update(id: string, data: CreateLevelDto): Promise<LevelResponseDto> {
        return await this.prismaService.niveis.update({
            where: { id },
            data: {
                nivel: data.nome,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await this.prismaService.niveis.delete({
            where: { id },
        });
    }

    async create(data: CreateLevelDto): Promise<LevelResponseDto> {
        return await this.prismaService.niveis.create({
            data: {
                nivel: data.nome,
            },
        });
    }

    async findAll({ page = 1, limit = 10, search }: PaginationDto): Promise<PaginatedResponseDto<LevelResponseDto>> {
        const [levels, total] = await this.prismaService.$transaction([
            this.prismaService.niveis.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: { nivel: { contains: search, mode: 'insensitive' } },
                orderBy: { nivel: 'desc' },
            }),
            this.prismaService.niveis.count({
                where: { nivel: { contains: search, mode: 'insensitive' } },
            }),
        ]);

        return {
            data: levels,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: string): Promise<LevelResponseDto | null> {
        return await this.prismaService.niveis.findUnique({
            where: { id },
        });
    }
}