import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Message } from 'src/app/demo/api/message';
import { User } from 'src/app/demo/api/user';
import { ChatService } from '../service/chat.service';

@Component({
    selector: 'app-chat-box',
    templateUrl: './chat-box.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatBoxComponent implements OnInit {

    defaultUserId: number = 123;

    message!: Message;

    textContent: string = '';

    uploadedFiles: any[] = [];

    emojis = [
        '๐', '๐', '๐', '๐', '๐', '๐', '๐', '๐คฃ', '๐', '๐', '๐', '๐', '๐', '๐', '๐', '๐', '๐ฅฐ', '๐', '๐', '๐', '๐', '๐คช', '๐', '๐', '๐',
        '๐ค', '๐', '๐ค', '๐ง', '๐ค ', '๐ฅณ', '๐ค', '๐คก', '๐', '๐ถ', '๐', '๐', '๐', '๐', '๐คจ', '๐ค', '๐คซ', '๐คญ', '๐คฅ', '๐ณ', '๐', '๐', '๐ ', '๐ก', '๐คฌ', '๐',
        '๐', '๐ ', '๐ก', '๐คฌ', '๐', '๐', '๐', '๐ฌ', '๐ฅบ', '๐ฃ', '๐', '๐ซ', '๐ฉ', '๐ฅฑ', '๐ค', '๐ฎ', '๐ฑ', '๐จ', '๐ฐ', '๐ฏ', '๐ฆ', '๐ง', '๐ข', '๐ฅ', '๐ช', '๐คค'
    ];

    @Input() user!: User;

    constructor(private chatService: ChatService) { }

    setMessage() {
        if (this.user) {
            let filteredMessages = this.user.messages.filter(m => m.ownerId !== this.defaultUserId);
            this.message = filteredMessages[filteredMessages.length - 1];
        }
    }

    ngOnInit(): void {
        this.setMessage();
    }

    sendMessage() {
        if (this.textContent == '' || this.textContent === ' ') {
            return;
        }
        else {
            let message = {
                text: this.textContent,
                ownerId: 123,
                createdAt: new Date().getTime(),
            }

            this.chatService.sendMessage(message)
            this.textContent = '';
        }
    }

    onEmojiSelect(emoji: string) {
        this.textContent += emoji;
    }

    parseDate(timestamp: number) {
        return new Date(timestamp).toTimeString().split(':').slice(0, 2).join(':');
    }
}
