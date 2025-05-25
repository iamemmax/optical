#!/bin/bash

# Script to push to two different GitHub repositories
# Usage: ./dual-push.sh "Your commit message"

# Exit if any command fails
set -e

# Repository URLs - replace with your actual repository URLs
MAIN_REPO="https://github.com/EdmundGiwa/opti-craft-dashboard.git"
SECONDARY_REPO="https://github.com/iamemmax/optical.git"

# Check if commit message is provided
if [ -z "$1" ]; then
  echo "Error: Commit message is required"
  echo "Usage: ./dual-push.sh \"Your commit message\""
  exit 1
fi

COMMIT_MESSAGE="$1"

# Get current branch name
CURRENT_BRANCH=$(git symbolic-ref --short HEAD)
echo "Current branch: ${CURRENT_BRANCH}"

# Add all changes
git add .

# Commit changes
git commit -m "$COMMIT_MESSAGE"

# Push to main repository
echo "Pushing to main repository (${MAIN_REPO})..."
git push origin ${CURRENT_BRANCH}

# Check if secondary repository remote exists
if ! git remote | grep -q "^secondary$"; then
  echo "Adding secondary repository remote..."
  git remote add secondary ${SECONDARY_REPO}
else
  echo "Secondary repository remote already exists, updating URL..."
  git remote set-url secondary ${SECONDARY_REPO}
fi

# Push to secondary repository
echo "Pushing to secondary repository (${SECONDARY_REPO})..."
git push -f secondary ${CURRENT_BRANCH}:${CURRENT_BRANCH}

echo "Successfully pushed to both repositories!"
