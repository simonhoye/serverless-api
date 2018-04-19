#! /bin/bash

set -eux

rm -rf node_modules/

npm install --only=production

if aws s3 ls "s3://serverless-api-hoye.cloud" 2>&1 | grep -q 'NoSuchBucket'
then
  aws s3 mb s3://serverless-api-hoye.cloud
fi

sam package --template-file template.yml \
  --s3-bucket serverless-api-hoye.cloud \
  --output-template-file packaged.yml

sam deploy --template-file ./packaged.yml \
  --stack-name serverless-api \
  --capabilities CAPABILITY_IAM