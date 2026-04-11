import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dtos/create-course.dto';
import { UpdateCourseDto } from './dtos/update-course.dto';
import { Express } from 'express';
import { Multer } from 'multer';

const data = [
    {
        "id": 1,
        "name": "Introduction to Computer Science",
        "code": "CS101",
        "instructor": "Mahbub Hasan",
        "credits": 3,
        "description": "Foundational programming concepts."
    },
    {
        "id": 2,
        "name": "Data Structures and Algorithms",
        "code": "CS202",
        "instructor": "MD. Limon",
        "credits": 4
    },
    {
        "id": 3,
        "name": "Web Development Basics",
        "code": "IT105",
        "instructor": "Ryan Dahl",
        "credits": 3,
        "description": "HTML, CSS, and modern JavaScript."
    }
]

@Injectable()
export class CourseService {
    async createCourse(obj: CreateCourseDto): Promise<CreateCourseDto> {
        data.unshift(obj);
        return obj;
    }

    async getAllCourses(): Promise<CreateCourseDto[]> {
        return data;
    }

    async getCourseById(id: number): Promise<CreateCourseDto> {
        const filteredData = data.find(elem => elem.id === id);
        if (filteredData) return filteredData;

        throw new NotFoundException();
    }

    async updateCourse(id: number, obj: CreateCourseDto): Promise<CreateCourseDto> {
        const idx = data.findIndex(elem => elem.id === id);
        if (idx === -1) throw new NotFoundException();
        const newData = { ...data[idx], ...obj };
        data[idx] = newData;
        return data[idx];

    }

    async patchCourse(id: number, obj: UpdateCourseDto): Promise<CreateCourseDto> {
        const idx = data.findIndex(elem => elem.id === id);
        if (idx === -1) throw new NotFoundException();
        data[idx] = { ...data[idx], ...obj };
        return data[idx];

    }

    async deleteCourse(id: number): Promise<CreateCourseDto> {
        const idx = data.findIndex(elem => elem.id === id);
        if (idx === -1) throw new NotFoundException();
        const deleted = data[idx];
        data.splice(idx, 1);
        return deleted;

    }

    async uploadCourseMaterial(id: number, file: Express.Multer.File) {
        await this.getCourseById(id);

        if (!file) {
            throw new NotFoundException("File not found or Wrong ID input");
        }

        return {
            message: "File Uploaded successfully",
            courseId: id,
            filename: file.originalname,
            size: file.size
        }
    }
}
