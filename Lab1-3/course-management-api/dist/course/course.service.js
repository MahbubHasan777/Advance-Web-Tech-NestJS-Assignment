"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
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
];
let CourseService = class CourseService {
    async createCourse(obj) {
        data.unshift(obj);
        return obj;
    }
    async getAllCourses() {
        return data;
    }
    async getCourseById(id) {
        const filteredData = data.find(elem => elem.id === id);
        if (filteredData)
            return filteredData;
        throw new common_1.NotFoundException();
    }
    async updateCourse(id, obj) {
        const idx = data.findIndex(elem => elem.id === id);
        if (idx === -1)
            throw new common_1.NotFoundException();
        const newData = { ...data[idx], ...obj };
        data[idx] = newData;
        return data[idx];
    }
    async patchCourse(id, obj) {
        const idx = data.findIndex(elem => elem.id === id);
        if (idx === -1)
            throw new common_1.NotFoundException();
        data[idx] = { ...data[idx], ...obj };
        return data[idx];
    }
    async deleteCourse(id) {
        const idx = data.findIndex(elem => elem.id === id);
        if (idx === -1)
            throw new common_1.NotFoundException();
        const deleted = data[idx];
        data.splice(idx, 1);
        return deleted;
    }
    async uploadCourseMaterial(id, file) {
        await this.getCourseById(id);
        if (!file) {
            throw new common_1.NotFoundException("File not found or Wrong ID input");
        }
        return {
            message: "File Uploaded successfully",
            courseId: id,
            filename: file.originalname,
            size: file.size
        };
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)()
], CourseService);
//# sourceMappingURL=course.service.js.map