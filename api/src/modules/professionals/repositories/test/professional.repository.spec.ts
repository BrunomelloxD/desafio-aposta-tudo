import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/common/prisma/services/prisma.service';
import { PaginationDto } from 'src/common/dtos/request/pagination.dto';
import { ProfessionalRepository } from '../professional.repository';
import { CreateProfessionalDto } from '../../dtos/request/create-professional.dto';

describe('ProfessionalRepository', () => {
    let repository: ProfessionalRepository;
    let prismaService: jest.Mocked<PrismaService>;

    const mockPrismaService = {
        professionals: {
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
                ProfessionalRepository,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();

        repository = module.get<ProfessionalRepository>(ProfessionalRepository);
        prismaService = module.get(PrismaService);
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
            const mockProfessional = {
                id: '1',
                nome: 'Lucas Martins',
                sexo: 'Masculino',
                data_nascimento: new Date('2000-03-14'),
                hobby: 'Games',
                nivel: { nivel: 'Júnior' },
            };

            mockPrismaService.professionals.create.mockResolvedValue(mockProfessional as any);

            const result = await repository.create(createProfessionalDto);

            expect(result).toEqual({
                id: '1',
                nome: 'Lucas Martins',
                sexo: 'Masculino',
                data_nascimento: new Date('2000-03-14'),
                hobby: 'Games',
                nivel: 'Júnior',
            });
            expect(mockPrismaService.professionals.create).toHaveBeenCalledWith({
                data: {
                    nome: createProfessionalDto.nome,
                    sexo: createProfessionalDto.sexo,
                    data_nascimento: createProfessionalDto.data_nascimento,
                    hobby: createProfessionalDto.hobby,
                    nivel_id: createProfessionalDto.nivel_id,
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
        });
    });

    describe('findOne', () => {
        it('should return a professional by id', async () => {
            const professionalId = '1';
            const mockProfessional = {
                id: professionalId,
                nome: 'Lucas Martins',
                sexo: 'Masculino',
                data_nascimento: new Date('2000-03-14'),
                hobby: 'Games',
                nivel: { nivel: 'Júnior' },
            };

            mockPrismaService.professionals.findUnique.mockResolvedValue(mockProfessional as any);

            const result = await repository.findOne(professionalId);

            expect(result).toEqual({
                id: professionalId,
                nome: 'Lucas Martins',
                sexo: 'Masculino',
                data_nascimento: new Date('2000-03-14'),
                hobby: 'Games',
                nivel: 'Júnior',
            });
        });

        it('should return null when professional not found', async () => {
            const professionalId = 'non-existent-id';

            mockPrismaService.professionals.findUnique.mockResolvedValue(null);

            const result = await repository.findOne(professionalId);

            expect(result).toBeNull();
        });
    });

    describe('findAll', () => {
        it('should return paginated professionals', async () => {
            const paginationDto: PaginationDto = { page: 1, limit: 10 };
            const professionals = [
                {
                    id: '1',
                    nome: 'Lucas Martins',
                    sexo: 'Masculino',
                    data_nascimento: new Date('2000-03-14'),
                    hobby: 'Games',
                    nivel: { nivel: 'Júnior' },
                },
            ];
            const total = 1;

            mockPrismaService.$transaction.mockResolvedValue([professionals, total]);

            const result = await repository.findAll(paginationDto);

            expect(result).toEqual({
                data: [
                    {
                        id: '1',
                        nome: 'Lucas Martins',
                        sexo: 'Masculino',
                        data_nascimento: new Date('2000-03-14'),
                        hobby: 'Games',
                        nivel: 'Júnior',
                    },
                ],
                meta: {
                    total: 1,
                    page: 1,
                    last_page: 1,
                },
            });
        });

        it('should filter professionals by search term', async () => {
            const paginationDto: PaginationDto = { page: 1, limit: 10, search: 'Lucas' };
            const professionals = [
                {
                    id: '1',
                    nome: 'Lucas Martins',
                    sexo: 'Masculino',
                    data_nascimento: new Date('2000-03-14'),
                    hobby: 'Games',
                    nivel: { nivel: 'Júnior' },
                },
            ];
            const total = 1;

            mockPrismaService.$transaction.mockResolvedValue([professionals, total]);

            const result = await repository.findAll(paginationDto);

            expect(result.data).toHaveLength(1);
            expect(result.data[0].nome).toContain('Lucas');
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
                hobby: 'Games e Programação',
            };
            const updatedProfessional = {
                id: professionalId,
                nome: 'Lucas Martins Silva',
                sexo: 'Masculino',
                data_nascimento: new Date('2000-03-14'),
                hobby: 'Games e Programação',
                nivel: { nivel: 'Júnior' },
            };

            mockPrismaService.professionals.update.mockResolvedValue(updatedProfessional as any);

            const result = await repository.update(professionalId, updateProfessionalDto);

            expect(result.nome).toBe('Lucas Martins Silva');
            expect(result.hobby).toBe('Games e Programação');
        });
    });

    describe('delete', () => {
        it('should delete a professional', async () => {
            const professionalId = '1';

            mockPrismaService.professionals.delete.mockResolvedValue({} as any);

            await repository.delete(professionalId);

            expect(mockPrismaService.professionals.delete).toHaveBeenCalledWith({
                where: { id: professionalId },
            });
        });
    });
});
