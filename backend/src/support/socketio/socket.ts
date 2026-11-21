// import { Server } from "socket.io";
// import { Server as HttpServer } from "node:http";
// import jwt from "jsonwebtoken";
// import {
//   supportConversationRepository,
//   supportMessageRepository,
// } from "../support.repository";
// import { adminRepository } from "../../modules/admin/admin.repository";
// import { usersRepository } from "../../modules/users/users.repository";
// import { AdminRole } from "../../modules/admin/entity/admin.entity";
// import { UserStatus } from "../../modules/users/entities/users.entity";
// import { env } from "../../configs/env";
// export const initializeSocket = (httpServer: HttpServer) => {
//   const io = new Server(httpServer, {
//     cors: {
//       origin: true,
//       credentials: true,
//     },
//   });
// io.use(async (socket, next) => {
//   try {
//     // دریافت کوکی
//     const cookieHeader = socket.handshake.headers.cookie;

//     const accessToken = cookieHeader
//       ?.split(";")
//       .map((cookie) => cookie.trim())
//       .find((cookie) => cookie.startsWith("access_token="))
//       ?.slice("access_token=".length);

//     if (!accessToken) {
//       return next(new Error("Authentication required"));
//     }

//     // بررسی JWT
//     const decoded = jwt.verify(accessToken, env.JWT_SECRET);

//     if (
//       typeof decoded === "string" ||
//       !decoded.id ||
//       !["user", "support"].includes(decoded.type)
//     ) {
//       return next(new Error("Invalid token"));
//     }

//     // بررسی کاربر عادی
//     if (decoded.type === "user") {
//       const user = await usersRepository.findOne({
//         where: { id: decoded.id },
//       });

//       if (!user || user.status !== UserStatus.ACTIVE) {
//         return next(new Error("User is not active"));
//       }

//       socket.data.userId = user.id;
//       socket.data.userType = "user";
//     }

//     // بررسی ادمین پشتیبانی
//     if (decoded.type === "support") {
//       const admin = await adminRepository.findOne({
//         where: { id: decoded.id },
//       });

//       if (
//         !admin ||
//         ![
//           AdminRole.MENTOR_MANAGER,
//           AdminRole.SENIOR_MENTOR,
//         ].includes(admin.role)
//       ) {
//         return next(new Error("Access denied"));
//       }

//       socket.data.userId = admin.id;
//       socket.data.userType = "support";
//       socket.data.role = admin.role;
//     }

//     next();
//   } catch {
//     next(new Error("Authentication failed"));
//   }
// });
// io.on("connection", (socket) => {
//  socket.on("conversation:join", async (data, callback) => {
//   try {
//     if (typeof callback !== "function") {
//   console.warn("conversation:join received without acknowledgement");
//   return;
// }
//     const { conversationId } = data;

//     // بررسی معتبر بودن شناسه
//     if (!conversationId || !/^\d+$/.test(conversationId)) {
//       return callback({
//         success: false,
//         message: "Invalid conversation ID",
//       });
//     }

//     // پیدا کردن گفتگو در دیتابیس
//     const conversation = await supportConversationRepository.findOne({
//       where: { id: conversationId },
//     });

//     if (!conversation) {
//       return callback({
//         success: false,
//         message: "Conversation not found",
//       });
//     }

//     // کاربر فقط اجازه ورود به گفتگوی خودش را دارد
//     if (
//       socket.data.userType === "user" &&
//       conversation.userId !== socket.data.userId
//     ) {
//       return callback({
//         success: false,
//         message: "Access denied",
//       });
//     }

//     // ورود به Room
//     await socket.join(`conversation:${conversationId}`);

//     return callback({
//       success: true,
//     });
//   } catch (error) {
//     console.error("Conversation join error:", error);

//     return callback({
//       success: false,
//       message: "Failed to join conversation",
//     });
//   }
// });
//  socket.on("conversation:leave", async (data, callback) => {
//   try {
//     const { conversationId } = data;

