pipeline {
  agent any

  environment {
    UI_DIR     = "parimey-khushali-wedding"
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
        dir(env.UI_DIR) {
          bat 'npm ci'
          bat 'npm ls @angular/animations'
        }
      }
    }

    stage('Build Angular (prod)') {
      steps {
        dir(env.UI_DIR) {
          bat 'npm run build -- --configuration production'
        }
      }
    }

    stage('Deploy to IIS (backup + deploy + recycle)') {
      steps {
        powershell """
          Import-Module WebAdministration

          # For SSR/prerender output: deploy dist/<app>/browser
          \$distPath = Join-Path \$env:WORKSPACE "dist\\\\parimey-khushali-wedding\\\\browser"
          if (!(Test-Path \$distPath)) { throw "distPath not found: \$distPath" }
          Write-Host "Using dist path: \$distPath"

          # Ensure IIS folder exists
          if (!(Test-Path "${env.IIS_PATH}")) { New-Item -ItemType Directory -Path "${env.IIS_PATH}" | Out-Null }

          # Backup current deployment
          if (Test-Path "${env.BACKUP_DIR}") { Remove-Item "${env.BACKUP_DIR}" -Recurse -Force }
          if (Test-Path "${env.IIS_PATH}") { Copy-Item "${env.IIS_PATH}" "${env.BACKUP_DIR}" -Recurse -Force -ErrorAction SilentlyContinue }

          # Clean target
          Get-ChildItem -Path "${env.IIS_PATH}" -Force | Remove-Item -Recurse -Force

          # Copy new site
          Copy-Item "\$distPath\\\\*" "${env.IIS_PATH}" -Recurse -Force

          # SPA fallback for Angular routes (requires IIS URL Rewrite module)
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

          # Write UTF-8 without BOM (avoids IIS 500.19 parse issues)
          [System.IO.File]::WriteAllText((Join-Path "${env.IIS_PATH}" "web.config"), \$webConfig, (New-Object System.Text.UTF8Encoding(\$false)))

          # Recycle pool
          Restart-WebAppPool -Name "${env.APP_POOL}"
        """
      }
    }

    stage('Smoke Test') {
      steps {
        powershell '''
          Start-Sleep -Seconds 2
          $resp = Invoke-WebRequest -Uri "http://localhost:8081/" -UseBasicParsing -TimeoutSec 15
          if ($resp.StatusCode -ne 200) {
            throw "Smoke test failed. Status: $($resp.StatusCode)"
          }
          Write-Host "Smoke test OK"
        '''
      }
    }
  }

  post {
    always {
      echo "Pipeline finished: ${currentBuild.currentResult}"
    }
  }
}
