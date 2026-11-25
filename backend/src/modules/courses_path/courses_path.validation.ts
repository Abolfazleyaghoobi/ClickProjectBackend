import z from "zod";


export const addCoursePathSchema=z.object({
    pathListId:z.number(),
    courseId:z.number(),
    number_course_tutorial:z.number().min(1).max(1000)
})

export const getCoursePathSchema=z.object({
    pathListId:z.number(),
})




export const changeCoursePathSchema=z.object({
    fristID:z.number(),
    secondID:z.number(),

})