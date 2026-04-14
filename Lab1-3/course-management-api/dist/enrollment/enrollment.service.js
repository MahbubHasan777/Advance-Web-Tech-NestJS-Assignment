"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentService = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("../course/course.service");
const enrollmentData = [
    { "studentName": "Mahbub Hasan", courseId: 1 },
    { "studentName": "Mahbub Hasan", courseId: 2 },
    { "studentName": "Limon", courseId: 1 },
];
let EnrollmentService = class EnrollmentService {
    courseService;
    constructor(courseService) {
        this.courseService = courseService;
    }
    async getEnrollment() {
        return enrollmentData;
    }
    async createEnrollment(obj) {
        const { courseId } = obj;
        await this.courseService.getCourseById(courseId);
        await enrollmentData.unshift(obj);
        return obj;
    }
};
exports.EnrollmentService = EnrollmentService;
exports.EnrollmentService = EnrollmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], EnrollmentService);
//# sourceMappingURL=enrollment.service.js.map