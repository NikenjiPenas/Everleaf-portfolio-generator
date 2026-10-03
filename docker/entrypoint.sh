#!/bin/sh
set -eu

if [ -z "${APP_KEY:-}" ]; then
    echo "APP_KEY must be set in the hosting provider's environment variables." >&2
    exit 1
fi

case "$APP_KEY" in
    base64:*) ;;
    *) APP_KEY="base64:$APP_KEY"; export APP_KEY ;;
esac

if [ -z "${DB_HOST:-}" ] || [ -z "${DB_DATABASE:-}" ] || [ -z "${DB_USERNAME:-}" ] || [ -z "${DB_PASSWORD:-}" ]; then
    echo "Database connection variables must be set before the service starts." >&2
    exit 1
fi

envsubst '$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

php artisan migrate --force
php artisan config:cache
php artisan view:cache

exec /usr/bin/supervisord -c /etc/supervisord.conf
