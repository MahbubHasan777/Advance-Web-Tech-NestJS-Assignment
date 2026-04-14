import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dtos/create-enrollment.dto';
export declare class EnrollmentController {
    private readonly enrollmentService;
    constructor(enrollmentService: EnrollmentService);
    getEnrollment(): Promise<CreateEnrollmentDto[]>;
    createEnrollment(body: CreateEnrollmentDto): Promise<CreateEnrollmentDto>;
}
