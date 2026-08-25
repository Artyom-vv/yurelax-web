# Yurelax Web

Angular SSR-приложение пользовательского кабинета и RBAC-админки текущей
платформы Yurelax. Browser API работает через same-origin `/api`; внешний edge
маршрутизирует его в platform Web BFF.

## Production release

`Dockerfile` собирает immutable Angular SSR runtime на Node 24.15.0. Контейнер
работает без root на порту `4000` и публикует семантический `GET /health`.

Push в `master` запускает `Publish web`: workflow фиксирует Coolify application
на точный Git SHA, ожидает терминального статуса и проверяет, что публичный
health endpoint вернул тот же revision. `Roll back web` — отдельная кнопка без
ручного SHA; она выбирает последний успешный predecessor из истории Coolify.

Обе кнопки вызывают release-engine из `yurelax-platform`. Он использует единый
GitHub environment `production` платформы и сам fail-closed находит ровно одно
Coolify-приложение `yurelax-web`, принадлежащее репозиторию
`Artyom-vv/yurelax-web`. Coolify UUID, домен и API token не дублируются в этом
репозитории.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
