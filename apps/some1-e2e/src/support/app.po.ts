import { Messages } from "./app.messages";

export class AppPom {
  greeting() {
    return cy.get('h1.app-title');
  }

  homeMenuItem() {
    return this.byTestid(Messages.HOME);
  }

  usersMenuItem() {
    return this.byTestid(Messages.USERS);
  }

  chatWithUsButton() {
    return this.byAriaLabel(Messages.CHAT_WITH_US);
  }

  notificationButton() {
    return this.byAriaLabel(Messages.NOTIFICATIONS);
  }

  leftSideNavigationButton() {
    return this.byAriaLabel(Messages.TOGGLE_LEFT_SIDENAV);
  }

  rightSideNavigationButton() {
    return this.byAriaLabel(Messages.TOGGLE_RIGHT_SIDENAV);
  }

  /**
   * [data-testid="?"]
   */
  private byTestid(testid: string) {
    return cy.get(`[data-testid="${testid}"]`);
  }

  /**
   * [aria-label="?"]
   * @param label aria label
   * @returns
   */
  private byAriaLabel(label: string) {
    return cy.get(`[aria-label="${label}"]`);
  }
}
