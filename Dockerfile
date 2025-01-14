# Используйте официальный образ Bun
FROM oven/bun:latest

# Установите рабочую директорию
WORKDIR /usr/src/app

# Копируйте файлы проекта
COPY . .

# Установите зависимости
RUN bun install

# Укажите порт, на котором будет работать приложение
EXPOSE 3003

# Команда для запуска приложения в режиме разработки
CMD ["bun", "dev", "--port", "3003"]
