pipeline {
  agent any
  stages {
    stage('Hello') {
      steps {
        echo 'Jenkins connected to Git successfully'
        bat 'whoami'
        bat 'java -version'
        bat 'dotnet --version'
        bat 'node -v'
        bat 'npm -v'
      }
    }
  }
}
