pipeline {
    agent {
        docker {
            image 'node:lts-bullseye-slim' 
            args '-p 5000:5000' 
        }
    }
    stages {
        stage('server') { 
            steps {
                sh 'npm install' 
            }
            steps {
                sh 'npm run server'
            }
        }
    }
}