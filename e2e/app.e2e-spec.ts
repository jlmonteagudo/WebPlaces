import { WebPlacesPage } from './app.po';

describe('web-places App', () => {
  let page: WebPlacesPage;

  beforeEach(() => {
    page = new WebPlacesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
