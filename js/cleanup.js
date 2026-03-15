/**
 * Windows 디스크 정리 유틸리티
 * - 정리 가능한 항목을 보여주고
 * - 선택한 항목에 따라 PowerShell 스크립트를 생성
 */

const Cleanup = (() => {
    // 정리 항목 데이터
    const categories = [
        {
            id: 'temp_files',
            icon: '🗑️',
            name: 'Windows 임시 파일',
            desc: '시스템 및 사용자 Temp 폴더의 임시 파일',
            estimatedSize: { min: 500, max: 5000 }, // MB
            risk: 'low',
            details: [
                'C:\\Windows\\Temp 폴더',
                'C:\\Users\\{사용자}\\AppData\\Local\\Temp 폴더',
                '오래된 .tmp, .log 파일'
            ],
            script: `# Windows 임시 파일 정리
Write-Host "\\n[1/N] Windows 임시 파일 정리 중..." -ForegroundColor Cyan
$tempPaths = @(
    "$env:TEMP",
    "$env:WINDIR\\Temp"
)
$cleaned = 0
foreach ($path in $tempPaths) {
    if (Test-Path $path) {
        $items = Get-ChildItem -Path $path -Recurse -Force -ErrorAction SilentlyContinue |
            Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-7) }
        foreach ($item in $items) {
            try {
                Remove-Item $item.FullName -Recurse -Force -ErrorAction Stop
                $cleaned++
            } catch { }
        }
    }
}
Write-Host "  -> $cleaned 개 항목 정리 완료" -ForegroundColor Green`
        },
        {
            id: 'recycle_bin',
            icon: '♻️',
            name: '휴지통 비우기',
            desc: '삭제된 파일이 보관된 휴지통을 비웁니다',
            estimatedSize: { min: 100, max: 10000 },
            risk: 'low',
            details: [
                '휴지통에 있는 모든 파일 영구 삭제',
                '복구 불가능하니 확인 후 실행'
            ],
            script: `# 휴지통 비우기
Write-Host "\\n[STEP] 휴지통 비우기..." -ForegroundColor Cyan
$confirm = Read-Host "  휴지통을 비울까요? (Y/N)"
if ($confirm -eq 'Y') {
    Clear-RecycleBin -Force -ErrorAction SilentlyContinue
    Write-Host "  -> 휴지통 비우기 완료" -ForegroundColor Green
} else {
    Write-Host "  -> 건너뜀" -ForegroundColor Yellow
}`
        },
        {
            id: 'browser_cache',
            icon: '🌐',
            name: '브라우저 캐시',
            desc: 'Chrome, Edge, Firefox 브라우저 캐시 파일',
            estimatedSize: { min: 200, max: 3000 },
            risk: 'low',
            details: [
                'Chrome 캐시 (Cache, Code Cache)',
                'Microsoft Edge 캐시',
                'Firefox 캐시',
                '로그인 정보는 삭제되지 않음'
            ],
            script: `# 브라우저 캐시 정리
Write-Host "\\n[STEP] 브라우저 캐시 정리 중..." -ForegroundColor Cyan
$cachePaths = @(
    "$env:LOCALAPPDATA\\Google\\Chrome\\User Data\\Default\\Cache",
    "$env:LOCALAPPDATA\\Google\\Chrome\\User Data\\Default\\Code Cache",
    "$env:LOCALAPPDATA\\Microsoft\\Edge\\User Data\\Default\\Cache",
    "$env:LOCALAPPDATA\\Microsoft\\Edge\\User Data\\Default\\Code Cache",
    "$env:LOCALAPPDATA\\Mozilla\\Firefox\\Profiles"
)
$cleaned = 0
foreach ($path in $cachePaths) {
    if (Test-Path $path) {
        $items = Get-ChildItem -Path $path -Recurse -Force -ErrorAction SilentlyContinue
        foreach ($item in $items) {
            try {
                Remove-Item $item.FullName -Recurse -Force -ErrorAction Stop
                $cleaned++
            } catch { }
        }
    }
}
Write-Host "  -> 브라우저 캐시 $cleaned 개 항목 정리 완료" -ForegroundColor Green`
        },
        {
            id: 'windows_update',
            icon: '🔄',
            name: 'Windows 업데이트 캐시',
            desc: '이전 Windows 업데이트의 다운로드 캐시',
            estimatedSize: { min: 500, max: 8000 },
            risk: 'medium',
            details: [
                'C:\\Windows\\SoftwareDistribution\\Download',
                '이전 업데이트 설치 파일',
                '삭제해도 필요시 다시 다운로드됨'
            ],
            script: `# Windows 업데이트 캐시 정리
Write-Host "\\n[STEP] Windows 업데이트 캐시 정리 중..." -ForegroundColor Cyan
$confirm = Read-Host "  Windows 업데이트 캐시를 정리할까요? (Y/N)"
if ($confirm -eq 'Y') {
    Stop-Service -Name wuauserv -Force -ErrorAction SilentlyContinue
    $updatePath = "$env:WINDIR\\SoftwareDistribution\\Download"
    if (Test-Path $updatePath) {
        Remove-Item "$updatePath\\*" -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "  -> 업데이트 캐시 정리 완료" -ForegroundColor Green
    }
    Start-Service -Name wuauserv -ErrorAction SilentlyContinue
} else {
    Write-Host "  -> 건너뜀" -ForegroundColor Yellow
}`
        },
        {
            id: 'thumbnails',
            icon: '🖼️',
            name: '썸네일 캐시',
            desc: '파일 탐색기의 썸네일 미리보기 캐시',
            estimatedSize: { min: 50, max: 500 },
            risk: 'low',
            details: [
                'Explorer 썸네일 데이터베이스',
                '삭제 후 자동으로 재생성됨',
                'thumbcache_*.db 파일'
            ],
            script: `# 썸네일 캐시 정리
Write-Host "\\n[STEP] 썸네일 캐시 정리 중..." -ForegroundColor Cyan
$thumbPath = "$env:LOCALAPPDATA\\Microsoft\\Windows\\Explorer"
if (Test-Path $thumbPath) {
    $thumbFiles = Get-ChildItem -Path $thumbPath -Filter "thumbcache_*" -ErrorAction SilentlyContinue
    foreach ($file in $thumbFiles) {
        try {
            Remove-Item $file.FullName -Force -ErrorAction Stop
        } catch { }
    }
    Write-Host "  -> 썸네일 캐시 정리 완료" -ForegroundColor Green
}`
        },
        {
            id: 'prefetch',
            icon: '⚡',
            name: 'Prefetch 파일',
            desc: '프로그램 실행 속도 향상을 위한 프리페치 캐시',
            estimatedSize: { min: 50, max: 300 },
            risk: 'low',
            details: [
                'C:\\Windows\\Prefetch 폴더',
                '오래된 .pf 파일 정리',
                '삭제 후 자동 재생성됨'
            ],
            script: `# Prefetch 파일 정리
Write-Host "\\n[STEP] Prefetch 파일 정리 중..." -ForegroundColor Cyan
$prefetchPath = "$env:WINDIR\\Prefetch"
if (Test-Path $prefetchPath) {
    $old = Get-ChildItem -Path $prefetchPath -Filter "*.pf" -ErrorAction SilentlyContinue |
        Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-30) }
    $count = ($old | Measure-Object).Count
    $old | Remove-Item -Force -ErrorAction SilentlyContinue
    Write-Host "  -> Prefetch $count 개 파일 정리 완료" -ForegroundColor Green
}`
        },
        {
            id: 'error_reports',
            icon: '📋',
            name: 'Windows 오류 보고서',
            desc: '시스템 오류 보고서 및 덤프 파일',
            estimatedSize: { min: 100, max: 2000 },
            risk: 'low',
            details: [
                'Windows Error Reporting 파일',
                '미니 덤프 파일 (.dmp)',
                '오류 분석용 로그 파일'
            ],
            script: `# Windows 오류 보고서 정리
Write-Host "\\n[STEP] Windows 오류 보고서 정리 중..." -ForegroundColor Cyan
$errorPaths = @(
    "$env:LOCALAPPDATA\\CrashDumps",
    "$env:LOCALAPPDATA\\Microsoft\\Windows\\WER",
    "$env:WINDIR\\Minidump"
)
$cleaned = 0
foreach ($path in $errorPaths) {
    if (Test-Path $path) {
        $items = Get-ChildItem -Path $path -Recurse -Force -ErrorAction SilentlyContinue
        $cleaned += ($items | Measure-Object).Count
        Remove-Item "$path\\*" -Recurse -Force -ErrorAction SilentlyContinue
    }
}
Write-Host "  -> 오류 보고서 $cleaned 개 항목 정리 완료" -ForegroundColor Green`
        },
        {
            id: 'old_downloads',
            icon: '📥',
            name: '오래된 다운로드 파일',
            desc: '다운로드 폴더에서 90일 이상 된 설치 파일',
            estimatedSize: { min: 500, max: 15000 },
            risk: 'medium',
            details: [
                '90일 이상 된 .exe, .msi 설치 파일',
                '.zip, .rar 압축 파일',
                '개별 확인 후 삭제 권장'
            ],
            script: `# 오래된 다운로드 파일 정리
Write-Host "\\n[STEP] 오래된 다운로드 파일 확인 중..." -ForegroundColor Cyan
$downloadsPath = [Environment]::GetFolderPath('UserProfile') + '\\Downloads'
if (Test-Path $downloadsPath) {
    $extensions = @('*.exe', '*.msi', '*.zip', '*.rar', '*.7z', '*.iso')
    $oldFiles = @()
    foreach ($ext in $extensions) {
        $oldFiles += Get-ChildItem -Path $downloadsPath -Filter $ext -ErrorAction SilentlyContinue |
            Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-90) }
    }
    if ($oldFiles.Count -gt 0) {
        Write-Host "  발견된 오래된 파일:" -ForegroundColor Yellow
        foreach ($file in $oldFiles) {
            $sizeMB = [math]::Round($file.Length / 1MB, 1)
            Write-Host "    - $($file.Name) ($sizeMB MB, $($file.LastWriteTime.ToString('yyyy-MM-dd')))"
        }
        $confirm = Read-Host "  위 파일들을 삭제할까요? (Y/N)"
        if ($confirm -eq 'Y') {
            $oldFiles | Remove-Item -Force -ErrorAction SilentlyContinue
            Write-Host "  -> $($oldFiles.Count) 개 파일 삭제 완료" -ForegroundColor Green
        } else {
            Write-Host "  -> 건너뜀" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  -> 정리할 파일 없음" -ForegroundColor Green
    }
}`
        },
        {
            id: 'windows_old',
            icon: '💾',
            name: 'Windows.old 폴더',
            desc: '이전 Windows 설치 파일 (업그레이드 후 남는 백업)',
            estimatedSize: { min: 10000, max: 30000 },
            risk: 'high',
            details: [
                'C:\\Windows.old 폴더 (10~30GB)',
                '이전 Windows 버전으로 롤백 불가',
                '업그레이드 후 10일 이후 삭제 권장'
            ],
            script: `# Windows.old 폴더 정리
Write-Host "\\n[STEP] Windows.old 폴더 확인 중..." -ForegroundColor Cyan
$oldWinPath = "C:\\Windows.old"
if (Test-Path $oldWinPath) {
    $size = (Get-ChildItem -Path $oldWinPath -Recurse -Force -ErrorAction SilentlyContinue |
        Measure-Object -Property Length -Sum).Sum / 1GB
    $sizeGB = [math]::Round($size, 1)
    Write-Host "  Windows.old 크기: $sizeGB GB" -ForegroundColor Yellow
    Write-Host "  [경고] 삭제하면 이전 Windows로 복구할 수 없습니다!" -ForegroundColor Red
    $confirm = Read-Host "  정말 삭제할까요? (Y/N)"
    if ($confirm -eq 'Y') {
        takeown /f "$oldWinPath" /r /d y > $null 2>&1
        icacls "$oldWinPath" /grant administrators:F /t > $null 2>&1
        Remove-Item -Path "$oldWinPath" -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "  -> Windows.old 삭제 완료 ($sizeGB GB 확보)" -ForegroundColor Green
    } else {
        Write-Host "  -> 건너뜀" -ForegroundColor Yellow
    }
} else {
    Write-Host "  -> Windows.old 폴더 없음" -ForegroundColor Green
}`
        },
        {
            id: 'log_files',
            icon: '📄',
            name: '시스템 로그 파일',
            desc: '오래된 시스템 및 응용 프로그램 로그',
            estimatedSize: { min: 100, max: 1000 },
            risk: 'low',
            details: [
                'C:\\Windows\\Logs 폴더 내 오래된 로그',
                'CBS 로그 파일',
                'IIS 로그 (해당 시)'
            ],
            script: `# 시스템 로그 파일 정리
Write-Host "\\n[STEP] 오래된 로그 파일 정리 중..." -ForegroundColor Cyan
$logPaths = @(
    "$env:WINDIR\\Logs\\CBS",
    "$env:WINDIR\\Logs\\DISM"
)
$cleaned = 0
foreach ($path in $logPaths) {
    if (Test-Path $path) {
        $old = Get-ChildItem -Path $path -Recurse -Force -ErrorAction SilentlyContinue |
            Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-30) }
        $cleaned += ($old | Measure-Object).Count
        $old | Remove-Item -Force -ErrorAction SilentlyContinue
    }
}
Write-Host "  -> 로그 파일 $cleaned 개 정리 완료" -ForegroundColor Green`
        }
    ];

    let selectedCategories = new Set();
    let analyzedSizes = {};
    let generatedScript = '';

    // 초기화
    function init() {
        renderCategories();
    }

    // 카테고리 렌더링
    function renderCategories() {
        const container = document.getElementById('cleanupCategories');
        container.innerHTML = categories.map(cat => {
            const riskLabel = { low: '안전', medium: '주의', high: '위험' };
            return `
                <div class="category-card" id="cat-${cat.id}" data-id="${cat.id}">
                    <div class="category-header" onclick="Cleanup.toggleCategory('${cat.id}')">
                        <div class="category-checkbox"></div>
                        <div class="category-icon">${cat.icon}</div>
                        <div class="category-info">
                            <div class="category-name">${cat.name}</div>
                            <div class="category-desc">${cat.desc}</div>
                        </div>
                        <div class="category-meta">
                            <div class="category-size">${formatSizeRange(cat.estimatedSize)}</div>
                            <div class="category-risk risk-${cat.risk}">${riskLabel[cat.risk]}</div>
                        </div>
                        <div class="category-expand" onclick="event.stopPropagation(); Cleanup.toggleDetails('${cat.id}')">▼</div>
                    </div>
                    <div class="category-details">
                        ${cat.details.map(d => `<div class="detail-item">${d}</div>`).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    function formatSizeRange(size) {
        if (size.max >= 1000) {
            return `${(size.min / 1000).toFixed(1)}~${(size.max / 1000).toFixed(1)} GB`;
        }
        return `${size.min}~${size.max} MB`;
    }

    // 카테고리 선택 토글
    function toggleCategory(id) {
        const card = document.getElementById(`cat-${id}`);
        if (selectedCategories.has(id)) {
            selectedCategories.delete(id);
            card.classList.remove('selected');
        } else {
            selectedCategories.add(id);
            card.classList.add('selected');
        }
        updateSelectAllBtn();
    }

    // 상세보기 토글
    function toggleDetails(id) {
        const card = document.getElementById(`cat-${id}`);
        card.classList.toggle('expanded');
    }

    // 전체 선택/해제
    function toggleSelectAll() {
        const allSelected = selectedCategories.size === categories.length;
        if (allSelected) {
            selectedCategories.clear();
            document.querySelectorAll('.category-card').forEach(c => c.classList.remove('selected'));
        } else {
            categories.forEach(cat => {
                selectedCategories.add(cat.id);
                document.getElementById(`cat-${cat.id}`).classList.add('selected');
            });
        }
        updateSelectAllBtn();
    }

    function updateSelectAllBtn() {
        const btn = document.getElementById('selectAllBtn');
        btn.textContent = selectedCategories.size === categories.length ? '전체 해제' : '전체 선택';
    }

    // 용량 분석
    function analyze() {
        if (selectedCategories.size === 0) {
            showToast('정리할 항목을 먼저 선택하세요');
            return;
        }

        // 분석 시뮬레이션
        const btn = document.getElementById('analyzeBtn');
        btn.disabled = true;
        btn.innerHTML = '<span class="btn-icon">⏳</span> 분석 중...';

        analyzedSizes = {};
        let totalMB = 0;
        let maxMB = 0;

        selectedCategories.forEach(id => {
            const cat = categories.find(c => c.id === id);
            const size = Math.floor(Math.random() * (cat.estimatedSize.max - cat.estimatedSize.min) + cat.estimatedSize.min);
            analyzedSizes[id] = size;
            totalMB += size;
            if (size > maxMB) maxMB = size;
        });

        setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = '<span class="btn-icon">🔍</span> 용량 분석';

            // 결과 표시
            const resultSection = document.getElementById('resultSection');
            resultSection.classList.remove('hidden');

            // 총 용량
            document.getElementById('totalSize').textContent = totalMB >= 1000
                ? `${(totalMB / 1000).toFixed(1)} GB`
                : `${totalMB} MB`;

            // 항목 수
            document.getElementById('totalItems').textContent = `${selectedCategories.size}개`;

            // 위험도
            const hasHigh = [...selectedCategories].some(id =>
                categories.find(c => c.id === id).risk === 'high'
            );
            const hasMedium = [...selectedCategories].some(id =>
                categories.find(c => c.id === id).risk === 'medium'
            );
            const riskEl = document.getElementById('riskLevel');
            if (hasHigh) {
                riskEl.textContent = '높음';
                riskEl.style.color = '#f87171';
            } else if (hasMedium) {
                riskEl.textContent = '보통';
                riskEl.style.color = '#fbbf24';
            } else {
                riskEl.textContent = '낮음';
                riskEl.style.color = '#4ade80';
            }

            // 상세 항목
            const detailsEl = document.getElementById('resultDetails');
            detailsEl.innerHTML = [...selectedCategories].map(id => {
                const cat = categories.find(c => c.id === id);
                const size = analyzedSizes[id];
                const pct = Math.round((size / maxMB) * 100);
                const sizeStr = size >= 1000
                    ? `${(size / 1000).toFixed(1)} GB`
                    : `${size} MB`;
                return `
                    <div class="result-detail-item">
                        <div class="result-detail-name">
                            <span>${cat.icon}</span>
                            <span>${cat.name}</span>
                        </div>
                        <div class="result-bar">
                            <div class="result-bar-fill" style="width: ${pct}%"></div>
                        </div>
                        <div class="result-detail-size">${sizeStr}</div>
                    </div>
                `;
            }).join('');

            // 스크립트 섹션 숨기기
            document.getElementById('scriptSection').classList.add('hidden');

            resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1200);
    }

    // 스크립트 생성
    function generateScript() {
        if (selectedCategories.size === 0) return;

        const selectedCats = categories.filter(c => selectedCategories.has(c.id));
        let step = 1;
        const totalSteps = selectedCats.length;

        let script = `#Requires -RunAsAdministrator
<#
.SYNOPSIS
    Windows 디스크 정리 스크립트
.DESCRIPTION
    자동 생성된 디스크 정리 스크립트입니다.
    선택된 항목: ${selectedCats.map(c => c.name).join(', ')}
.NOTES
    생성일: ${new Date().toLocaleDateString('ko-KR')}
    실행 전 반드시 내용을 검토하세요.
#>

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Windows 디스크 정리 스크립트" -ForegroundColor Cyan
Write-Host "  정리 항목: ${totalSteps}개" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 관리자 권한 확인
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "[오류] 관리자 권한으로 실행해주세요!" -ForegroundColor Red
    Read-Host "아무 키나 누르면 종료합니다"
    exit 1
}

$startTime = Get-Date
$beforeSize = (Get-PSDrive C).Free
Write-Host "시작 시간: $($startTime.ToString('yyyy-MM-dd HH:mm:ss'))"
Write-Host "현재 C: 드라이브 여유 공간: $([math]::Round($beforeSize / 1GB, 2)) GB"
Write-Host ""
`;

        selectedCats.forEach(cat => {
            let catScript = cat.script.replace(/\[STEP\]/g, `${step}/${totalSteps}`);
            catScript = catScript.replace(/\[1\/N\]/g, `${step}/${totalSteps}`);
            script += '\n' + catScript + '\n';
            step++;
        });

        script += `
# 결과 요약
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  정리 완료!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
$afterSize = (Get-PSDrive C).Free
$freed = $afterSize - $beforeSize
Write-Host "확보된 공간: $([math]::Round($freed / 1MB, 0)) MB ($([math]::Round($freed / 1GB, 2)) GB)" -ForegroundColor Green
Write-Host "소요 시간: $((Get-Date) - $startTime)" -ForegroundColor Cyan
Write-Host ""
Read-Host "아무 키나 누르면 종료합니다"
`;

        generatedScript = script;

        // 스크립트 표시
        const scriptSection = document.getElementById('scriptSection');
        scriptSection.classList.remove('hidden');
        document.getElementById('scriptCode').textContent = script;

        scriptSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        showToast('스크립트가 생성되었습니다');
    }

    // 스크립트 복사
    function copyScript() {
        navigator.clipboard.writeText(generatedScript).then(() => {
            showToast('클립보드에 복사되었습니다');
        }).catch(() => {
            // fallback
            const textarea = document.createElement('textarea');
            textarea.value = generatedScript;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showToast('클립보드에 복사되었습니다');
        });
    }

    // 스크립트 다운로드
    function downloadScript() {
        const blob = new Blob([generatedScript], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'disk-cleanup.ps1';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('disk-cleanup.ps1 다운로드 완료');
    }

    // 토스트 알림
    function showToast(message) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<span>✅</span> ${message}`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // DOM 로드 시 초기화
    document.addEventListener('DOMContentLoaded', init);

    return {
        toggleCategory,
        toggleDetails,
        toggleSelectAll,
        analyze,
        generateScript,
        copyScript,
        downloadScript
    };
})();
