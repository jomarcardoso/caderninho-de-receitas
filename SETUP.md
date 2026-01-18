# Setup

## Prerequisites
- Node.js (LTS) and npm
- .NET SDK 9.0
- Caddy (local HTTPS proxy)

Install Caddy (one time):
```powershell
winget install --id CaddyServer.Caddy -e
```

## Configure env
Frontend env: `www/.env.local`
```
NEXT_PUBLIC_SITE_URL=https://local.myapp.test
NEXT_PUBLIC_API_BASE_URL=https://local.myapp.test
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
```

Backend env: `Server/appsettings.Development.json`
```
Gcs:CredentialsPath = "C:\\secrets\\caderninho-de-receitas-service-account.json"
Firebase:ServiceAccountPath = "C:\\secrets\\caderninho-de-receitas-service-account.json"
```
Keep the service account json out of git (store it outside the repo).

## Local HTTPS (Caddy + hosts)
1) Add hosts entry (admin):
```powershell
Add-Content -Path "$env:SystemRoot\System32\drivers\etc\hosts" -Value "127.0.0.1`tlocal.myapp.test"
```

2) Trust the Caddy local CA (admin):
```powershell
caddy trust
```

## Run the app (3 terminals)
Backend:
```powershell
cd Server
dotnet run --launch-profile http
```

Frontend:
```powershell
cd www
npm install
npm run dev
```

Caddy:
```powershell
cd <repo>
caddy run --config .\Caddyfile --adapter caddyfile
```

Open: `https://local.myapp.test`

## One command
```powershell
.\dev.ps1
```
If PowerShell blocks scripts, run (once):
```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

## Notes
- `Caddyfile` proxies `/api/*` to `http://localhost:5106` and everything else to `http://localhost:3000`.
- Do not use Next `/api` routes in this project; the backend is accessed via `/api` (proxy).
