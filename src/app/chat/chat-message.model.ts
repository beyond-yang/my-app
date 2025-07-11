export interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isOwner: boolean; // 是否是当前用户发送
  isRecalled: boolean; // 是否撤回
}
