# Автоматическое формирование маппингов методом нечёткого сравнения

## Настройка

### Переменные среды
* DOCTORS_URI - uri источника со списком докторов (путь до файла относительно корневого каталога (например, "./data/doctors.json") либо URL (не реализовано))
* SERVICES_URI - uri источника со списком услуг (путь до файла относительно корневого каталога (например, "./data/services.txt") либо URL (не реализовано))

* PHRASE_COMPARISON_SCORE_THRESHOLD - значение сходства специальности и названия услуги, после которого услуга ассоциируется со специальностью (0.75)

* PARAPHRASER_TOKEN - токен для Paraphraser API
* PARAPHRASER_LANG - язык для Paraphraser API (ru/en)
* PARAPHRASER_TYPE - тип определения сходства для Paraphraser API (vector/syn/root)
* PARAPHRASER_FORMAT - формат ответа(?) для Paraphraser API (json)
* PARAPHRASER_URL - url для Paraphraser API (http://paraphraser.ru/api)

### Опции запуска
- loader - загрузчик данных (список докторов, список услуг), реализован только "file", любые другие значения приводят к использованию реализации-заглушки, возвращающей в качестве контента источника пустую строку
- comparer - класс для нечёткого сравнения строк, реализован только "paraphraser", любые другие значения приводят к использованию реализации-заглушки, возвращающей в качестве результата сравнения строк случайное число от 0 до 1

### Подготовка к запуску
```
npm i
```

## Запуск
```
npm start -- --loader=file --comparer=paraphraser
```