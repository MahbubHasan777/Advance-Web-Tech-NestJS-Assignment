import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dtos/create-course.dto';
import { UpdateCourseDto } from './dtos/update-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }

    @Get()
    async getAllCourses() {
        return {
            message: "All courses fetched successfully",
            data: await this.courseService.getAllCourses()
        }
    }

    @Get("/:id")
    async getCourseById(@Param("id", ParseIntPipe) id: number) {
        return {
            message: "Course fetched successfully",
            data: await this.courseService.getCourseById(id)
        }
    }

    @Post()
    async createCourse(@Body() obj: CreateCourseDto) {
        return {
            message: "Course created successfully",
            data: await this.courseService.createCourse(obj)
        }
    }

    @Patch("/:id")
    async patchCourse(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateCourseDto) {
        return {
            message: "Course patched successfully",
            data: await this.courseService.patchCourse(id, body)
        }
    }

    @Put("/:id")
    async updateCourse(@Param("id", ParseIntPipe) id: number, @Body() body: CreateCourseDto) {
        return {
            message: "Course updated successfully",
            data: await this.courseService.updateCourse(id, body)
        }
    }

    @Delete("/:id")
    async deleteCourse(@Param("id", ParseIntPipe) id: number) {
        return {
            message: "Course deleted successfully",
            data: await this.courseService.deleteCourse(id)
        }
    }

    @Post(':id/upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './src/upload',
                filename: (req, file, cb) => {
                    const uniqueName =
                        Date.now() + '-' + Math.round(Math.random() * 1e9);

                    const ext = extname(file.originalname);
                    cb(null, `${uniqueName}${ext}`);
                },
            }),
            limits: {
                fileSize: 2 * 1024 * 1024
            },
            fileFilter: (req, file, cb) => {
                const allowed = /jpg|jpeg|png|pdf/;
                const ext = file.originalname.split('.').pop()?.toLowerCase();

                if (ext && allowed.test(ext)) {
                    cb(null, true);
                } else {
                    cb(
                        new BadRequestException(
                            'Only jpg, jpeg, png, pdf allowed',
                        ),
                        false,
                    );
                }
            },
        }),
    )
    async uploadCourseMaterial(
        @Param("id", ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.courseService.uploadCourseMaterial(id, file);
    }
}
