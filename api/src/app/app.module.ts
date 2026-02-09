import { Module } from '@nestjs/common';
import { LevelModule } from 'src/modules/levels/level.module';
import { ProfessionalModule } from 'src/modules/professionals/professional.module';

@Module({
  imports: [ProfessionalModule, LevelModule]
})
export class AppModule { }
