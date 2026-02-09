import { Module } from "@nestjs/common";
import { ProfessionalController } from "./controllers/professional.controller";
import { PrismaService } from "src/common/prisma/services/prisma.service";
import { ProfessionalService } from "./services/professional.service";
import { ProfessionalRepository } from "./repositories/professional.repository";
import { LevelRepository } from "../levels/repositories/level.repository";

@Module({
  imports: [],
    controllers: [ProfessionalController],
    providers: [PrismaService, ProfessionalService, ProfessionalRepository, LevelRepository],
})
export class ProfessionalModule { }