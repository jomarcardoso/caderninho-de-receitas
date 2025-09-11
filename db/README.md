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
docker exec -it caderninho-db pg_dump -U admin caderninho > backup/full_db_2025_09_11.sql

# recreate
# connect postgres db
docker exec -it caderninho-db psql -U admin -d postgres

# drop users
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'caderninho';

DROP DATABASE caderninho;
CREATE DATABASE caderninho;
\q

# restore
cat backup/full_db_2025_09_10.sql | docker exec -i caderninho-db psql -U admin -d caderninho
```

backup of Foods in JSON

```bash
# foods and measures
# foods
docker exec -i caderninho-db psql -U admin -d caderninho -c "\copy (
  SELECT json_agg(food_with_measures)
  FROM (
    SELECT
      f.*,
      (
        SELECT json_agg(m)
        FROM \"Measure\" m
        WHERE m.\"FoodId\" = f.\"Id\"
      ) AS \"Measure\"
    FROM \"Foods\" f
  ) AS food_with_measures
) TO STDOUT" > backup/FoodsFull.json


# foods
docker exec -i caderninho-db psql -U admin -d caderninho -c "\copy (SELECT json_agg(row_to_json(f)) FROM (SELECT * FROM \"Foods\") f) TO STDOUT" > backup/Foods.json

# measures
docker exec -i caderninho-db psql -U admin -d caderninho -c "\copy (SELECT json_agg(row_to_json(f)) FROM (SELECT * FROM \"Measure\") f) TO STDOUT" > backup/Measures.json
```

Backup in CSV/TSV to use for Machine Learning.

```sh
# english
docker exec -i caderninho-db psql -U admin -d caderninho -c "\copy (SELECT \"Id\" as id, \"Name\" as name, \"Keys\" as keys, FROM \"Foods\") TO STDOUT WITH DELIMITER E'\t' CSV HEADER" > backup/FoodsEn.tsv

# portuguese
docker exec -i caderninho-db psql -U admin -d caderninho -c "\copy (SELECT \"Id\" as id, \"NamePt\" as name, \"KeysPt\" as keys FROM \"Foods\") TO STDOUT WITH DELIMITER E'\t' CSV HEADER" > backup/FoodsPt.tsv

docker exec -i caderninho-db psql -U admin -d caderninho -c "\copy (
    SELECT
        \"Id\" as id,
        \"NamePt\" as name,
        trim(both ' ' from unnest(string_to_array(\"KeysPt\", ','))) as key
    FROM \"Foods\"
) TO STDOUT WITH DELIMITER E'\t' CSV HEADER" > backup/FoodsPt.tsv
```

Backup to use to unit tests:

```bash
docker exec -i caderninho-db psql -U admin -d caderninho -c "\copy (SELECT json_agg(row_to_json(f)) FROM (SELECT \"Id\", \"NamePt\", \"KeysPt\" FROM \"Foods\") f) TO STDOUT" > backup/FoodsPt.json
```

### Restore

```sh
docker exec -it caderninho-db psql -U admin caderninho < backup.sql
```
