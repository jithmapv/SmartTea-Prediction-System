# Start all servers for the Integrated System

Write-Host "Starting Integrated System..." -ForegroundColor Green

# Start Python FastAPI Backend
Write-Host "`nStarting Python FastAPI Backend on port 8000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'd:\SLIIIT\Research Implementation\INTEGRATED SYSTEM\Integrated_System\backend'; python -m uvicorn main:app --port 8000"

# Wait a bit for the first server to start
Start-Sleep -Seconds 3

# Start Node.js Backend  
Write-Host "`nStarting Node.js Backend on port 5001..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'd:\SLIIIT\Research Implementation\INTEGRATED SYSTEM\Integrated_System\DashBoard\backend'; npm start"

# Wait a bit
Start-Sleep -Seconds 3

# Start React Frontend
Write-Host "`nStarting React Frontend on port 3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'd:\SLIIIT\Research Implementation\INTEGRATED SYSTEM\Integrated_System\DashBoard\frontend'; npm start"

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "All servers are starting!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Python API: http://localhost:8000" -ForegroundColor Cyan
Write-Host "Node.js API: http://localhost:5001" -ForegroundColor Cyan
Write-Host "React Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Green
