import { CreateCourseDto } from './dtos/create-course.dto';
import { UpdateCourseDto } from './dtos/update-course.dto';
export declare class CourseService {
    createCourse(obj: CreateCourseDto): Promise<CreateCourseDto>;
    getAllCourses(): Promise<CreateCourseDto[]>;
    getCourseById(id: number): Promise<CreateCourseDto>;
    updateCourse(id: number, obj: CreateCourseDto): Promise<CreateCourseDto>;
    patchCourse(id: number, obj: UpdateCourseDto): Promise<CreateCourseDto>;
    deleteCourse(id: number): Promise<CreateCourseDto>;
    uploadCourseMaterial(id: number, file: Express.Multer.File): Promise<{
        message: string;
        courseId: number;
        filename: string;
        size: number;
    }>;
}
