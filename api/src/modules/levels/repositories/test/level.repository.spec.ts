import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/common/prisma/services/prisma.service';
import { PaginationDto } from 'src/common/dtos/request/pagination.dto';
import { LevelRepository } from '../level.repository';
import { CreateLevelDto } from '../../dtos/request/create-level.dto';

describe('LevelRepository', () => {
    let repository: LevelRepository;
    let prismaService: jest.Mocked<PrismaService>;

    const mockPrismaService = {
        niveis: {
            create: jest.fn(),
            findUnique: jest.fn(),
            findMany: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            count: jest.fn(),
        },
        $transaction: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LevelRepository,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();

        repository = module.get<LevelRepository>(LevelRepository);
        prismaService = module.get(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new level', async () => {
            const createLevelDto: CreateLevelDto = { nome: 'Júnior' };
            const expectedLevel = { id: '1', nivel: 'Júnior' };

            mockPrismaService.niveis.create.mockResolvedValue(expectedLevel);

            const result = await repository.create(createLevelDto);

            expect(result).toEqual(expectedLevel);
            expect(mockPrismaService.niveis.create).toHaveBeenCalledWith({
                data: { nivel: createLevelDto.nome },
            });
        });
    });

    describe('findOne', () => {
        it('should return a level by id', async () => {
            const levelId = '1';
            const expectedLevel = { id: levelId, nivel: 'Júnior' };

            mockPrismaService.niveis.findUnique.mockResolvedValue(expectedLevel);

            const result = await repository.findOne(levelId);

            expect(result).toEqual(expectedLevel);
            expect(mockPrismaService.niveis.findUnique).toHaveBeenCalledWith({
                where: { id: levelId },
            });
        });

        it('should return null when level not found', async () => {
            const levelId = 'non-existent-id';

            mockPrismaService.niveis.findUnique.mockResolvedValue(null);

            const result = await repository.findOne(levelId);

            expect(result).toBeNull();
        });
    });

    describe('findAll', () => {
        it('should return paginated levels', async () => {
            const paginationDto: PaginationDto = { page: 1, limit: 10 };
            const levels = [
                { id: '1', nivel: 'Júnior' },
                { id: '2', nivel: 'Pleno' },
            ];
            const total = 2;

            mockPrismaService.$transaction.mockResolvedValue([levels, total]);

            const result = await repository.findAll(paginationDto);

            expect(result).toEqual({
                data: levels,
                meta: {
                    total: 2,
                    page: 1,
                    last_page: 1,
                },
            });
            expect(mockPrismaService.$transaction).toHaveBeenCalled();
        });

        it('should filter levels by search term', async () => {
            const paginationDto: PaginationDto = { page: 1, limit: 10, search: 'Sênior' };
            const levels = [{ id: '3', nivel: 'Sênior' }];
            const total = 1;

            mockPrismaService.$transaction.mockResolvedValue([levels, total]);

            const result = await repository.findAll(paginationDto);

            expect(result.data).toHaveLength(1);
            expect(result.data[0].nivel).toBe('Sênior');
        });
    });

    describe('update', () => {
        it('should update a level', async () => {
            const levelId = '1';
            const updateLevelDto: CreateLevelDto = { nome: 'Sênior' };
            const updatedLevel = { id: levelId, nivel: 'Sênior' };

            mockPrismaService.niveis.update.mockResolvedValue(updatedLevel);

            const result = await repository.update(levelId, updateLevelDto);

            expect(result).toEqual(updatedLevel);
            expect(mockPrismaService.niveis.update).toHaveBeenCalledWith({
                where: { id: levelId },
                data: { nivel: updateLevelDto.nome },
            });
        });
    });

    describe('delete', () => {
        it('should delete a level', async () => {
            const levelId = '1';

            mockPrismaService.niveis.delete.mockResolvedValue({ id: levelId, nivel: 'Júnior' });

            await repository.delete(levelId);

            expect(mockPrismaService.niveis.delete).toHaveBeenCalledWith({
                where: { id: levelId },
            });
        });
    });
});
