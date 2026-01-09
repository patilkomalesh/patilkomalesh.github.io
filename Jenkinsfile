pipeline {
  agent any

  environment {
    IIS_PATH   = "C:\\inetpub\\MyApp"
    APP_POOL   = "MyAppPool"
    BACKUP_DIR = "C:\\inetpub\\MyApp_backup"
    SITE_URL   = "http://localhost:8081/"
  }

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install') {
      steps {
        bat 'npm ci'
      }
    }

    stage('Build Angular') {
      steps {
        bat 'npm run build -- --configuration production'
      }
    }

    stage('Deploy to IIS (backup + deploy + recycle)') {
      steps {
        powershell '''
          Import-Module WebAdministration

          $distRoot = Join-Path $env:WORKSPACE "dist"
          if (!(Test-Path $distRoot)) { throw "dist folder not found: $distRoot" }

          # Angular outputs dist/<app-name>/ ... take first folder inside dist
          $appDir = Get-ChildItem $distRoot | Where-Object { $_.PSIsContainer } | Select-Object -First 1
          if (!$appDir) { throw "No app folder found inside dist" }

          $distPath = $appDir.FullName
          Write-Host "Using dist path: $distPath"

          # Ensure IIS folder exists
          if (!(Test-Path "${env:IIS_PATH}")) { New-Item -ItemType Directory -Path "${env:IIS_PATH}" | Out-Null }

          # Backup current deployment
          if (Test-Path "${env:BACKUP_DIR}") { Remove-Item "${env:BACKUP_DIR}" -Recurse -Force }
          if (Test-Path "${env:IIS_PATH}") { Copy-Item "${env:IIS_PATH}" "${env:BACKUP_DIR}" -Recurse -Force }

          # Clean target
          Get-ChildItem -Path "${env:IIS_PATH}" -Force | Remove-Item -Recurse -Force

          # Copy new dist
          Copy-Item "$distPath\\*" "${env:IIS_PATH}" -Recurse -Force

          # SPA fallback (Angular routing)
          $webConfig = @'
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="Angular Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
'@
          $webConfig | Out-File -FilePath (Join-Path "${env:IIS_PATH}" "web.config") -Encoding utf8

          # Recycle App Pool (optional but clean)
          Restart-WebAppPool -Name "${env:APP_POOL}"
        '''
      }
    }

    stage('Smoke Test') {
      steps {
        powershell '''
          try {
            $r = Invoke-WebRequest -Uri "${env:SITE_URL}" -UseBasicParsing -TimeoutSec 15
            if ($r.StatusCode -ne 200) { throw "Status: $($r.StatusCode)" }
            Write-Host "Smoke test OK"
          } catch {
            Write-Host "Smoke test FAILED. Rolling back..."
            Import-Module WebAdministration
            Stop-WebAppPool -Name "${env:APP_POOL}"
            Get-ChildItem -Path "${env:IIS_PATH}" -Force | Remove-Item -Recurse -Force
            Copy-Item "${env:BACKUP_DIR}\\*" "${env:IIS_PATH}" -Recurse -Force
            Start-WebAppPool -Name "${env:APP_POOL}"
            throw
          }
        '''
      }
    }
  }
}
