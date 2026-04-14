import { CourseService } from './course.service';
import { CreateCourseDto } from './dtos/create-course.dto';
import { UpdateCourseDto } from './dtos/update-course.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    getAllCourses(): Promise<{
        message: string;
        data: CreateCourseDto[];
    }>;
    getCourseById(id: number): Promise<{
        message: string;
        data: CreateCourseDto;
    }>;
    createCourse(obj: CreateCourseDto): Promise<{
        message: string;
        data: CreateCourseDto;
    }>;
    patchCourse(id: number, body: UpdateCourseDto): Promise<{
        message: string;
        data: CreateCourseDto;
    }>;
    updateCourse(id: number, body: CreateCourseDto): Promise<{
        message: string;
        data: CreateCourseDto;
    }>;
    deleteCourse(id: number): Promise<{
        message: string;
        data: CreateCourseDto;
    }>;
    uploadCourseMaterial(id: number, file: Express.Multer.File): Promise<{
        message: string;
        courseId: number;
        filename: string;
        size: number;
    }>;
}
