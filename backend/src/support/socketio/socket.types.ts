// import { Socket } from "socket.io";

// export interface ServerToClientEvents {
//   "conversation:join:result": (data: {
//   success: boolean;
//   message?: string;
//   conversationId?: string;
// }) => void;
// }

// export interface ClientToServerEvents {
//   "conversation:join": (
//     data: { conversationId: string },
//     callback: (response: { success: boolean; message?: string }) => void,
//   ) => void;

//   "conversation:leave": (
//     data: { conversationId: string },
//     callback: (response: { success: boolean; message?: string }) => void,
//   ) => void;

//   "message:send": (
//     data: {
//       conversationId: string;
//       text: string;
//     },
//     callback: (response: {
//       success: boolean;
//       message?: string;
//       data?: {
//         id: string;
//         conversationId: string;
//         senderId: string;
//         senderType: "user" | "support";
//         text: string;
//         createdAt: Date;
//       };
//     }) => void,
//   ) => void;
//   "message:history": (
//   data: {
//     conversationId: string;
//     limit?: number;
//     beforeId?: string;
//   },
//   callback: (response: {
//     success: boolean;
//     message?: string;
//     data?: {
//       id: string;
//       conversationId: string;
//       senderId: string;
//       senderType: "user" | "support";
//       text: string;
//       createdAt: Date;
//     }[];
//   }) => void,
// ) => void;
// "message:read": (
//   data: {
//     conversationId: string;
//   },
//   callback: (response: {
//     success: boolean;
//     message?: string;
//   }) => void,
// ) => void;
// }

// export interface InterServerEvents {
//   // Events between Socket.IO servers
// }

// export interface SocketData {
//   userId: string;
//   userType: "user" | "support";
//   role?: string;
// }

// export type SupportSocket = Socket<
//   ClientToServerEvents,
//   ServerToClientEvents,
//   InterServerEvents,
//   SocketData
// >;
