pipeline {
    agent {
        docker {
            image 'node:latest' 
            args '-p 5000:5000' 
        }
    }
    stages {
        stage('build server') { 
            steps {
                sh 'npm install'
            }
        }
        stage('deploy a server') { 
            steps {
                sh 'npm run server'
            }
        }
    }
}