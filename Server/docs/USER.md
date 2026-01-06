# User

## Services

### GoogleAuthService

#### ValidateAsync

Arguments:

- idToken

Returns:

- if null: null
- if invalid: null
- if valid: `GoogleUserInfo`

## Workflow

### Login with Google

- Endpoint: AuthController.GoogleLogin({ idToken: '' })
  - GoogleAuthService.ValidateAsync(idToken, cancellationToken) => `GoogleJsonWebSignature.Payload`
    - GoogleJsonWebSignature.ValidateAsync(idToken, audiences, cancellationToken) => `GoogleJsonWebSignature.Payload`
- UserProfileFactory.FromGooglePayload()
- UserProfileService.GetRolesAsync()

### Login with Tiktok

- Endpoint: AuthController.TiktokLogin({ idToken: '' })
  - TiktokAuthService.ValidateAsync(idToken, cancellationToken) => `GoogleJsonWebSignature.Payload`

Aqui vai um resumo direto do fluxo em AuthController.GoogleLogin:

Busca no banco:
Procura UserProfile por GoogleId.
Se não encontrar, tenta por e-mail já cadastrado (Emails contém o email).
Se ainda não encontrar, cria um novo UserProfile com Id aleatório (Guid string), GoogleId, GoogleEmailVerified, Emails = [email], roles padrão (keeper?), e Revisions com displayName/picture/given/family da claims; visibilidade privada.
Atualização (para usuário existente):
Se faltam GoogleId/Emails, preenche.
Sincroniza displayName/picture/given/family na LatestRevision (ou cria revisão) se vieram no payload e não existiam.
Atualiza LastLoginAtUtc.
Persistência: salva alterações; garante LatestRevision e PublishedRevision se não existirem (publicada opcional).
Geração de claims/token:
Cria lista de claims (sub = user.Id, name = displayName, email, roles, locale/lang etc).
Usa JwtSecurityTokenHandler com issuer/audience/expiry configurados para gerar token JWT.
Resposta: retorna UserProfileOwnerResponse (via builder) e o token JWT.
Em resumo: valida idToken no Google → resolve/atualiza/perfis por GoogleId ou e-mail → cria se não existir → sincroniza campos básicos → gera JWT com claims → devolve usuário + token.
