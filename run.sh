#!/bin/sh
set -e

DIR=$(dirname "$(readlink -f "$0")")

. "$DIR/backend/.env"

check_db() {
  psql "$DATABASE_URL" -c "SELECT 1;" > /dev/null 2>&1
  return $?
}

cd "$DIR/db"
echo "[postgres] booting db container..."
./run.sh

cd "$DIR/frontend"
echo "[frontend] installing dependencies..."
npm i

cd "$DIR/backend/"
echo "[backend] installing dependencies..."
npm i


while ! check_db; do
  sleep 1
  echo "[postgres] DB not ready yet. Retrying in 1 second..."
done


cd "$DIR/backend/"
echo "[prisma] migrating db..."
npx prisma migrate reset --force

echo "[prisma] seeding db..."
npx prisma db seed

echo "[prisma] generating prisma client..."
npx prisma generate

echo ""
echo "------------------------------------------------------"
echo "------------------- DONE  ----------------------------"
echo "------------------------------------------------------"
echo ""
echo ">>> to boot the backend and the frontend, run:"
echo ""
echo "backend/run.sh"
echo "frontend/run.sh"
echo ""
echo ""
echo ">>> to try your running solution:"
echo ""
echo " backend:   http://localhost:3777/graphql"
echo "frontend:   http://localhost:8777"
echo "  db url:   $DATABASE_URL"

cd "$DIR"
