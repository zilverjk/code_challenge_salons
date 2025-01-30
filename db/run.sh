#!/bin/sh

# Variables
CONTAINER_NAME="code_challenge_db"
PORT=5472

# Stop and remove the container if it already exists
docker stop $CONTAINER_NAME > /dev/null 2>&1
docker rm $CONTAINER_NAME > /dev/null 2>&1

# Run the PostgreSQL container
docker run -d \
  --name $CONTAINER_NAME \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=$CONTAINER_NAME \
  -p $PORT:5432 \
  -v $(pwd)/init.sql:/docker-entrypoint-initdb.d/init.sql \
  postgres:latest
  postgres:latest

# Print connection details
echo "PostgreSQL container is running!"
echo "Connection URL: postgresql://postgres:postgres@localhost:$PORT/$CONTAINER_NAME"
