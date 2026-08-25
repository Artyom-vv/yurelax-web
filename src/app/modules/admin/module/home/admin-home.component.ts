import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'yrx-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AdminHomeComponent {
  readonly navigation = [
    {route: '/admin/players', icon: 'users', kicker: 'Поддержка', title: 'Игроки', description: 'Профиль, награды, статистика, покупки, права и история действий.'},
    {route: '/admin/commerce', icon: 'shopping-bag', kicker: 'Каталог', title: 'Товары и права', description: 'Товары, составные права, цены, требования и сроки действия.'},
    {route: '/admin/statistics', icon: 'arrow-big-up', kicker: 'Контракты', title: 'Статистика', description: 'Коды показателей, типы значений и правила накопления игровых фактов.'},
    {route: '/admin/finance', icon: 'wallet', kicker: 'Экономика', title: 'Финансовые операции', description: 'Корректировки балансов и очередь подтверждения критичных операций.'},
    {route: '/admin/quarantine', icon: 'alert-triangle', kicker: 'Надёжность', title: 'Карантин событий', description: 'Диагностика отклонённых событий, безопасный повтор и закрытие ошибок.'},
    {route: '/admin/privacy', icon: 'shield', kicker: 'Приватность', title: 'Privacy-запросы', description: 'Защищённая псевдонимизация аккаунтов с полной историей решений.'},
    {route: '/admin/audit', icon: 'file', kicker: 'Контроль', title: 'Аудит платформы', description: 'Фильтруемая история операторов, действий, ресурсов и причин изменений.'},
    {route: '/admin/mini-games', icon: 'joystick', kicker: 'Режимы', title: 'Игровой каталог', description: 'Карточки режимов, метаданные и связанные показатели.'},
    {route: '/admin/wiki', icon: 'book', kicker: 'Публикация', title: 'Вики', description: 'Страницы знаний и объяснения механик для игроков и команды.'},
  ];
}
