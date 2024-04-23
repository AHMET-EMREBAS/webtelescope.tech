export class AppMessages {
  static GREETING = `Hello There!`;
  static HOME = `Home`;
  static ABOUT = `About`;
  static SERVICES = `Services`;
  static NOTIFICATIONS = `Notifications`;
  static CHAT_WITH_US = `Chat with us`;
  static ADMINISTRATIVE = `Administrative`;
  static USERS = `Users`;
  static CUSTOMERS = `Customers`;

  static NEW(something: string) {
    return `New ${something}`;
  }

  static ADD(something: string) {
    return `Add ${something}`;
  }

  static UPDATE(something: string) {
    return `Update ${something}`;
  }

  static DELETE(something: string) {
    return `Delete ${something}`;
  }

  static FIND(something: string) {
    return `Find ${something}`;
  }
}
