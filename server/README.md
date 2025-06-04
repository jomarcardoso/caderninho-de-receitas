# Server

## Install and run

```
dotnet restore
dotnet build
dotnet run
```

## Entity framework

### Install

dotnet tool install --global dotnet-ef

### Run migrations

dotnet ef migrations add AdicionaDescricao
dotnet ef database update
