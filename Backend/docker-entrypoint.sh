#!/bin/sh
set -e

echo "-> Running backend container entrypoint"

# If compiled seed script exists, run it. It's idempotent (exits 0 if admin exists).
if [ -f ./dist/scripts/seedAdmin.js ]; then
  echo "Running seeded admin script (dist/scripts/seedAdmin.js)"
  node ./dist/scripts/seedAdmin.js || true
else
  echo "No compiled seed script found (dist/scripts/seedAdmin.js) --- skipping seeding"
fi

echo "Starting backend process"
node dist/index.js
