import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCourseDto{
    @IsInt()
    @IsNotEmpty()
    id!: number;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    code!: string;

    @IsInt()
    @IsNotEmpty()
    credits!: number;

    @IsString()
    @IsNotEmpty()
    instructor!: string;

    @IsString()
    @IsOptional()
    description?: string;


}