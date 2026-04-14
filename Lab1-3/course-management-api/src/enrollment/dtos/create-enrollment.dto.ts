import { IsInt, IsString } from "class-validator";

export class CreateEnrollmentDto{
    @IsString()
    studentName!: string

    @IsInt()
    courseId!: number
}