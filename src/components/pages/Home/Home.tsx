'use client';

import CustomButton from '../../ui/Button';
import { PageHeader } from '../../ui/Heading';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <>
      <div
        className={`
            ${styles['right-box']}
            flex flex-1 flex-col
            w-full h-full
          `}
      >
        <PageHeader
          title="Front-end Developer"
          className={{ root: styles.title }}
        />

        <div
          className={`
              flex flex-wrap
              mt-8 gap-2
            `}
        >
          <CustomButton
            variant="filled"
            color="primary"
            rounded="full"
            dataCursor="hover"
            href="/profile"
            cursorTrigger={true}
          >
            프로필
          </CustomButton>
          <CustomButton
            variant="tonal"
            color="primary"
            rounded="full"
            dataCursor="hover"
            href="/projects"
            cursorTrigger={true}
          >
            프로젝트
          </CustomButton>
          <CustomButton
            variant="outlined"
            color="primary"
            rounded="full"
            dataCursor="hover"
            href="/contact"
            cursorTrigger={true}
          >
            연락처
          </CustomButton>
        </div>

        <ul
          className={`
              mt-auto
              pr-10
            `}
        >
          <li
            className={`
                ${styles['info-list-item']}
                mb-8 last:mb-0
                text-text-secondary dark:text-text-tertiary
                font-kor-point
                text-left
                leading-none tracking-tight
                break-keep
              `}
          >
            last updated: 2025.12.04
          </li>
        </ul>
      </div>
    </>
  );
}
