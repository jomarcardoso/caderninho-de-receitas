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
