# Caderninho de Receitas - Db

```sh
docker-compose up -d
docker-compose down

docker volume rm db_pgdata
```

## Db container

```
docker stop caderninho-postgres
docker rm caderninho-postgres

docker run -d \
  --name caderninho-postgres \
  -e POSTGRES_PASSWORD=senha \
  -v pg_dados:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres
```

## Backup

Backup in SQL

```sh
docker exec -it caderninho-db pg_dump -U admin caderninho > backup.sql
```

Backup in CSV to use for Machine Learning.

```sh
docker exec -i caderninho-db psql -U admin -d caderninho -c "\copy \"Foods\" TO STDOUT WITH CSV HEADER" > backup/Foods.csv
```

### Restore

```sh
docker exec -it caderninho-db psql -U admin caderninho < backup.sql
```
