import { forwardRef, Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from '../enrollment/dtos/create-enrollment.dto';
import { EnrollmentService } from '../enrollment/enrollment.service';

@Injectable()
export class NotificationService {
    constructor(private readonly enrollmentService: EnrollmentService){}
    async checkNotification(obj: CreateEnrollmentDto){
        const data = await this.enrollmentService.getEnrollment();
        const findData = data.find(elem=> JSON.stringify(elem) === JSON.stringify(obj))
        return {
            message: findData == undefined ? "Not found!" : "Found!",
            data: findData
        };
    }

    async sendNotification(obj: CreateEnrollmentDto){
        const data = await this.enrollmentService.getEnrollment();
        const findData = data.find(elem=> JSON.stringify(elem) === JSON.stringify(obj))
        return {
            message: "Welcome",
            studentName: findData?.studentName
        };
    }

    
}
