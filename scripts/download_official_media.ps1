# Download media assets from officialbrasil.com.br into local assets/ folders
param()

Set-StrictMode -Version Latest

$base = Split-Path -Parent $MyInvocation.MyCommand.Definition
Push-Location $base

New-Item -ItemType Directory -Force -Path ..\assets\images | Out-Null
New-Item -ItemType Directory -Force -Path ..\assets\clients | Out-Null

$items = @(
    @{ url = 'https://static.wixstatic.com/media/3d8f97_17f669d6d0b040949f31f57ce539b70a~mv2.jpg'; out='..\assets\images\stand1.jpg' },
    @{ url = 'https://static.wixstatic.com/media/3d8f97_d969d23206c445bbb633c56e1898c69e~mv2.jpg'; out='..\assets\images\stand2.jpg' },
    @{ url = 'https://static.wixstatic.com/media/3d8f97_2a07b57d219944db83cdddd32607ef5c~mv2.jpg'; out='..\assets\images\stand3.jpg' },
    @{ url = 'https://static.wixstatic.com/media/3d8f97_ffe74184a73b4d8eb740cf91607c11e0~mv2.jpg'; out='..\assets\images\stand4.jpg' },
    @{ url = 'https://static.wixstatic.com/media/3d8f97_90c722cef4c44bc9b3b9192d89ca5549~mv2.jpg'; out='..\assets\images\stand5.jpg' },
    @{ url = 'https://static.wixstatic.com/media/3d8f97_bcc2c12dee3c4cf787d4dad5b47deece~mv2.jpg'; out='..\assets\images\stand6.jpg' },
    @{ url = 'https://static.wixstatic.com/media/3d8f97_a39f04da52c04c3eaefd0c2579152f9b~mv2.jpg'; out='..\assets\images\stand7.jpg' },
    @{ url = 'https://static.wixstatic.com/media/3d8f97_24a5e9534bc44f28a664f9968e85c2c3~mv2.jpg'; out='..\assets\images\stand8.jpg' },

    @{ url = 'https://static.wixstatic.com/media/3d8f97_a307a17f39a940dfa5171cf275dbd3a2~mv2.png'; out='..\assets\clients\maq.png' },
    @{ url = 'https://static.wixstatic.com/media/3d8f97_d41f26b3993a48f6b6ef408b6646bf08~mv2.png'; out='..\assets\clients\desema.png' },
    @{ url = 'https://static.wixstatic.com/media/3d8f97_f5c9cdc61d264b29b775e23eab0ea3b4~mv2.png'; out='..\assets\clients\ambfle.png' },
    @{ url = 'https://static.wixstatic.com/media/3d8f97_032e8924105944dcad967df6ce86eada~mv2.png'; out='..\assets\clients\mene.png' },
    @{ url = 'https://static.wixstatic.com/media/3d8f97_269ec211ec06447c965f636327ae2a59~mv2.png'; out='..\assets\clients\hit.png' },
    @{ url = 'https://static.wixstatic.com/media/3d8f97_4ab24b65a20e4656ab5e8e96f036dd6e~mv2.png'; out='..\assets\clients\albrecth.png' }
)

Write-Host "Starting download of $($items.Count) assets..."

foreach ($it in $items) {
    $url = $it.url
    $out = Resolve-Path -Path $it.out -Relative | ForEach-Object { $_ }
    $outFull = Join-Path -Path $base -ChildPath $it.out
    try {
        Write-Host "Downloading $url -> $outFull"
        Invoke-WebRequest -Uri $url -OutFile $outFull -UseBasicParsing -TimeoutSec 60
    }
    catch {
        Write-Warning "Failed to download $url : $_"
    }
}

Write-Host "Downloads complete. Check the assets folder." -ForegroundColor Green

Pop-Location
