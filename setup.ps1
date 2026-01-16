# Course Registration System - Setup Script
# Run this script to create environment files

Write-Host "╔════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  SmartDesignHub Course Registration Setup         ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Create frontend .env
Write-Host "Creating frontend .env file..." -ForegroundColor Yellow
$frontendEnv = @"
# API Base URL
VITE_API_URL=http://localhost:5000
"@
Set-Content -Path "frontend\.env" -Value $frontendEnv
Write-Host "✓ Frontend .env created" -ForegroundColor Green

# Create backend .env
Write-Host "Creating backend .env file..." -ForegroundColor Yellow
$backendEnv = @"
# Server Configuration
PORT=5000

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# Recipient Email
RECIPIENT_EMAIL=adejumoadedayo350@gmail.com

# WhatsApp Payment Link
WHATSAPP_PAYMENT_LINK=https://wa.me/2348012345678?text=Hello%2C%20I%20want%20to%20complete%20my%20course%20payment

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
"@
Set-Content -Path "backend\.env" -Value $backendEnv
Write-Host "✓ Backend .env created" -ForegroundColor Green

Write-Host ""
Write-Host "════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "IMPORTANT: Please update the following in backend\.env:" -ForegroundColor Yellow
Write-Host "  1. EMAIL_USER - Your Gmail address" -ForegroundColor White
Write-Host "  2. EMAIL_PASS - Your Gmail App Password" -ForegroundColor White
Write-Host "  3. WHATSAPP_PAYMENT_LINK - Your WhatsApp payment link" -ForegroundColor White
Write-Host "════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Setup complete! Next steps:" -ForegroundColor Green
Write-Host "  1. Update backend\.env with your credentials" -ForegroundColor White
Write-Host "  2. Run 'cd backend' and 'npm run dev' to start the server" -ForegroundColor White
Write-Host "  3. Run 'cd frontend' and 'npm run dev' to start the app" -ForegroundColor White
Write-Host ""
