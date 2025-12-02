import Blank from '../../ui/Blank';
import { BackButton } from '../../ui/Button';
import { PageHeader } from '../../ui/Heading';

export default function Contact() {
  return (
    <div className="flex flex-col items-center w-full h-full justify-center translate-y-[-5vh]">
      <BackButton />
      <Blank height="1.5rem" bgColor="transparent" />
      <PageHeader
        title={`Thank you`}
        fontFamily="eng-point"
        layout={{ centered: true }}
        visualSize="3xl"
        bottomSpacing="none"
        subtitle={
          <>
            <span className="text-text-secondary font-base">{`더 나은 경험, 더 깔끔한 코드 \n 함께 만들어가고 싶습니다.`}</span>
            <span className="flex border-t-4 border-double border-text-primary p-5 mt-6">
              <span className="flex flex-col gap-2 items-center font-kor-point font-bold">
                <span className="flex gap-2 items-center justify-start">
                  <span className="shrink-0 text-text-primary">email</span>
                  <span className="shrink-0">
                    <a
                      href="mailto:namyoung1013@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 rounded"
                    >
                      namyoung1013@gmail.com
                    </a>
                  </span>
                </span>
                <span className="flex gap-2 items-center justify-start">
                  <span className="shrink-0 text-text-primary">github</span>
                  <a
                    href="https://github.com/text-indent9999px"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 rounded"
                  >
                    https://github.com/text-indent9999px
                  </a>
                </span>
              </span>
            </span>
          </>
        }
      />
    </div>
  );
}
