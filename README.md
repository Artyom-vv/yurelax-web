# Yurelax Web

Веб-кабинет игрока и будущая административная панель Yurelax.

## Архитектурная граница

- Единственный backend и источник контрактов — Global API в `yurelax-platform`.
- Браузер обращается только к owner-safe маршрутам платформенного `web-bff` по `/api/**`.
- Авторизация выполняется через серверную OIDC-сессию. Access/refresh tokens не попадают в JavaScript, local storage или browser-readable cookies.
- Старый отдельный репозиторий `yurelax-api` не является зависимостью этого проекта и не должен возвращаться в схему.
- Общий proxy к Global API запрещён: каждый новый web-сценарий получает отдельный типизированный BFF-маршрут.

## Локальная разработка

Требуется Node.js 20.19.x.

```bash
npm ci
npm start
```

Для изолированного просмотра кабинета с контрактоподобными fixture-ответами:

```bash
npm run build
npm run preview:platform
```

Предпросмотр доступен на `http://127.0.0.1:4300`. Он предназначен только для UI-разработки и не заменяет интеграционные тесты с `web-bff`.

## Проверки

```bash
npm test -- --watch=false
npm run build
npm audit --omit=dev
```

Тесты выполняются штатным Angular unit-test builder поверх Vitest.
