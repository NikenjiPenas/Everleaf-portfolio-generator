FROM node:22-alpine AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM php:8.3-fpm-alpine AS app

RUN apk add --no-cache nginx supervisor gettext icu-dev libzip-dev postgresql-dev \
    && docker-php-ext-install bcmath intl opcache pcntl pdo_pgsql zip \
    && sed -i 's/^;clear_env = no/clear_env = no/' /usr/local/etc/php-fpm.d/www.conf

# The form permits project images up to 4 MB; increase PHP's stock 2 MB limit.
RUN printf 'file_uploads=On\nupload_max_filesize=5M\npost_max_size=40M\n' > /usr/local/etc/php/conf.d/uploads.ini

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader
COPY --from=frontend /app/public/build ./public/build
COPY docker/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY docker/supervisord.conf /etc/supervisord.conf
COPY docker/entrypoint.sh /usr/local/bin/everleaf-entrypoint

RUN chmod +x /usr/local/bin/everleaf-entrypoint \
    && mkdir -p /run/nginx /var/log/supervisor storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 10000
ENTRYPOINT ["/usr/local/bin/everleaf-entrypoint"]
