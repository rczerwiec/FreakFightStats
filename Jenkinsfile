pipeline {
    agent any
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