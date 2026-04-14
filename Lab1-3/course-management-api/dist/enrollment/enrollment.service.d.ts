import { CreateEnrollmentDto } from './dtos/create-enrollment.dto';
import { CourseService } from '../course/course.service';
export declare class EnrollmentService {
    private readonly courseService;
    constructor(courseService: CourseService);
    getEnrollment(): Promise<CreateEnrollmentDto[]>;
    createEnrollment(obj: CreateEnrollmentDto): Promise<CreateEnrollmentDto>;
}
