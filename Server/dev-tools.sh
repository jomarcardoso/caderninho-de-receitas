#!/usr/bin/env bash
set -euo pipefail

# Raiz do projeto Server (este arquivo reside em Server/)
ROOT="$(cd -- "$(dirname "$0")" && pwd)"
cd "$ROOT"

# 1) Restaurar tool manifest (Swashbuckle CLI)
dotnet tool restore

# 2) Build da API
dotnet build "$ROOT/Server.csproj" -c Debug -p:UseAppHost=false

# 3) Gerar swagger.json
SWAGGER_EXPORT=1 DOTNET_ROLL_FORWARD=Major \
dotnet tool run swagger tofile --output "$ROOT/docs/api/swagger.json" "$ROOT/bin/Debug/net9.0/Server.dll" v1

# 4) Gerar swagger.md
npx --prefix "$ROOT/docs/api" swagger-markdown -i "$ROOT/docs/api/swagger.json" -o "$ROOT/docs/api/swagger.md"
