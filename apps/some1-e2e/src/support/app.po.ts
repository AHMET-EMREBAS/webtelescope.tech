export class AppPom {
  greeting() {
    return cy.get('h1.app-title');
  }

  homeMenuItem() {
    return this.byTestid('Home');
  }

  usersMenuItem() {
    return this.byTestid('Users');
  }

  chatWithUsButton() {
    return this.byAriaLabel('Chat with us');
  }

  notificationButton() {
    return this.byAriaLabel('Notifications');
  }

  /**
   * [data-testid]=?
   */
  private byTestid(testid: string) {
    return cy.get(`[data-testid="${testid}"]`);
  }

  private byAriaLabel(label: string) {
    return cy.get(`[aria-label="${label}"]`);
  }
}
