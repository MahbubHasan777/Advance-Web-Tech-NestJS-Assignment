import { CreateEnrollmentDto } from '../enrollment/dtos/create-enrollment.dto';
import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    checkNotification(body: CreateEnrollmentDto): Promise<{
        message: string;
        data: CreateEnrollmentDto | undefined;
    }>;
    sendNotification(body: CreateEnrollmentDto): Promise<{
        message: string;
        studentName: string | undefined;
    }>;
}
