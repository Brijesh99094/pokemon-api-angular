type NotificationType = 'success' | 'error';

export class Notification {
  constructor(private type: NotificationType, private message: string) {}

  getType(): NotificationType {
    return this.type;
  }

  getMessage(): string {
    return this.message;
  }
}
