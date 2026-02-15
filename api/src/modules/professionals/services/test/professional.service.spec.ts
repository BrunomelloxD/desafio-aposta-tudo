import { Test, TestingModule } from '@nestjs/testing';
import { LevelRepository } from 'src/modules/levels/repositories/level.repository';
import { NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/request/pagination.dto';
import { ProfessionalService } from '../professional.service';
import { ProfessionalRepository } from '../../repositories/professional.repository';
import { CreateProfessionalDto } from '../../dtos/request/create-professional.dto';
import { ProfessionalResponseDto } from '../../dtos/response/professional-response.dto';

describe('ProfessionalService', () => {
    let service: ProfessionalService;
    let professionalRepository: jest.Mocked<ProfessionalRepository>;
    let levelRepository: jest.Mocked<LevelRepository>;

    const mockProfessionalRepository = {
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findAll: jest.fn(),
    };

    const mockLevelRepository = {
        findOne: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProfessionalService,
                {
                    provide: ProfessionalRepository,
                    useValue: mockProfessionalRepository,
                },
                {
                    provide: LevelRepository,
                    useValue: mockLevelRepository,
                },
            ],
        }).compile();

        service = module.get<ProfessionalService>(ProfessionalService);
        professionalRepository = module.get(ProfessionalRepository);
        levelRepository = module.get(LevelRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new professional successfully', async () => {
            const createProfessionalDto: CreateProfessionalDto = {
                nome: 'Lucas Martins',
                nivel_id: '1',
                sexo: 'Masculino',
                data_nascimento: new Date('2000-03-14'),
                hobby: 'Games',
            };
            const expectedLevel = { id: '1', nivel: 'Júnior' };
            const expectedResult: ProfessionalResponseDto = {
                id: '1',
                nome: 'Lucas Martins',
                nivel: 'Júnior',
                sexo: 'Masculino',
                data_nascimento: new Date('2000-03-14'),
                hobby: 'Games',
            };

            levelRepository.findOne.mockResolvedValue(expectedLevel);
            professionalRepository.create.mockResolvedValue(expectedResult);

            const result = await service.create(createProfessionalDto);

            expect(result).toEqual(expectedResult);
            expect(levelRepository.findOne).toHaveBeenCalledWith(createProfessionalDto.nivel_id);
            expect(professionalRepository.create).toHaveBeenCalledWith(createProfessionalDto);
        });

        it('should throw NotFoundException when level does not exist', async () => {
            const createProfessionalDto: CreateProfessionalDto = {
                nome: 'Lucas Martins',
                nivel_id: 'non-existent-id',
                sexo: 'Masculino',
                data_nascimento: new Date('2000-03-14'),
                hobby: 'Games',
            };

            levelRepository.findOne.mockResolvedValue(null);

            await expect(service.create(createProfessionalDto)).rejects.toThrow(
                new NotFoundException(`Nível com ID ${createProfessionalDto.nivel_id} não encontrado.`),
            );

            expect(levelRepository.findOne).toHaveBeenCalledWith(createProfessionalDto.nivel_id);
            expect(professionalRepository.create).not.toHaveBeenCalled();
        });
    });

    describe('findAll', () => {
        it('should return paginated professionals with calculated age', async () => {
            const paginationDto: PaginationDto = { page: 1, limit: 10 };
            const mockProfessionals = {
                data: [
                    {
                        id: '1',
                        nome: 'Lucas Martins',
                        nivel: 'Júnior',
                        sexo: 'Masculino',
                        data_nascimento: new Date('2000-03-14'),
                        hobby: 'Games',
                    },
                ],
                meta: {
                    total: 1,
                    page: 1,
                    last_page: 1,
                },
            };

            professionalRepository.findAll.mockResolvedValue(mockProfessionals);

            const result = await service.findAll(paginationDto);

            expect(result.data).toHaveLength(1);
            expect(result.data[0]).toHaveProperty('idade');
            expect(professionalRepository.findAll).toHaveBeenCalledWith(paginationDto);
        });
    });

    describe('update', () => {
        it('should update a professional successfully', async () => {
            const professionalId = '1';
            const updateProfessionalDto: CreateProfessionalDto = {
                nome: 'Lucas Martins Silva',
                nivel_id: '1',
                sexo: 'Masculino',
                data_nascimento: new Date('2000-03-14'),
                hobby: 'Games',
            };
            const existingLevel = { id: '1', nivel: 'Júnior' };
            const existingProfessional: ProfessionalResponseDto = {
                id: professionalId,
                nome: 'Lucas Martins',
                nivel: 'Júnior',
                sexo: 'Masculino',
                data_nascimento: new Date('2000-03-14'),
                hobby: 'Games',
            };

            levelRepository.findOne.mockResolvedValue(existingLevel);
            professionalRepository.findOne.mockResolvedValue(existingProfessional);
            professionalRepository.update.mockResolvedValue({ ...existingProfessional, ...updateProfessionalDto });

            await service.update(professionalId, updateProfessionalDto);

            expect(levelRepository.findOne).toHaveBeenCalledWith(updateProfessionalDto.nivel_id);
            expect(professionalRepository.findOne).toHaveBeenCalledWith(professionalId);
            expect(professionalRepository.update).toHaveBeenCalledWith(professionalId, updateProfessionalDto);
        });

        it('should throw NotFoundException when level does not exist', async () => {
            const professionalId = '1';
            const updateProfessionalDto: CreateProfessionalDto = {
                nome: 'Lucas Martins',
                nivel_id: 'non-existent-id',
                sexo: 'Masculino',
                data_nascimento: new Date('2000-03-14'),
                hobby: 'Games',
            };

            levelRepository.findOne.mockResolvedValue(null);

            await expect(service.update(professionalId, updateProfessionalDto)).rejects.toThrow(
                new NotFoundException(`Nível com ID ${updateProfessionalDto.nivel_id} não encontrado.`),
            );

            expect(professionalRepository.findOne).not.toHaveBeenCalled();
            expect(professionalRepository.update).not.toHaveBeenCalled();
        });

        it('should throw NotFoundException when professional does not exist', async () => {
            const professionalId = 'non-existent-id';
            const updateProfessionalDto: CreateProfessionalDto = {
                nome: 'Lucas Martins',
                nivel_id: '1',
                sexo: 'Masculino',
                data_nascimento: new Date('2000-03-14'),
                hobby: 'Games',
            };
            const existingLevel = { id: '1', nivel: 'Júnior' };

            levelRepository.findOne.mockResolvedValue(existingLevel);
            professionalRepository.findOne.mockResolvedValue(null);

            await expect(service.update(professionalId, updateProfessionalDto)).rejects.toThrow(
                new NotFoundException(`Profissional com ID ${professionalId} não encontrado.`),
            );

            expect(professionalRepository.update).not.toHaveBeenCalled();
        });
    });

    describe('delete', () => {
        it('should delete a professional successfully', async () => {
            const professionalId = '1';
            const existingProfessional: ProfessionalResponseDto = {
                id: professionalId,
                nome: 'Lucas Martins',
                nivel: 'Júnior',
                sexo: 'Masculino',
                data_nascimento: new Date('2000-03-14'),
                hobby: 'Games',
            };

            professionalRepository.findOne.mockResolvedValue(existingProfessional);
            professionalRepository.delete.mockResolvedValue(undefined);

            await service.delete(professionalId);

            expect(professionalRepository.findOne).toHaveBeenCalledWith(professionalId);
            expect(professionalRepository.delete).toHaveBeenCalledWith(professionalId);
        });

        it('should throw NotFoundException when professional does not exist', async () => {
            const professionalId = 'non-existent-id';

            professionalRepository.findOne.mockResolvedValue(null);

            await expect(service.delete(professionalId)).rejects.toThrow(
                new NotFoundException(`Profissional com ID ${professionalId} não encontrado.`),
            );

            expect(professionalRepository.delete).not.toHaveBeenCalled();
        });
    });
});
