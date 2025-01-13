FROM postgres:16.2

RUN apt-get clean && apt-get update && \
    apt-get install -y postgresql-contrib

ADD *.sql /docker-entrypoint-initdb.d/