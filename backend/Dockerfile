FROM postgres
ENV POSTGRES_PASSWORD admin
ENV POSTGRES_USER admin
ENV POSTGRES_DB proverb
COPY ./proverbs.csv ./proverbs.csv
COPY init.sql /docker-entrypoint-initdb.d/