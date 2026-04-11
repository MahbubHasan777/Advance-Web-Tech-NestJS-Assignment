import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseDto } from './dtos/course.dto';

const data = [
    {id: 1, courseName: "Introduction to Computer Science", credit: 3},
    {id: 2, courseName: "Structured Programming", credit: 3},
    {id: 3, courseName: "Object Oriented Programming", credit: 3},
    {id: 4, courseName: "Data Structures", credit: 3},
    {id: 5, courseName: "Algorithms", credit: 3},
    {id: 6, courseName: "Discrete Mathematics", credit: 3},
    {id: 7, courseName: "Database Management System", credit: 3},
    {id: 8, courseName: "Operating Systems", credit: 3},
    {id: 9, courseName: "Computer Networks", credit: 3},
    {id: 10, courseName: "Software Engineering", credit: 3},
    {id: 11, courseName: "Artificial Intelligence", credit: 3},
    {id: 12, courseName: "Computer Graphics", credit: 3},
]

@Injectable()
export class CourseService {
    async createData(obj: CourseDto): Promise<CourseDto>{
        data.unshift(obj);
        return obj;
    }

    async getAllCourses(): Promise<CourseDto[]>{
        return data;
    }

    async getCourse(id: number): Promise<CourseDto>{
        const filteredData =  data.find(elem => elem.id === id);
        if(filteredData) return filteredData;

        throw new NotFoundException();
    }

    async updateCoursePut(id: number, obj: CourseDto): Promise<CourseDto>{
        const idx = data.findIndex(elem => elem.id === id);
        if(idx === -1) throw new NotFoundException();
        const newData = {...data[idx], ...obj};
        data[idx] = newData;
        return data[idx];

    }

    async updateCoursePatch(id: number, obj: Partial<CourseDto>): Promise<CourseDto>{
        const idx = data.findIndex(elem => elem.id === id);
        if(idx === -1) throw new NotFoundException();
        data[idx] = {...data[idx], ...obj};
        return data[idx];

    }

    async deleteCourse(id: number): Promise<CourseDto>{
        const idx = data.findIndex(elem => elem.id === id);
        if(idx === -1) throw new NotFoundException();
        const deleted = data[idx];
        data.splice(idx, 1);
        return deleted;

    }
}
