import { Test, TestingModule } from '@nestjs/testing';
import { PaginationDto } from 'src/common/dtos/request/pagination.dto';
import { NotFoundException } from '@nestjs/common';
import { ProfessionalController } from '../professional.controller';
import { ProfessionalService } from '../../services/professional.service';
import { CreateProfessionalDto } from '../../dtos/request/create-professional.dto';

describe('ProfessionalController', () => {
    let controller: ProfessionalController;
    let service: jest.Mocked<ProfessionalService>;

    const mockProfessionalService = {
        create: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProfessionalController],
            providers: [
                {
                    provide: ProfessionalService,
                    useValue: mockProfessionalService,
                },
            ],
        }).compile();

        controller = module.get<ProfessionalController>(ProfessionalController);
        service = module.get(ProfessionalService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new professional', async () => {
            const createProfessionalDto: CreateProfessionalDto = {
                nome: 'Lucas Martins',
                nivel_id: '1',
                sexo: 'Masculino',
                data_nascimento: new Date('2000-03-14'),
                hobby: 'Games',
            };
            const expectedResult = {
                id: '1',
                nome: 'Lucas Martins',
                nivel: 'Júnior',
                sexo: 'Masculino',
                data_nascimento: new Date('2000-03-14'),
                hobby: 'Games',
            };

            service.create.mockResolvedValue(expectedResult);

            const result = await controller.create(createProfessionalDto);

            expect(result).toEqual(expectedResult);
            expect(service.create).toHaveBeenCalledWith(createProfessionalDto);
            expect(service.create).toHaveBeenCalledTimes(1);
        });

        it('should throw NotFoundException when level does not exist', async () => {
            const createProfessionalDto: CreateProfessionalDto = {
                nome: 'Lucas Martins',
                nivel_id: 'non-existent-id',
                sexo: 'Masculino',
                data_nascimento: new Date('2000-03-14'),
                hobby: 'Games',
            };

            service.create.mockRejectedValue(
                new NotFoundException(`Nível com ID ${createProfessionalDto.nivel_id} não encontrado.`),
            );

            await expect(controller.create(createProfessionalDto)).rejects.toThrow(
                NotFoundException,
            );
        });
    });

    describe('findAll', () => {
        it('should return paginated professionals', async () => {
            const paginationDto: PaginationDto = { page: 1, limit: 10 };
            const expectedResult = {
                data: [
                    {
                        id: '1',
                        nome: 'Lucas Martins',
                        nivel: 'Júnior',
                        sexo: 'Masculino',
                        data_nascimento: new Date('2000-03-14'),
                        hobby: 'Games',
                        idade: 25,
                    },
                ],
                meta: {
                    total: 1,
                    page: 1,
                    last_page: 1,
                },
            };

            service.findAll.mockResolvedValue(expectedResult as any);

            const result = await controller.findAll(paginationDto);

            expect(result).toEqual(expectedResult);
            expect(service.findAll).toHaveBeenCalledWith(paginationDto);
        });
    });

    describe('update', () => {
        it('should update a professional', async () => {
            const professionalId = '1';
            const updateProfessionalDto: CreateProfessionalDto = {
                nome: 'Lucas Martins Silva',
                nivel_id: '1',
                sexo: 'Masculino',
                data_nascimento: new Date('2000-03-14'),
                hobby: 'Games',
            };

            service.update.mockResolvedValue(undefined);

            await controller.update(updateProfessionalDto, professionalId);

            expect(service.update).toHaveBeenCalledWith(professionalId, updateProfessionalDto);
            expect(service.update).toHaveBeenCalledTimes(1);
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

            service.update.mockRejectedValue(
                new NotFoundException(`Profissional com ID ${professionalId} não encontrado.`),
            );

            await expect(controller.update(updateProfessionalDto, professionalId)).rejects.toThrow(
                NotFoundException,
            );
        });
    });

    describe('delete', () => {
        it('should delete a professional', async () => {
            const professionalId = '1';

            service.delete.mockResolvedValue(undefined);

            await controller.delete(professionalId);

            expect(service.delete).toHaveBeenCalledWith(professionalId);
            expect(service.delete).toHaveBeenCalledTimes(1);
        });

        it('should throw NotFoundException when professional does not exist', async () => {
            const professionalId = 'non-existent-id';

            service.delete.mockRejectedValue(
                new NotFoundException(`Profissional com ID ${professionalId} não encontrado.`),
            );

            await expect(controller.delete(professionalId)).rejects.toThrow(NotFoundException);
        });
    });
});
