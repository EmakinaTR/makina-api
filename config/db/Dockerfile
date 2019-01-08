FROM mysql/mysql-server:8.0

ARG DB_USR
ARG DB_USR_PWD

# Create initial sql to update default authentication method
# setup.sql is added to .gitignore since it will include sensitive data
RUN echo "ALTER USER $DB_USR IDENTIFIED WITH mysql_native_password BY '$DB_USR_PWD';" > /docker-entrypoint-initdb.d/setup.sql
