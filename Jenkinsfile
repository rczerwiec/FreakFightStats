pipeline {
    agent {
        docker {
            image 'node:lts-bullseye-slim' 
            args '-p 5000:5000' 
        }
    }
    stages {
        stage('install') { 
            steps {
                sh 'npm install' 
            }
        }
    }
}