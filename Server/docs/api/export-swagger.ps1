param(
  [string]$Configuration = "Debug",
  [string]$Framework = "net9.0"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# Caminhos principais
$serverRoot = Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path))
$projectPath = Join-Path $serverRoot "Server.csproj"
$assemblyPath = Join-Path $serverRoot "bin\$Configuration\$Framework\Server.dll"
$apiDir = Join-Path $serverRoot "docs/api"
$swaggerJsonPath = Join-Path $apiDir "swagger.json"
$swaggerMdPath = Join-Path $apiDir "swagger.md"
$swaggerMdLog = Join-Path $apiDir "swagger-md.log"
$buildLog = Join-Path $apiDir "build.log"

Write-Host "Restaurando ferramentas dotnet..." -ForegroundColor Cyan
$originalLocation = Get-Location
try {
  Set-Location $serverRoot

  dotnet tool restore | Out-Null

  Write-Host "Construindo projeto ($Configuration/$Framework)..." -ForegroundColor Cyan
  dotnet build $projectPath -c $Configuration -p:UseAppHost=false *>&1 | Tee-Object -FilePath $buildLog | Out-Null
  if ($LASTEXITCODE -ne 0) {
    Write-Warning "dotnet build falhou. Veja log em $buildLog"
    throw "dotnet build falhou. Verifique se não há Server.exe em execução bloqueando o binário ou erros no build log."
  }

  Write-Host "Gerando swagger.json..." -ForegroundColor Cyan
  $env:SWAGGER_EXPORT = "1"
  $env:DOTNET_ROLL_FORWARD = "Major"
  dotnet tool run swagger tofile --output $swaggerJsonPath $assemblyPath v1
  $env:SWAGGER_EXPORT = $null
  $env:DOTNET_ROLL_FORWARD = $null
  if ($LASTEXITCODE -ne 0) {
    throw "dotnet swagger tofile falhou. Confirme caminho do assembly: $assemblyPath"
  }
}
finally {
  Set-Location $originalLocation
}

if (-not (Test-Path $swaggerJsonPath) -or ((Get-Item $swaggerJsonPath).Length -eq 0)) {
  throw "swagger.json não foi gerado ou está vazio em $swaggerJsonPath"
}
Write-Host "swagger.json salvo em $swaggerJsonPath" -ForegroundColor Green

# Conversão opcional para Markdown
try {
  $swaggerMarkdownCmd = "npx"
  $npmVersion = (& $swaggerMarkdownCmd --version 2>$null)
  if ($LASTEXITCODE -eq 0) {
    if (Test-Path $swaggerMdLog) { Remove-Item $swaggerMdLog -Force -ErrorAction SilentlyContinue }
    Write-Host "Gerando swagger.md (via npx swagger-markdown)..." -ForegroundColor Cyan
    Push-Location $apiDir
    try {
      $arguments = @("--prefix", $apiDir, "swagger-markdown", "-i", $swaggerJsonPath, "-o", $swaggerMdPath)
      & $swaggerMarkdownCmd $arguments *>&1 | Tee-Object -FilePath $swaggerMdLog | Out-Null
      if ($LASTEXITCODE -eq 0) {
        Write-Host "swagger.md salvo em $swaggerMdPath" -ForegroundColor Green
      } else {
        Write-Warning "npx swagger-markdown falhou (exit $LASTEXITCODE); veja log em $swaggerMdLog. Verifique se o pacote está instalado em docs/api (npm install --prefix docs/api swagger-markdown)."
        if (Test-Path $swaggerMdLog) {
          Write-Host "`n--- swagger-md.log (últimas 40 linhas) ---" -ForegroundColor Yellow
          Get-Content $swaggerMdLog -Tail 40
          Write-Host "--- fim do log ---`n" -ForegroundColor Yellow
        }
      }
    } finally {
      Pop-Location
    }
  } else {
    Write-Host "npx não encontrado; pulei a geração de swagger.md" -ForegroundColor Yellow
  }
} catch {
  $msg = $_.Exception.Message
  Write-Warning "Falha ao gerar swagger.md: $msg"
}
