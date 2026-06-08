$files = @(
    'c:\Users\krishna\Documents\vedikresort11\eventswedding.html',
    'c:\Users\krishna\Documents\vedikresort11\gallery.html',
    'c:\Users\krishna\Documents\vedikresort11\pure-veg-restaurant-namak.html',
    'c:\Users\krishna\Documents\vedikresort11\deluxe-room.html',
    'c:\Users\krishna\Documents\vedikresort11\deluxe-room-pool-view.html',
    'c:\Users\krishna\Documents\vedikresort11\loft-room.html',
    'c:\Users\krishna\Documents\vedikresort11\loft-room-with-pool-view.html',
    'c:\Users\krishna\Documents\vedikresort11\suite.html',
    'c:\Users\krishna\Documents\vedikresort11\offers.html',
    'c:\Users\krishna\Documents\vedikresort11\madhuvanlawn.html'
)

$lucideScript = '<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>'
$lucideInit = '<script>if (typeof lucide !== ''undefined'') lucide.createIcons();</script>'

# The canonical footer bottom-right and social removal
$oldStaah = 'Powered by STAAH · Designed with Purpose'
$newCopy = '© 2026 Vedik Resort'

foreach ($file in $files) {
    $content = Get-Content $file -Raw -Encoding UTF8
    
    # Add Lucide script if not already present
    if ($content -notmatch 'lucide@latest') {
        $content = $content -replace '(<link rel="stylesheet" href="css/responsive\.css"[^/]*/?>)', "$1`n  $lucideScript"
    }
    
    # Fix STAAH footer text (already handled by previous script, but ensure)
    $content = $content -replace [regex]::Escape($oldStaah), $newCopy
    
    # Remove dead social icons block
    $content = $content -replace '(?s)<div class="footer-social"[^>]*>.*?</div>\s*', ''
    
    # Fix footer-bottom-right if still has old copyright format
    $content = $content -replace '<div class="footer-bottom-right">© 2026 Vedik Resort</div>', '<div class="footer-bottom-right">© 2026 Vedik Resort</div>'
    
    # Add Booking & Cancellation Policy link in footer if missing
    if ($content -match 'footer-bottom-left' -and $content -notmatch 'booking-cancellation-policy') {
        $content = $content -replace '(<a href="privacy-policy\.html">Privacy Policy</a>\s*</div>)', '$1' -replace '(<a href="privacy-policy\.html">Privacy Policy</a>)(</div>)', '$1<span class="footer-bottom-sep">·</span><a href="booking-cancellation-policy.html">Booking &amp; Cancellation Policy</a>$2'
    }
    
    # Add lucide init before </body> if not present
    if ($content -notmatch 'lucide\.createIcons') {
        $content = $content -replace '(<script src="js/main\.js"></script>)', "$1`n  $lucideInit"
    }
    
    # Fix WhatsApp number (just in case)
    $content = $content -replace 'wa\.me/70480333000', 'wa.me/917048033300'
    
    Set-Content $file -Value $content -Encoding UTF8 -NoNewline
    Write-Host "Updated: $(Split-Path $file -Leaf)"
}

Write-Host "Bulk update complete."
