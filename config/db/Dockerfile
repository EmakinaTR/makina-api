FROM mysql/mysql-server:8.0

ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD

# Create initial sql to update default authentication method
# authentication.sql is added to .gitignore since it will include sensitive data
RUN echo "ALTER USER $DATABASE_USERNAME IDENTIFIED WITH mysql_native_password BY '$DATABASE_PASSWORD';" > /docker-entrypoint-initdb.d/authentication.sql
