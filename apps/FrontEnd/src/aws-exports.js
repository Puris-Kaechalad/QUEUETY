// src/aws-exports.js

const awsconfig = {
    aws_project_region: "YOUR_AWS_REGION",
    aws_cognito_identity_pool_id: "YOUR_COGNITO_IDENTITY_POOL_ID",
    aws_cognito_region: "YOUR_AWS_COGNITO_REGION",
    aws_user_pools_id: "YOUR_USER_POOLS_ID",
    aws_user_pools_web_client_id: "YOUR_WEB_CLIENT_ID",
    aws_appsync_graphqlEndpoint: "YOUR_GRAPHQL_ENDPOINT",
    aws_appsync_region: "YOUR_APPSYNC_REGION",
    aws_appsync_authenticationType: "AWS_IAM",
    aws_s3: {
        bucket: "YOUR_S3_BUCKET_NAME",
        region: "YOUR_S3_REGION",
    }
};

export default awsconfig;
