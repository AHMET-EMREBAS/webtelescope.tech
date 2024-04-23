import { Messages } from '../support/app.messages';
import { AppPom } from '../support/app.po';

describe('client-e2e', () => {
  let pom: AppPom;

  beforeEach(() => {
    cy.visit('/');

    pom = new AppPom();
  });

  it('should render the home menu item', () => {
    pom.homeMenuItem().contains(Messages.HOME);
  });

  it('should render user menu item', () => {
    pom.usersMenuItem().contains(Messages.USERS);
  });

  it('should render chat with us button', () => {
    pom.chatWithUsButton().contains(Messages.CHAT_WITH_US);
  });

  it('should render notification button', () => {
    pom.notificationButton().contains(/notifications/gi);
  });

  it('should render left side navigation button', () => {
    pom.leftSideNavigationButton().contains(/menu/gi);
  });

  it('should render right side navigation button', () => {
    pom.rightSideNavigationButton().contains(/apps/gi);
  });
});
