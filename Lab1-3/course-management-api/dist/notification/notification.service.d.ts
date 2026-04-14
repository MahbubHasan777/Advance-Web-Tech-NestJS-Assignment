import { CreateEnrollmentDto } from '../enrollment/dtos/create-enrollment.dto';
import { EnrollmentService } from '../enrollment/enrollment.service';
export declare class NotificationService {
    private readonly enrollmentService;
    constructor(enrollmentService: EnrollmentService);
    checkNotification(obj: CreateEnrollmentDto): Promise<{
        message: string;
        data: CreateEnrollmentDto | undefined;
    }>;
    sendNotification(obj: CreateEnrollmentDto): Promise<{
        message: string;
        studentName: string | undefined;
    }>;
}