//     // اعتبارسنجی شناسه گفتگو
//     if (!conversationId || !/^\d+$/.test(conversationId)) {
//       return callback({
//         success: false,
//         message: "Invalid conversation ID",
//       });
//     }

//     const room = `conversation:${conversationId}`;

//     // بررسی عضویت در Room
//     if (!socket.rooms.has(room)) {
//       return callback({
//         success: false,
//         message: "You are not a member of this conversation",
//       });
//     }

//     // بررسی وجود گفتگو
//     const conversation = await supportConversationRepository.findOne({
//       where: { id: conversationId },
//     });

//     if (!conversation) {
//       return callback({
//         success: false,
//         message: "Conversation not found",
//       });
//     }

//     // بررسی مالکیت گفتگو برای کاربر
//     if (
//       socket.data.userType === "user" &&
//       conversation.userId !== socket.data.userId
//     ) {
//       return callback({
//         success: false,
//         message: "Access denied",
//       });
//     }

//     await socket.leave(room);

//     return callback({
//       success: true,
//     });
//   } catch (error) {
//     console.error("Conversation leave error:", error);

//     return callback({
//       success: false,
//       message: "Failed to leave conversation",
//     });
//   }
// });
// socket.on("message:send", async (data, callback) => {
//   try {
//     const { conversationId, text } = data;

//     // اعتبارسنجی شناسه گفتگو
//     if (!conversationId || !/^\d+$/.test(conversationId)) {
//       return callback({
//         success: false,
//         message: "Invalid conversation ID",
//       });
//     }

//     // اعتبارسنجی متن پیام
//     if (
//       typeof text !== "string" ||
//       !text.trim() ||
//       text.trim().length > 5000
//     ) {
//       return callback({
//         success: false,
//         message: "Invalid message text",
//       });
//     }

//     const room = `conversation:${conversationId}`;

//     // بررسی عضویت در Room
//     if (!socket.rooms.has(room)) {
//       return callback({
//         success: false,
//         message: "You are not a member of this conversation",
//       });
//     }

//     // بررسی وجود گفتگو
//     const conversation = await supportConversationRepository.findOne({
//       where: { id: conversationId },
//     });

//     if (!conversation) {
//       return callback({
//         success: false,
//         message: "Conversation not found",
//       });
//     }

//     // بررسی مالکیت گفتگو برای کاربر
//     if (
//       socket.data.userType === "user" &&
//       conversation.userId !== socket.data.userId
//     ) {
//       return callback({
//         success: false,
//         message: "Access denied",
//       });
//     }

//     // ساخت پیام با اطلاعات هویتی تأییدشده سرور
//     const message = supportMessageRepository.create({
//       conversationId,
//       senderId: socket.data.userId,
//       senderType: socket.data.userType,
//       text: text.trim(),
//     });

//     // ذخیره پیام
//     const savedMessage = await supportMessageRepository.save(message);

//     // به‌روزرسانی آخرین پیام گفتگو
//     conversation.lastMessageId = savedMessage.id;
//     conversation.lastMessageAt = savedMessage.createdAt;

//     await supportConversationRepository.save(conversation);

//     // ارسال پیام به اعضای Room
//     io.to(room).emit("message:new", {
//       id: savedMessage.id,
//       conversationId: savedMessage.conversationId,
//       senderId: savedMessage.senderId,
//       senderType: savedMessage.senderType,
//       text: savedMessage.text,
//       createdAt: savedMessage.createdAt,
//     });

//     return callback({
//       success: true,
//       data: {
//         id: savedMessage.id,
//         conversationId: savedMessage.conversationId,
//         senderId: savedMessage.senderId,
//         senderType: savedMessage.senderType,
//         text: savedMessage.text,
//         createdAt: savedMessage.createdAt,
//       },
//     });
//   } catch (error) {
//     console.error("Message send error:", error);

//     return callback({
//       success: false,
//       message: "Failed to send message",
//     });
//   }
// });
// socket.on("message:history", async (data, callback) => {
//   try {
//     const { conversationId, limit = 30, beforeId } = data;

