import { CreateLevelDto } from "../dtos/create-level.dto";
import { LevelResponseDto } from "../dtos/response/level-response.dto";
import { IBaseRepository } from "src/common/interfaces/base-repository.interface";

export abstract class ILevelRepository extends IBaseRepository<LevelResponseDto, CreateLevelDto, CreateLevelDto> {
    abstract existsByName(name: string): Promise<boolean>;
}