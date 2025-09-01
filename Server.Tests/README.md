# Server tests

```bash
dotnet test

# FoodService
dotnet test --filter FullyQualifiedName~Server.Tests.Services.FoodServiceTests
```

Generate mock of foods:

```bash
docker exec -i caderninho-db psql -U admin -d caderninho -c "\copy (SELECT json_agg(row_to_json(f)) FROM (SELECT \"Id\", \"NamePt\", \"KeysPt\" FROM \"Foods\") f) TO STDOUT" > mocks/FoodsPt.json
```
