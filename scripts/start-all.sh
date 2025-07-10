echo "🔄 Atualizando dados do 5etools..."
cd backend
git pull origin master
cd ..

echo "🚀 Iniciando backend..."
node backend/server.js &
BACK_PID=$!

echo "🧱 Iniciando frontend..."
cd frontend
npm start &

wait $BACK_PID