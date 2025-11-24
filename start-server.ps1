$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:8000/')
$listener.Start()
Write-Host 'Web服务器启动在 http://localhost:8000/ 请按Ctrl+C停止服务'

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $path = $request.Url.LocalPath.TrimStart('/')
        if ($path -eq '') {
            $path = 'index.html'
        }
        
        $filePath = Join-Path $PSScriptRoot $path
        
        if (Test-Path $filePath -PathType Leaf) {
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $content.Length
            
            # 设置MIME类型
            if ($filePath -match '\.html$') {
                $response.ContentType = 'text/html'
            } elseif ($filePath -match '\.js$') {
                $response.ContentType = 'application/javascript'
            } elseif ($filePath -match '\.css$') {
                $response.ContentType = 'text/css'
            } elseif ($filePath -match '\.json$') {
                $response.ContentType = 'application/json'
            }
            
            $output = $response.OutputStream
            $output.Write($content, 0, $content.Length)
            $output.Close()
        } else {
            $response.StatusCode = 404
            $response.Close()
        }
    } catch {
        Write-Error $_
    }
}