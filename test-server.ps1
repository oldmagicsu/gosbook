# 简单的PowerShell Web服务器脚本

# 创建HttpListener对象
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8000/")

# 启动监听器
$listener.Start()
Write-Host "服务器已启动，监听地址: http://localhost:8000/"
Write-Host "按Ctrl+C停止服务器"

# MIME类型映射
$mimeTypes = @{
    ".html" = "text/html"
    ".css"  = "text/css"
    ".js"   = "application/javascript"
    ".json" = "application/json"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
}

# 获取当前脚本所在目录
$baseDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# 处理请求的函数
function Handle-Request($context) {
    try {
        $request = $context.Request
        $response = $context.Response
        
        # 获取请求的URL路径
        $path = $request.Url.LocalPath
        
        # 默认路径重定向到index.html
        if ($path -eq "/") {
            $path = "/index.html"
        }
        
        # 构建文件完整路径
        $filePath = Join-Path $baseDir ($path -replace "^/", "")
        
        # 检查文件是否存在
        if (Test-Path $filePath -PathType Leaf) {
            # 获取文件扩展名
            $extension = [System.IO.Path]::GetExtension($filePath)
            
            # 设置响应内容类型
            if ($mimeTypes.ContainsKey($extension)) {
                $response.ContentType = $mimeTypes[$extension]
            } else {
                $response.ContentType = "application/octet-stream"
            }
            
            # 读取文件内容并发送响应
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $content.Length
            $output = $response.OutputStream
            $output.Write($content, 0, $content.Length)
            $output.Close()
            
            Write-Host "200 OK - $path"
        } else {
            # 404错误
            $response.StatusCode = 404
            $content = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 Not Found</h1><p>请求的资源 '$path' 不存在</p>")
            $response.ContentLength64 = $content.Length
            $output = $response.OutputStream
            $output.Write($content, 0, $content.Length)
            $output.Close()
            
            Write-Host "404 Not Found - $path"
        }
    } catch {
        Write-Host "错误处理请求: $_"
    }
}

# 主循环，持续接受请求
try {
    while ($listener.IsListening) {
        # 异步接受请求
        $context = $listener.GetContext()
        
        # 处理请求（在后台运行以支持并发）
        Start-Job -ScriptBlock ${function:Handle-Request} -ArgumentList $context | Out-Null
    }
} catch {
    Write-Host "服务器错误: $_"
} finally {
    # 停止监听器
    $listener.Stop()
    $listener.Close()
    Write-Host "Server stopped"
}