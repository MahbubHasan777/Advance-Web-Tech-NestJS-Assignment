import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CourseService } from './course.service';
import type { CourseDto } from './dtos/course.dto';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService){}

    @Get()
    async getAllCourse(){
        return await this.courseService.getAllCourses();
    }

    @Get("/:id")
    async getCourse(@Param("id", ParseIntPipe) id: number){
        return await this.courseService.getCourse(id);
    }

    @Post()
    async createCourse(@Body() obj: CourseDto){
        return await this.courseService.createData(obj);
    }

    @Patch("/:id")
    async updateCoursePatch(@Param("id", ParseIntPipe) id: number, @Body() body: Partial<CourseDto>){
        return await this.courseService.updateCoursePatch(id, body);
    }

    @Put("/:id")
    async updateCoursePut(@Param("id", ParseIntPipe) id: number, @Body() body: Partial<CourseDto>){
        return await this.courseService.updateCoursePatch(id, body);
    }

    @Delete("/:id")
    async deleteCourse(@Param("id", ParseIntPipe) id: number){
        return await this.courseService.deleteCourse(id);
    }
}
