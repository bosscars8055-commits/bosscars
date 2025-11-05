# PowerShell script to fix API URLs in frontend files

$files = @(
    "C:\Users\sarav\Desktop\BOSSCARS\frontend\src\pages\AdminDashboard.jsx",
    "C:\Users\sarav\Desktop\BOSSCARS\frontend\src\pages\AdminPage.jsx"
)

foreach ($file in $files) {
    Write-Host "Processing $file..."
    $content = Get-Content $file -Raw
    
    # Replace single-quoted URLs
    $content = $content -replace "'http://localhost:5000", '`${API_BASE_URL}'
    
    # Replace URLs in template literals
    $content = $content -replace "``http://localhost:5000", '`${API_BASE_URL}'
    
    # Fix incorrectly replaced template literals from previous run
    $content = $content -replace "'\`\$\{API_BASE_URL\}", '`${API_BASE_URL}'
    
    Set-Content $file -Value $content -NoNewline
    Write-Host "✓ Updated $file"
}

Write-Host "`n✅ All files updated successfully!"
