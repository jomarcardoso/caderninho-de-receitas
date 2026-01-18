$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$serverDir = Join-Path $repoRoot "Server"
$webDir = Join-Path $repoRoot "www"
$caddyfile = Join-Path $repoRoot "Caddyfile"

$caddyExe = (Get-Command caddy -ErrorAction SilentlyContinue).Path
if (-not $caddyExe) {
  $wingetCaddy = Join-Path $env:LOCALAPPDATA "Microsoft\\WinGet\\Packages\\CaddyServer.Caddy_Microsoft.Winget.Source_8wekyb3d8bbwe\\caddy.exe"
  if (Test-Path $wingetCaddy) {
    $caddyExe = $wingetCaddy
  } else {
    throw "Caddy not found. Install with: winget install --id CaddyServer.Caddy -e"
  }
}

Start-Process -FilePath dotnet -ArgumentList @("run", "--launch-profile", "http") -WorkingDirectory $serverDir
Start-Process -FilePath npm -ArgumentList @("run", "dev") -WorkingDirectory $webDir
Start-Process -FilePath $caddyExe -ArgumentList @("run", "--config", $caddyfile, "--adapter", "caddyfile") -WorkingDirectory $repoRoot
