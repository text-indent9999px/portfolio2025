const fs = require('fs');
const path = require('path');

const HOME_FILE_PATH = path.join(
  __dirname,
  '..',
  'src',
  'components',
  'pages',
  'Home',
  'Home.tsx'
);
const README_FILE_PATH = path.join(__dirname, '..', 'README.md');

const HOME_PREFIX = 'last updated: ';
const README_PREFIX = '**마지막 업데이트**: ';

function formatDateToYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

function updateFile(filePath, regex, prefix, formattedDate, fileName) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return false;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  if (!regex.test(raw)) {
    console.error(
      `패턴을 찾지 못했습니다. ${fileName} 안의 텍스트가 "${prefix}YYYY.MM.DD" 형식인지 확인해 주세요.`
    );
    return false;
  }

  const replaced = raw.replace(regex, `${prefix}${formattedDate}`);

  if (replaced === raw) {
    console.log(`[${fileName}] 변경 사항이 없습니다.`);
    return false;
  }

  fs.writeFileSync(filePath, replaced, 'utf8');
  console.log(
    `[${fileName}] 마지막 업데이트 날짜를 ${formattedDate} 로 갱신했습니다.`
  );
  return true;
}

function main() {
  const now = new Date();
  const formatted = formatDateToYYYYMMDD(now);

  // Home.tsx 업데이트
  updateFile(
    HOME_FILE_PATH,
    /last updated:\s*\d{4}\.\d{2}\.\d{2}/,
    HOME_PREFIX,
    formatted,
    'Home'
  );

  // README.md 업데이트
  updateFile(
    README_FILE_PATH,
    /\*\*마지막 업데이트\*\*:\s*\d{4}\.\d{2}\.\d{2}/,
    README_PREFIX,
    formatted,
    'README'
  );
}

main();
