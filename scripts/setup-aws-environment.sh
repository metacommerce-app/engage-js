#!/usr/bin/env bash

### Some variables
AWS_REGION="us-east-2"

### Sanity checks
AWS_BIN=$(which aws)
if [ -z "${AWS_BIN}" ]; then
  echo "ERROR: Could not find the command aws."
  exit 255
fi

### CI specific values
if [ "${CI}" = "true" ]; then
  ROLE_SESSION_NAME=${Session_CI_Bot}
else
  ROLE_SESSION_NAME="Session_${HOSTNAME}"
fi

### Forcefully configure the default profile
aws configure set region "${AWS_REGION}" --profile default
aws configure set output "json" --profile default

### CI specific values
if [ "${CI}" = "true" ]; then
  if [ ! -z "${BOT_CI_ACCESS_KEY_ID}" ] &&  [ ! -z "${BOT_CI_SECRET_ACCESS_KEY}" ]; then
    echo "Will configure AWS credentials for CLI operations"
    echo "Processing credentials for default profile..."
    aws configure set aws_access_key_id "${BOT_CI_ACCESS_KEY_ID}" --profile default 1>/dev/null
    aws configure set aws_secret_access_key "${BOT_CI_SECRET_ACCESS_KEY}" --profile default 1>/dev/null
    
    echo "Processing credentials for development profile..."
    aws configure set aws_access_key_id "${BOT_CI_ACCESS_KEY_ID}" --profile development 1>/dev/null
    aws configure set aws_secret_access_key "${BOT_CI_SECRET_ACCESS_KEY}" --profile development 1>/dev/null
    echo "Will setup the development profile."
    aws configure set role_arn "arn:aws:iam::471375268096:role/Developers" --profile development
    aws configure set role_session_name "${ROLE_SESSION_NAME}" --profile development
    aws configure set duration_seconds "43200" --profile development
    aws configure set region "${AWS_REGION}" --profile development
    aws configure set output "json" --profile development
    aws configure set source_profile "default" --profile development

    echo "Processing credentials for staging profile..."
    aws configure set aws_access_key_id "${BOT_CI_ACCESS_KEY_ID}" --profile staging 1>/dev/null
    aws configure set aws_secret_access_key "${BOT_CI_SECRET_ACCESS_KEY}" --profile staging 1>/dev/null
    echo "Will setup the staging profile."
    aws configure set role_arn "arn:aws:iam::208830276782:role/Developers" --profile staging
    aws configure set role_session_name "${ROLE_SESSION_NAME}" --profile staging
    aws configure set duration_seconds "43200" --profile staging
    aws configure set region "${AWS_REGION}" --profile staging
    aws configure set output "json" --profile staging
    aws configure set source_profile "default" --profile staging

    echo "Processing credentials for production profile..."
    aws configure set aws_access_key_id "${BOT_CI_ACCESS_KEY_ID}" --profile production 1>/dev/null
    aws configure set aws_secret_access_key "${BOT_CI_SECRET_ACCESS_KEY}" --profile production 1>/dev/null
    echo "Will setup the production profile."
    aws configure set role_arn "arn:aws:iam::918666311726:role/Developers" --profile production
    aws configure set role_session_name "${ROLE_SESSION_NAME}" --profile production
    aws configure set duration_seconds "43200" --profile production
    aws configure set region "${AWS_REGION}" --profile production
    aws configure set output "json" --profile production
    aws configure set source_profile "default" --profile production
  else
    echo "ERROR: We could not find credentials to configure."
    exit 255
  fi
else
  echo "Not meant to run on workstations."
  echo
  exit 255
fi

echo "Finished."
exit 0
