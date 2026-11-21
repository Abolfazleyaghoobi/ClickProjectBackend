import { AppDataSource } from "../databases/data-source";
import { SupportConversation } from "./entity/support_conversations.entity";
import { SupportMessage } from "./entity/support_messages.entity";

export const supportConversationRepository =
  AppDataSource.getRepository(SupportConversation);

export const supportMessageRepository =
  AppDataSource.getRepository(SupportMessage);