//     if (!conversationId || !/^\d+$/.test(conversationId)) {
//       return callback({
//         success: false,
//         message: "Invalid conversation ID",
//       });
//     }

//     if (
//       !Number.isInteger(limit) ||
//       limit < 1 ||
//       limit > 100
//     ) {
//       return callback({
//         success: false,
//         message: "Invalid limit",
//       });
//     }

//     if (beforeId !== undefined && !/^\d+$/.test(beforeId)) {
//       return callback({
//         success: false,
//         message: "Invalid beforeId",
//       });
//     }

//     // بررسی عضویت در Room
//     const room = `conversation:${conversationId}`;

//     if (!socket.rooms.has(room)) {
//       return callback({
//         success: false,
//         message: "You are not a member of this conversation",
//       });
//     }

//     // بررسی وجود گفتگو
//     const conversation = await supportConversationRepository.findOne({
//       where: { id: conversationId },
//     });

//     if (!conversation) {
//       return callback({
//         success: false,
//         message: "Conversation not found",
//       });
//     }

//     // بررسی مالکیت برای کاربر عادی
//     if (
//       socket.data.userType === "user" &&
//       conversation.userId !== socket.data.userId
//     ) {
//       return callback({
//         success: false,
//         message: "Access denied",
//       });
//     }

//     const query = supportMessageRepository
//       .createQueryBuilder("message")
//       .where("message.conversationId = :conversationId", {
//         conversationId,
//       });

//     if (beforeId) {
//       query.andWhere("message.id < :beforeId", { beforeId });
//     }

//     const messages = await query
//       .orderBy("message.id", "DESC")
//       .take(limit)
//       .getMany();

//     return callback({
//       success: true,
//       data: messages.reverse().map((message) => ({
//         id: message.id,
//         conversationId: message.conversationId,
//         senderId: message.senderId,
//         senderType: message.senderType,
//         text: message.text,
//         createdAt: message.createdAt,
//       })),
//     });
//   } catch (error) {
//     console.error("Message history error:", error);

//     return callback({
//       success: false,
//       message: "Failed to load message history",
//     });
//   }
// });
// socket.on("message:read", async (data, callback) => {
//   try {
//     const { conversationId } = data;

//     // اعتبارسنجی شناسه گفتگو
//     if (!conversationId || !/^\d+$/.test(conversationId)) {
//       return callback({
//         success: false,
//         message: "Invalid conversation ID",
//       });
//     }

//     const room = `conversation:${conversationId}`;

//     // بررسی عضویت در Room
//     if (!socket.rooms.has(room)) {
//       return callback({
//         success: false,
//         message: "You are not a member of this conversation",
//       });
//     }

//     // پیدا کردن گفتگو
//     const conversation = await supportConversationRepository.findOne({
//       where: { id: conversationId },
//     });

//     if (!conversation) {
//       return callback({
//         success: false,
//         message: "Conversation not found",
//       });
//     }

//     // بررسی مالکیت گفتگو برای کاربر
//     if (
//       socket.data.userType === "user" &&
//       conversation.userId !== socket.data.userId
//     ) {
//       return callback({
//         success: false,
//         message: "Access denied",
//       });
//     }

//     const now = new Date();

//     // ثبت زمان آخرین مشاهده
//     if (socket.data.userType === "user") {
//       conversation.userLastReadAt = now;
//     } else {
//       conversation.supportLastReadAt = now;
//     }

//     await supportConversationRepository.save(conversation);

//     // اطلاع‌رسانی به سایر اعضای گفتگو
//     socket.to(room).emit("conversation:read", {
//       conversationId,
//       readerType: socket.data.userType,
//       lastReadAt: now,
//     });

//     return callback({
//       success: true,
//     });
//   } catch (error) {
//     console.error("Message read error:", error);

//     return callback({
//       success: false,
//       message: "Failed to mark messages as read",
//     });
//   }
// });
//   socket.on("disconnect", (reason) => {
//     console.log(
//       `Socket disconnected: ${socket.data.userId} - ${reason}`,
//     );
//   });
// });
//   return io;
// };