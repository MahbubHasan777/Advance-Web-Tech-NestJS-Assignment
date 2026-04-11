import { Body, Controller, Get, Post } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dtos/create-enrollment.dto';

@Controller('enrollment')
export class EnrollmentController {
    constructor(private readonly enrollmentService: EnrollmentService){}

    @Get()
    async getEnrollment(){
        return this.enrollmentService.getEnrollment();
    }

    @Post()
    async createEnrollment(@Body() body: CreateEnrollmentDto){
        return this.enrollmentService.createEnrollment(body);
    }
}
