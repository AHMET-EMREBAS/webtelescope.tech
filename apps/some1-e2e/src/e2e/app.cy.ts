import { AppPom } from '../support/app.po';

describe('client-e2e', () => {
  let pom: AppPom;
  before(() => {
    cy.visit('/');
    pom = new AppPom();
  });

  it('should render main components', () => {
    pom.chatWithUsButton().contains('chat');
    pom.greeting().contains('Hello there!');
    pom.homeMenuItem().contains('Home');
    pom.notificationButton().contains('Notifications');
    pom.usersMenuItem().contains('Users');
  });
});
