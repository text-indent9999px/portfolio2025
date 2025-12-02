const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Git이 설치되어 있는지 확인
try {
  execSync('git --version', { stdio: 'ignore' });
} catch {
  process.exit(0);
}

// .git 디렉토리가 있는지 확인
const gitDir = path.join(process.cwd(), '.git');
if (!fs.existsSync(gitDir)) {
  process.exit(0);
}

try {
  // 현재 브랜치 확인
  const currentBranch = execSync('git symbolic-ref HEAD', { encoding: 'utf-8' })
    .trim()
    .replace(/^refs\/heads\//, '');

  if (!currentBranch) {
    process.exit(0);
  }

  // 메인 브랜치가 아니고, 백업 브랜치가 아니면
  if (
    currentBranch !== 'main' &&
    currentBranch !== 'master' &&
    !currentBranch.startsWith('backup-')
  ) {
    // 오늘 날짜의 백업 브랜치 생성
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const shortHash = execSync('git rev-parse --short HEAD', {
      encoding: 'utf-8',
    }).trim();
    const backupBranch = `backup-${today}-${currentBranch}-${shortHash}`;

    // 백업 브랜치가 없으면 생성
    try {
      execSync(`git show-ref --verify --quiet refs/heads/${backupBranch}`, {
        stdio: 'ignore',
      });
    } catch {
      // 백업 브랜치 생성
      execSync(`git branch ${backupBranch}`, { stdio: 'ignore' });
    }

    // 현재 staged/unstaged 변경사항 확인
    let hasChanges = false;
    try {
      execSync('git diff-index --quiet HEAD --', { stdio: 'ignore' });
      execSync('git diff --quiet', { stdio: 'ignore' });
      // 변경사항 없음
    } catch {
      hasChanges = true;
    }

    if (hasChanges) {
      // 변경사항 있음 - 백업 브랜치에 커밋
      try {
        // 현재 변경사항을 stash
        execSync('git stash push -m "백업용 임시 저장"', {
          stdio: 'ignore',
        });

        // 백업 브랜치로 체크아웃
        execSync(`git checkout ${backupBranch}`, { stdio: 'ignore' });

        // stash 적용
        execSync('git stash pop', { stdio: 'ignore' });

        // 변경사항 커밋
        execSync('git add -A', { stdio: 'ignore' });
        execSync('git commit -m "백업: 자동 백업"', { stdio: 'ignore' });
      } catch {
        // 커밋 실패해도 계속 진행
      }

      // 원래 브랜치로 복귀
      try {
        execSync(`git checkout ${currentBranch}`, { stdio: 'ignore' });
        // 남은 stash가 있으면 적용
        try {
          execSync('git stash pop', { stdio: 'ignore' });
        } catch {
          // stash 없으면 무시
        }
      } catch {
        // 체크아웃 실패해도 계속 진행
      }
    }
  }
} catch (error) {
  // 에러가 나도 커밋은 계속 진행
  process.exit(0);
}

process.exit(0);

