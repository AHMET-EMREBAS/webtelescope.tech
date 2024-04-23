import { AppPom } from '../support/app.po';

describe('client-e2e', () => {
  let pom: AppPom;

  beforeEach(() => {
    cy.visit('/');

    pom = new AppPom();
  });

  it('should render the home menu item', () => {
    pom.homeMenuItem().contains(/Home/gi);
  });

  it('should render user menu item', () => {
    pom.usersMenuItem().contains(/Users/gi);
  });

  it('should render chat with us button', () => {
    pom.chatWithUsButton().contains('chat');
  });

  it('should render notification button', () => {
    pom.notificationButton().contains(/Notifications/gi);
  });

  it('should render left side navigation button', () => {
    pom.leftSideNavigationButton().contains(/menu/gi);
  });

  it('should render right side navigation button', () => {
    pom.rightSideNavigationButton().contains(/app/gi);
  });
});
