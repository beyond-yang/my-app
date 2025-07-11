import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ChatService } from '../service/chat/chat.service';
import { ChatMessage } from './chat-message.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  private destroy$ = new Subject<void>();

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // 订阅消息流
    this.chatService
      .getMessages()
      .pipe(takeUntil(this.destroy$))
      .subscribe((messages) => {
        this.messages = messages;
        // 自动滚动到底部
        this.scrollToBottom();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // 发送消息
  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }

  // 撤回消息
  recallMessage(messageId: string): void {
    this.chatService.recallMessage(messageId);
  }

  // 模拟接收消息（测试用）
  simulateReceiveMessage(): void {
    const testMessages = ['收到！', '好的', '没问题', '谢谢'];
    const randomMessage =
      testMessages[Math.floor(Math.random() * testMessages.length)];
    this.chatService.receiveMessage(randomMessage);
  }

  // 自动滚动到底部
  private scrollToBottom(): void {
    setTimeout(() => {
      const chatContainer = document.querySelector('.chat-messages');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  }
}
