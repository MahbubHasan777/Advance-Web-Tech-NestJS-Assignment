import { Body, Controller, Post } from '@nestjs/common';
import { CreateEnrollmentDto } from '../enrollment/dtos/create-enrollment.dto';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService){}
    @Post("/check")
    checkNotification(@Body() body: CreateEnrollmentDto){
        return this.notificationService.checkNotification(body);
    }

    @Post("/send")
    sendNotification(@Body() body: CreateEnrollmentDto){
        return this.notificationService.sendNotification(body);
    }

}
