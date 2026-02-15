import { Test, TestingModule } from '@nestjs/testing';
import { PaginationDto } from 'src/common/dtos/request/pagination.dto';
import { NotFoundException } from '@nestjs/common';
import { LevelController } from '../level.controller';
import { LevelService } from '../../services/level.service';
import { CreateLevelDto } from '../../dtos/request/create-level.dto';

describe('LevelController', () => {
    let controller: LevelController;
    let service: jest.Mocked<LevelService>;

    const mockLevelService = {
        create: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LevelController],
            providers: [
                {
                    provide: LevelService,
                    useValue: mockLevelService,
                },
            ],
        }).compile();

        controller = module.get<LevelController>(LevelController);
        service = module.get(LevelService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new level', async () => {
            const createLevelDto: CreateLevelDto = { nome: 'Júnior' };
            const expectedResult = { id: '1', nivel: 'Júnior' };

            service.create.mockResolvedValue(expectedResult);

            const result = await controller.create(createLevelDto);

            expect(result).toEqual(expectedResult);
            expect(service.create).toHaveBeenCalledWith(createLevelDto);
            expect(service.create).toHaveBeenCalledTimes(1);
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

            service.findAll.mockResolvedValue(expectedResult);

            const result = await controller.findAll(paginationDto);

            expect(result).toEqual(expectedResult);
            expect(service.findAll).toHaveBeenCalledWith(paginationDto);
        });
    });

    describe('update', () => {
        it('should update a level', async () => {
            const levelId = '1';
            const updateLevelDto: CreateLevelDto = { nome: 'Sênior' };

            service.update.mockResolvedValue(undefined);

            await controller.update(updateLevelDto, levelId);

            expect(service.update).toHaveBeenCalledWith(levelId, updateLevelDto);
            expect(service.update).toHaveBeenCalledTimes(1);
        });

        it('should throw NotFoundException when level does not exist', async () => {
            const levelId = 'non-existent-id';
            const updateLevelDto: CreateLevelDto = { nome: 'Sênior' };

            service.update.mockRejectedValue(
                new NotFoundException(`Nível com ID ${levelId} não encontrado.`),
            );

            await expect(controller.update(updateLevelDto, levelId)).rejects.toThrow(
                NotFoundException,
            );
        });
    });

    describe('delete', () => {
        it('should delete a level', async () => {
            const levelId = '1';

            service.delete.mockResolvedValue(undefined);

            await controller.delete(levelId);

            expect(service.delete).toHaveBeenCalledWith(levelId);
            expect(service.delete).toHaveBeenCalledTimes(1);
        });

        it('should throw NotFoundException when level does not exist', async () => {
            const levelId = 'non-existent-id';

            service.delete.mockRejectedValue(
                new NotFoundException(`Nível com ID ${levelId} não encontrado.`),
            );

            await expect(controller.delete(levelId)).rejects.toThrow(NotFoundException);
        });
    });
});
