param(
  [Parameter(Mandatory=$true)] [string]$SupabaseUrl,               # e.g. https://xxxxx.supabase.co
  [Parameter(Mandatory=$true)] [string]$AnonKey,                   # NEXT_PUBLIC_SUPABASE_ANON_KEY
  [Parameter(Mandatory=$false)] [string]$ApiBase = "http://localhost:3000",  # Your Next.js dev server
  [Parameter(Mandatory=$true)] [string]$Email,
  [Parameter(Mandatory=$true)] [string]$Password,
  [Parameter(Mandatory=$false)] [string]$Username = "testuser"
)

function Write-Step($msg) { Write-Host "[STEP] $msg" -ForegroundColor Cyan }
function Write-Ok($msg) { Write-Host "[ OK ] $msg" -ForegroundColor Green }
function Write-Fail($msg) { Write-Host "[FAIL] $msg" -ForegroundColor Red }

try {
  Write-Step "Signing in to Supabase to obtain access token"
  $authHeaders = @{ "apikey" = $AnonKey; "Content-Type" = "application/json" }
  $authBody = @{ email = $Email; password = $Password } | ConvertTo-Json -Depth 5
  $authRes = Invoke-RestMethod -Method Post -Uri "$SupabaseUrl/auth/v1/token?grant_type=password" -Headers $authHeaders -Body $authBody
  $accessToken = $authRes.access_token
  if (-not $accessToken) { throw "No access_token returned. Check email/password and Auth settings." }
  $userId = $authRes.user.id
  if (-not $userId) { throw "No user.id returned with token response." }
  Write-Ok "Signed in as user $userId"

  Write-Step "GET /api/profiles (public)"
  $getAll = Invoke-RestMethod -Method Get -Uri "$ApiBase/api/profiles"
  Write-Ok "Profiles count: $($getAll.Length)"

  Write-Step "POST /api/profiles (create own profile)"
  $apiHeaders = @{ "Authorization" = "Bearer $accessToken"; "Content-Type" = "application/json" }
  $createBody = @{ id = $userId; username = $Username; avatar_url = $null } | ConvertTo-Json -Depth 5
  try {
    $created = Invoke-RestMethod -Method Post -Uri "$ApiBase/api/profiles" -Headers $apiHeaders -Body $createBody
    Write-Ok "Created profile id=$($created.id) username=$($created.username)"
  } catch {
    $resp = $_.ErrorDetails.Message | ConvertFrom-Json -ErrorAction SilentlyContinue
    if ($resp.error -match "duplicate key" -or $resp.error -match "already exists") {
      Write-Ok "Profile already exists; continuing"
    } else {
      throw $_
    }
  }

  Write-Step "PATCH /api/profiles/{id} (update username)"
  $newUsername = "$Username-updated"
  $patchBody = @{ username = $newUsername } | ConvertTo-Json -Depth 5
  $updated = Invoke-RestMethod -Method Patch -Uri "$ApiBase/api/profiles/$userId" -Headers $apiHeaders -Body $patchBody
  if ($updated.username -ne $newUsername) { throw "Username update did not persist" }
  Write-Ok "Updated profile username to $newUsername"

  Write-Step "GET /api/profiles/{id} (verify)"
  $one = Invoke-RestMethod -Method Get -Uri "$ApiBase/api/profiles/$userId"
  if ($one.username -ne $newUsername) { throw "GET by id did not reflect update" }
  Write-Ok "Verified profile read matches update"

  Write-Host "\nAll API checks passed." -ForegroundColor Green
  exit 0
} catch {
  Write-Fail $_
  exit 1
}


