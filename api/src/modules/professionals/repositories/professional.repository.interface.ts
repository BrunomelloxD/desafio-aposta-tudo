import { ProfessionalResponseDto } from "../dtos/response/professional-response.dto";
import { CreateProfessionalDto } from "../dtos/request/create-professional.dto";
import { IBaseRepository } from "src/common/interfaces/base-repository.interface";

export abstract class IProfessionalRepository extends IBaseRepository<ProfessionalResponseDto, CreateProfessionalDto, CreateProfessionalDto> {
    abstract existsProfessionalForSeniorityLevel(levelId: string): Promise<boolean>;
}