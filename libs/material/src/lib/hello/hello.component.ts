import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wt-hello',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss',
})
export class HelloComponent {
  messages: string[] = [];
  /**
   * Input property description
   */
  @Input() message = 'Sample Message';

  /**
   * Output property description
   */
  @Output() messageEvent = new EventEmitter<string>();

  /**
   * Function description
   */
  sendMessage() {
    const msg = 'This is how events work!';
    this.messages.push(`messageEvent : ${msg}`);
    this.messageEvent.emit(msg);
  }
}
