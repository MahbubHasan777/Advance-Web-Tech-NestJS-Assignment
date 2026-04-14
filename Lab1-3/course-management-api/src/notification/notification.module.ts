import { forwardRef, Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { EnrollmentModule } from '../enrollment/enrollment.module';

@Module({
  imports: [forwardRef(()=>EnrollmentModule)],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
