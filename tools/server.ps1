$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:5555/")
$listener.Start()
Write-Host "Listening at http://localhost:5555/" -ForegroundColor Green
while ($listener.IsListening) {
  try {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $resp = $ctx.Response
    $path = [Uri]::UnescapeDataString($req.Url.LocalPath)
    if ($path -eq "/") { $path = "/index.html" }
    $fullPath = Join-Path "d:\GitHub_Clone\VALORENT_TL" $path
    if (Test-Path $fullPath -PathType Leaf) {
      $bytes = [System.IO.File]::ReadAllBytes($fullPath)
      $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
      $mime = @{
        ".html"="text/html; charset=utf-8";
        ".js"="application/javascript; charset=utf-8";
        ".css"="text/css; charset=utf-8";
        ".png"="image/png";
        ".jpg"="image/jpeg";
        ".jpeg"="image/jpeg";
        ".svg"="image/svg+xml";
        ".ico"="image/x-icon";
        ".json"="application/json; charset=utf-8";
        ".webp"="image/webp";
      }[$ext]
      if (-not $mime) { $mime = "application/octet-stream" }
      $resp.ContentType = $mime
      $resp.ContentLength64 = $bytes.Length
      $resp.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $resp.StatusCode = 404
      $buf = [Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
      $resp.ContentLength64 = $buf.Length
      $resp.OutputStream.Write($buf, 0, $buf.Length)
    }
    $resp.OutputStream.Close()
  } catch {
    Write-Host "Error: $_" -ForegroundColor Red
  }
}
