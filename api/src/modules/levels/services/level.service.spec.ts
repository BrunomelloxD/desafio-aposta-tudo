import { Test, TestingModule } from '@nestjs/testing';
import { LevelService } from './level.service';
import { LevelRepository } from '../repositories/level.repository';
import { ProfessionalRepository } from 'src/modules/professionals/repositories/professional.repository';
import { NotFoundException } from '@nestjs/common';
import { CreateLevelDto } from '../dtos/create-level.dto';
import { LevelResponseDto } from '../dtos/response/level-response.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

describe('LevelService', () => {
    let service: LevelService;
    let repository: jest.Mocked<LevelRepository>;
    let professionalRepository: jest.Mocked<ProfessionalRepository>;

    const mockLevelRepository = {
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findAll: jest.fn(),
    };

    const mockProfessionalRepository = {
        existsProfessionalForSeniorityLevel: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LevelService,
                {
                    provide: LevelRepository,
                    useValue: mockLevelRepository,
                },
                {
                    provide: ProfessionalRepository,
                    useValue: mockProfessionalRepository,
                },
            ],
        }).compile();

        service = module.get<LevelService>(LevelService);
        repository = module.get(LevelRepository);
        professionalRepository = module.get(ProfessionalRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new level successfully', async () => {
            const createLevelDto: CreateLevelDto = { nome: 'Júnior' };
            const expectedResult: LevelResponseDto = {
                id: '1',
                nivel: 'Júnior',
            };

            repository.create.mockResolvedValue(expectedResult);

            const result = await service.create(createLevelDto);

            expect(result).toEqual(expectedResult);
            expect(repository.create).toHaveBeenCalledWith(createLevelDto);
            expect(repository.create).toHaveBeenCalledTimes(1);
        });
    });

    describe('findAll', () => {
        it('should return paginated levels', async () => {
            const paginationDto: PaginationDto = { page: 1, limit: 10 };
            const expectedResult = {
                data: [
                    { id: '1', nivel: 'Júnior' },
                    { id: '2', nivel: 'Pleno' },
                ],
                meta: {
                    total: 2,
                    page: 1,
                    last_page: 1,
                },
            };

            repository.findAll.mockResolvedValue(expectedResult);

            const result = await service.findAll(paginationDto);

            expect(result).toEqual(expectedResult);
            expect(repository.findAll).toHaveBeenCalledWith(paginationDto);
            expect(repository.findAll).toHaveBeenCalledTimes(1);
        });
    });

    describe('update', () => {
        it('should update a level successfully', async () => {
            const levelId = '1';
            const updateLevelDto: CreateLevelDto = { nome: 'Sênior' };
            const existingLevel: LevelResponseDto = {
                id: levelId,
                nivel: 'Júnior',
            };

            repository.findOne.mockResolvedValue(existingLevel);
            repository.update.mockResolvedValue({ ...existingLevel, nivel: 'Sênior' });

            await service.update(levelId, updateLevelDto);

            expect(repository.findOne).toHaveBeenCalledWith(levelId);
            expect(repository.update).toHaveBeenCalledWith(levelId, updateLevelDto);
            expect(repository.update).toHaveBeenCalledTimes(1);
        });

        it('should throw NotFoundException when level does not exist', async () => {
            const levelId = 'non-existent-id';
            const updateLevelDto: CreateLevelDto = { nome: 'Sênior' };

            repository.findOne.mockResolvedValue(null);

            await expect(service.update(levelId, updateLevelDto)).rejects.toThrow(
                new NotFoundException(`Nível com ID ${levelId} não encontrado.`),
            );

            expect(repository.findOne).toHaveBeenCalledWith(levelId);
            expect(repository.update).not.toHaveBeenCalled();
        });
    });

    describe('delete', () => {
        it('should delete a level successfully', async () => {
            const levelId = '1';
            const existingLevel: LevelResponseDto = {
                id: levelId,
                nivel: 'Júnior',
            };

            repository.findOne.mockResolvedValue(existingLevel);
            repository.delete.mockResolvedValue(undefined);

            await service.delete(levelId);

            expect(repository.findOne).toHaveBeenCalledWith(levelId);
            expect(repository.delete).toHaveBeenCalledWith(levelId);
            expect(repository.delete).toHaveBeenCalledTimes(1);
        });

        it('should throw NotFoundException when level does not exist', async () => {
            const levelId = 'non-existent-id';

            repository.findOne.mockResolvedValue(null);

            await expect(service.delete(levelId)).rejects.toThrow(
                new NotFoundException(`Nível com ID ${levelId} não encontrado.`),
            );

            expect(repository.findOne).toHaveBeenCalledWith(levelId);
            expect(repository.delete).not.toHaveBeenCalled();
        });
    });
});
