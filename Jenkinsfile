pipeline {
  agent any

  environment {
    UI_DIR     = "parimey-khushali-wedding"
    IIS_PATH   = "C:\\inetpub\\MyApp"
    APP_POOL   = "MyAppPool"
    BACKUP_DIR = "C:\\inetpub\\MyApp_backup"
    SITE_URL   = "http://localhost:8081/"
  }

  options { timestamps(); disableConcurrentBuilds() }

  stages {
    stage('Checkout') { steps { checkout scm } }

    stage('Install') {
      steps { dir(env.UI_DIR) { bat 'npm ci' } }
    }

    stage('Build') {
      steps { dir(env.UI_DIR) { bat 'npm run build -- --configuration production' } }
    }

    stage('Deploy to IIS') {
      steps {
        powershell """
          Import-Module WebAdministration

          # Angular build output is at WORKSPACE\\dist\\<app-name>
          \$distRoot = Join-Path \$env:WORKSPACE "dist"
          if (!(Test-Path \$distRoot)) { throw "dist not found: \$distRoot" }

          \$appDir = Get-ChildItem \$distRoot | Where-Object { \$_.PSIsContainer } | Select-Object -First 1
          if (!\$appDir) { throw "No folder inside dist" }

          \$distPath = \$appDir.FullName
          Write-Host "Using dist path: \$distPath"

          if (!(Test-Path "${env.IIS_PATH}")) { New-Item -ItemType Directory -Path "${env.IIS_PATH}" | Out-Null }

          if (Test-Path "${env.BACKUP_DIR}") { Remove-Item "${env.BACKUP_DIR}" -Recurse -Force }
          Copy-Item "${env.IIS_PATH}" "${env.BACKUP_DIR}" -Recurse -Force -ErrorAction SilentlyContinue

          Get-ChildItem -Path "${env.IIS_PATH}" -Force | Remove-Item -Recurse -Force
          Copy-Item "\$distPath\\*" "${env.IIS_PATH}" -Recurse -Force

          # SPA fallback
          \$webConfig = @'
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
          \$webConfig | Out-File -FilePath (Join-Path "${env.IIS_PATH}" "web.config") -Encoding utf8

          Restart-WebAppPool -Name "${env.APP_POOL}"
        """
      }
    }

    stage('Smoke Test') {
      steps {
        powershell '''
          $r = Invoke-WebRequest -Uri "${env:SITE_URL}" -UseBasicParsing -TimeoutSec 15
          if ($r.StatusCode -ne 200) { throw "Status: $($r.StatusCode)" }
          Write-Host "Smoke test OK"
        '''
      }
    }
  }
}
