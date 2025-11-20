#!/usr/bin/env bash
set -euo pipefail
echo "Running MelodyHub local smoke tests: backend build + frontend build"

ROOT_DIR="$(dirname "$0")/.."
cd "$ROOT_DIR"

echo "--> Testing Backend"
cd Backend
if [ -f package-lock.json ]; then
  echo "Installing backend deps..."
  npm ci
else
  npm install
fi
npm run build

echo "--> Testing Frontend"
cd ../Frontend
if [ -f package-lock.json ]; then
  echo "Installing frontend deps..."
  npm ci
else
  npm install
fi
npm run build

echo "All builds succeeded"
