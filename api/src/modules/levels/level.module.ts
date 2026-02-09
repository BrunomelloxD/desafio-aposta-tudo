import { Module } from "@nestjs/common";
import { LevelController } from "./controllers/level.controller";
import { ProfessionalRepository } from "../professionals/repositories/professional.repository";
import { LevelRepository } from "./repositories/level.repository";
import { LevelService } from "./services/level.service";
import { PrismaService } from "src/common/prisma/services/prisma.service";

@Module({
        controllers: [LevelController],
        providers: [PrismaService, LevelService, ProfessionalRepository, LevelRepository],
})
export class LevelModule { }