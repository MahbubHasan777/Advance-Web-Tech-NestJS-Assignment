import { forwardRef, Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [CourseModule],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
  exports: [forwardRef(()=>EnrollmentService)]
})
export class EnrollmentModule {}
