import {platformErrorMessage} from './platform-error-message';

describe('platformErrorMessage', () => {
  it('keeps a useful Russian platform explanation', () => {
    expect(platformErrorMessage({error: {message: 'Недостаточно средств'}}, 'Повторите попытку'))
      .toBe('Недостаточно средств');
  });

  it('hides an internal English transport message', () => {
    expect(platformErrorMessage({error: {message: 'Platform request failed'}}, 'Статистика сейчас недоступна.'))
      .toBe('Статистика сейчас недоступна.');
  });

  it('uses the screen fallback for an unknown response', () => {
    expect(platformErrorMessage(null, 'Каталог сейчас недоступен.')).toBe('Каталог сейчас недоступен.');
  });
});
