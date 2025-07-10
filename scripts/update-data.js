const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO_URL = 'https://github.com/5etools-mirror-3/5etools-src.git';
const TEMP_DIR = path.resolve(__dirname, '../temp-5etools');
const TARGET_DATA_DIR = path.resolve(__dirname, '../backend/data');

function run(cmd) {
  console.log(`$ ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

// 1. Apaga o temp se já existir
if (fs.existsSync(TEMP_DIR)) {
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
}

// 2. Clona o repositório (só dados)
run(`git clone --depth 1 ${REPO_URL} "${TEMP_DIR}"`);

// 3. Copia os dados
const sourceDataDir = path.join(TEMP_DIR, 'data');

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Apaga dados antigos e copia os novos
if (fs.existsSync(TARGET_DATA_DIR)) {
  fs.rmSync(TARGET_DATA_DIR, { recursive: true });
}
copyRecursiveSync(sourceDataDir, TARGET_DATA_DIR);

// 4. Limpa a pasta temporária
fs.rmSync(TEMP_DIR, { recursive: true, force: true });

console.log('✅ Dados do 5eTools atualizados com sucesso!');
