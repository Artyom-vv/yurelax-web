import {CommerceFulfillmentBoardComponent} from './commerce-fulfillment-board.component';

describe('CommerceFulfillmentBoardComponent', () => {
  const component = new CommerceFulfillmentBoardComponent();

  it('translates platform delivery states into operator language', () => {
    expect(component.healthLabel('HEALTHY')).toBe('Выдача работает');
    expect(component.healthLabel('DEGRADED')).toBe('Нужна проверка');
    expect(component.healthLabel('STALLED')).toBe('Выдача остановилась');
    expect(component.statusLabel('CLAIMED')).toBe('В работе');
  });

  it('formats task age without exposing raw seconds for long waits', () => {
    expect(component.age(null)).toBe('—');
    expect(component.age(45)).toBe('45 сек.');
    expect(component.age(3_900)).toBe('1 ч.');
    expect(component.age(172_900)).toBe('2 дн.');
  });
});
