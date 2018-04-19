##### Prerequisites
* macOS: Docker for Mac
* Windows: Docker Toolbox
* Linux: Check your distro’s package manager (e.g. yum install docker)

##### Install AWS SAM Local CLI
`npm install -g aws-sam-local`

##### Install dependencies
`npm install`

##### Setup DynamoDB locally
`docker pull dwmkerr/dynamodb`

Then run:
`docker run -p 8888:8000 dwmkerr/dynamodb -sharedDb`

Then create table in DynamoDB:
`aws dynamodb create-table --cli-input-json file://schema.json --endpoint-url http://localhost:8888`

##### Run API locally
`sam local start-api`

#### Et Voilà
http://127.0.0.1:3000/test

##### Deploy
`./deploy.sh`

Then create table in DynamoDB:
``aws dynamodb create-table --cli-input-json file://schema.json`

#### Teardown
`.tearDown.sh`