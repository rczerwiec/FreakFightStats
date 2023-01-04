pipeline {
    agent any
    stages {
        stage('build server') { 
            steps {
                sh 'npm install'
            }
        }
        stage('test') { 
            steps {
            }
        }
        stage('deploy a server') { 
            steps {
                sh 'npm run server'
            }
        }
    }
}