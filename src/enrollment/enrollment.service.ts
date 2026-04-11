import { Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dtos/create-enrollment.dto';
import { CourseService } from '../course/course.service';

const enrollmentData = [
    {"studentName": "Mahbub Hasan", courseId: 1},
    {"studentName": "Mahbub Hasan", courseId: 2},
    {"studentName": "Limon", courseId: 1},
]

@Injectable()
export class EnrollmentService {
    constructor(private readonly courseService: CourseService){}

    public async getEnrollment(): Promise<CreateEnrollmentDto[]>{
        return enrollmentData;
    }
    
    public async createEnrollment(obj: CreateEnrollmentDto): Promise<CreateEnrollmentDto>{
        const {courseId} = obj;
        await this.courseService.getCourseById(courseId);

        await enrollmentData.unshift(obj);
        return obj;

    }
}
