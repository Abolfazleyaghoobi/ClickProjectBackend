import z from "zod";


export const addCoursePathSchema=z.object({
    pathId:z.number(),
    courseId:z.number(),
    number_course_tutorial:z.number().min(1).max(1000)
})

export const getCoursePathSchema=z.object({
    pathId:z.number(),
})




export const changeCoursePathSchema=z.object({
    fristID:z.number(),
    secondID:z.number(),

})