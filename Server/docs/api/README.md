# Documentação da API (Swagger/OpenAPI)

Este diretório armazena o `swagger.json` gerado a partir do Server e o Markdown derivado dele.

## Scripts prontos

Opção 1 (recomendada) – bash dentro de `Server`:
```bash
# a partir da pasta Server
./dev-tools.sh
```

Opção 2 – PowerShell dentro de `Server`:
```powershell
# a partir da pasta Server
powershell -ExecutionPolicy Bypass -File ./docs/api/export-swagger.ps1
```

Por padrão os scripts:
- Roda `dotnet tool restore` para garantir o CLI do Swashbuckle.
- Faz `dotnet build` (Debug/net9.0) para produzir o assembly.
- Executa `dotnet swagger tofile --output docs/api/swagger.json ... v1`.
- Se encontrar o comando `npx` e o pacote `swagger-markdown` disponível, converte para `docs/api/swagger.md`. Você pode instalar com:
  ```bash
  npm install --prefix docs/api swagger-markdown
  npx --prefix docs/api swagger-markdown -i docs/api/swagger.json -o docs/api/swagger.md
  ```
- Durante o swagger export, o script seta `SWAGGER_EXPORT=1` para que o `Program.cs` use DB em memória e pule migrações.
- Também seta `DOTNET_ROLL_FORWARD=Major` para permitir que o `dotnet-swagger` (que pode ser net7) rode com runtime 8/9.

## Saídas esperadas
- `docs/api/swagger.json`: OpenAPI extraído do assembly.
- `docs/api/swagger.md` (opcional): Markdown derivado, útil para leitura rápida.

Se preferir rodar manualmente:
```powershell
dotnet tool restore
dotnet build ./Server.csproj -c Debug
dotnet swagger tofile --output ./docs/api/swagger.json ./bin/Debug/net9.0/Server.dll v1
```
