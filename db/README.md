# Caderninho de Receitas - Db

```sh
docker-compose up -d
docker-compose down

docker volume rm db_pgdata
```

Reset foods ID

```sql
ALTER TABLE "Food" ALTER COLUMN "Id" RESTART WITH 1;
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
docker exec -it caderninho-db pg_dump -U admin caderninho > backup/full_db_2025_12_23.sql

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
cat backup/full_db_2025_12_16_with_food_categories_inline.sql | docker exec -i caderninho-db psql -U admin -d caderninho
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
    FROM \"Food\" f
  ) AS food_with_measures
) TO STDOUT" > backup/FoodsFull.json


# foods
docker exec -i caderninho-db psql -U admin -d caderninho -c "\copy (SELECT json_agg(row_to_json(f)) FROM (SELECT * FROM \"Food\") f) TO STDOUT" > backup/Foods.json

# measures
docker exec -i caderninho-db psql -U admin -d caderninho -c "\copy (SELECT json_agg(row_to_json(f)) FROM (SELECT * FROM \"Measure\") f) TO STDOUT" > backup/Measures.json
```

Backup in CSV/TSV to use for Machine Learning.

```sh
# english
docker exec -i caderninho-db psql -U admin -d caderninho -c "\copy (SELECT \"Id\" as id, _En as name, \"Keys\" as keys, FROM \"Food\") TO STDOUT WITH DELIMITER E'\t' CSV HEADER" > backup/FoodsEn.tsv

# portuguese
docker exec -i caderninho-db psql -U admin -d caderninho -c "\copy (SELECT \"Id\" as id, \"Name_Pt\" as name, \"KeysPt\" as keys FROM \"Food\") TO STDOUT WITH DELIMITER E'\t' CSV HEADER" > backup/FoodsPt.tsv

docker exec -i caderninho-db psql -U admin -d caderninho -c "\copy (
    SELECT
        \"Id\" as id,
        \"Name_Pt\" as name,
        trim(both ' ' from unnest(string_to_array(\"KeysPt\", ','))) as key
    FROM \"Food\"
) TO STDOUT WITH DELIMITER E'\t' CSV HEADER" > backup/FoodsPt.tsv
```

Backup to use to unit tests:

```bash
docker exec -i caderninho-db psql -U admin -d caderninho -c "\copy (SELECT json_agg(row_to_json(f)) FROM (SELECT * FROM \"Food\") f) TO STDOUT" > mocks/Foods.json
```

### Restore

```sh
docker exec -it caderninho-db psql -U admin caderninho < backup.sql
```

## Icons

Save the icons at folder "icons".

Run "node import_food_icons.js".
