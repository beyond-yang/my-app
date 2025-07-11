import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatMessage } from '../../chat/chat-message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  // 使用BehaviorSubject存储消息列表
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);

  // 当前用户信息
  private currentUser = '我';

  constructor() {
    // 初始化一些测试消息
    this.initializeMessages();
  }

  // 获取消息流
  getMessages(): Observable<ChatMessage[]> {
    return this.messagesSubject.asObservable();
  }

  // 发送消息
  sendMessage(content: string): void {
    const message: ChatMessage = {
      id: this.generateId(),
      content: content,
      sender: this.currentUser,
      timestamp: new Date(),
      isOwner: true,
      isRecalled: false,
    };

    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }

  // 模拟接收他人消息
  receiveMessage(content: string, sender: string = '张三'): void {
    const message: ChatMessage = {
      id: this.generateId(),
      content: content,
      sender: sender,
      timestamp: new Date(),
      isOwner: false,
      isRecalled: false,
    };

    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }

  // 撤回消息
  recallMessage(messageId: string): void {
    const currentMessages = this.messagesSubject.value;
    const updatedMessages = currentMessages.map((msg) =>
      msg.id === messageId ? { ...msg, isRecalled: true } : msg
    );
    this.messagesSubject.next(updatedMessages);
  }

  // 生成唯一ID
  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // 初始化测试消息
  private initializeMessages(): void {
    const initialMessages: ChatMessage[] = [
      {
        id: '1',
        content: '你好！',
        sender: '张三',
        timestamp: new Date(Date.now() - 60000),
        isOwner: false,
        isRecalled: false,
      },
      {
        id: '2',
        content: '你好，最近怎么样？',
        sender: '我',
        timestamp: new Date(Date.now() - 30000),
        isOwner: true,
        isRecalled: false,
      },
    ];
    this.messagesSubject.next(initialMessages);
  }
}
