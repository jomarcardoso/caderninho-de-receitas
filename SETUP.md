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
NEXT_PUBLIC_SITE_URL=https://localhost
NEXT_PUBLIC_API_BASE_URL=https://localhost
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
```

Backend env: `Server/appsettings.Development.json`

```
Gcs:CredentialsPath = "C:\\secrets\\recepta-book-firebase-adminsdk-fbsvc-11bc6cf2f5.json"
Firebase:ServiceAccountPath = "C:\\secrets\\recepta-book-firebase-adminsdk-fbsvc-11bc6cf2f5.json"
Firebase:ProjectId = "recepta-book"
```

Keep the service account json out of git (store it outside the repo).

## Local HTTPS (Caddy + localhost)

1. Start Caddy in a terminal:

```powershell
caddy run --config ./Caddyfile --adapter caddyfile
```

2. Trust the Caddy local CA (admin):

```powershell
caddy trust
```

Note: `caddy trust` requires the Caddy admin API, so keep Caddy running while you run the command.
No hosts entry is needed when using `https://localhost`.

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

```bash
cd <repo>
caddy run --config ./Caddyfile --adapter caddyfile
```
If Caddy is already running from the trust step, you can skip this.

Open: `https://localhost`

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

## Links

- Google OAuth clients: https://console.cloud.google.com/auth/clients?project=recepta-book-484823
- Firebase Auth providers: https://console.firebase.google.com/project/recepta-book/authentication/providers
- Firebase project settings (web app): https://console.firebase.google.com/project/recepta-book/settings/general/web:NDIxNDdjNDgtNmEyZi00OTUxLWFkMWMtZTY3NDNkNGU4ZWVl
- Firebase service accounts: https://console.firebase.google.com/project/recepta-book/settings/serviceaccounts/adminsdk
