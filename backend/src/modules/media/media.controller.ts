
import type { Request, RequestHandler, Response } from "express";
import { decodeToken } from "../../shared/utils/decode";
import { AppError } from "../../shared/errors/app.error";
import { updateProfileIMG_service } from "./media.service";
import { imageUpload } from "./media.upload";

export const uploadImage:RequestHandler =async (req, res) => {
  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };
  if (!files) {
    res.status(400).json({
      success: false,
      message: "لطفاً یک تصویر ارسال کنید",
    });
    return;
  }
  const resutlDecode=decodeToken(req.cookies.access_token)
  if(!resutlDecode){
    throw new AppError("token is not valid", 401)
  }
  const resutl= await updateProfileIMG_service(resutlDecode.id,files)
  res.status(201).json({
    success: true,
    message: resutl.message
  
  });
};

// const h1andleUpload = (req, res, next) => {
//   if (req.is('multipart/form-data')) {
//     // ۱. فقط فیلدهایی که واقعاً "فایل" هستند را معرفی کن
//     const upload = uploadMiddleware.fields([{ name: 'images', maxCount: 5 }]);

//     // ۲. متد آپلود را در یک کال‌بک اجرا کن تا ارورها را بگیری
//     upload(req, res, (err) => {
//       if (err) {
//         // اگر Multer اروری داد (مثل فیلد نامعتبر یا حجم زیاد)، ارور ۴۰۰ برمی‌گردانیم
//         console.error('Multer Error:', err);
//         return res.status(400).json({
//           success: false,
//           message: 'خطا در آپلود فایل',
//           error: err.message,
//         });
//       }

//       // ۳. تبدیل داده‌های رشته‌ای (String) به فرمت اصلی (JSON)
//       // چون در form-data آرایه‌ها و آبجکت‌ها به صورت استرینگ می‌آیند
//       if (req.body.variants && typeof req.body.variants === 'string') {
//         try {
//           req.body.variants = JSON.parse(req.body.variants);
//         } catch (error) {
//           return res.status(400).json({
//             success: false,
//             message: 'فرمت variants نامعتبر است. باید یک JSON معتبر باشد.',
//           });
//         }
//       }

//       // اگر نیاز است فیلدهای عددی هم از استرینگ به عدد تبدیل شوند، اینجا انجام بده:
//       // req.body.price = Number(req.body.price);

//       next();
//     });
//   } else {
//     next();
//   }
// };

export const handleUpload:RequestHandler= async (req,res,next)=>{
  if (req.is('multipart/form-data')){
    const upload= imageUpload.fields([
      { name: "profileImage", maxCount: 1 },
      { name: "bannerImage", maxCount: 1 }
    ])
  }else{
     next()
  }

}