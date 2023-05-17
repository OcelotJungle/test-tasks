Бот для Slack, который каждый день выполняет запрос на удалённый сервер, получает в ответе список руководителей и их работников, проверяет, у кого из работников день рождения, и перечисляет их в сообщении руководителю.

# Настройка .env
* SLACK_TOKEN - токен для бота
* SLACK_CHANNEL - канал для уведомлений
* SCHEDULE_CRON_EXPRESSION - cron-выражение для планирования выполнения бизнес-логики
* API_URL - url для Fetch API
* MOCK_DATA_FILENAME - имя файла для generate-mock-data и Mock API

# Запуск
Установить пакеты:

```
npm i
```

Сгенерировать файл с фейковым ответом от сервера:
```
npm run generate-mock-data
```

Development-режим, использует Mock API, берёт данные из сгенерированного файла:
```
npm run dev
```

Production-режим, использует Fetch API, берёт данные по URL:
```
npm run start
```