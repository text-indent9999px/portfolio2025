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
        bottomSpacing="md"
        subtitle={`연락처. 010-3312-3220\n 이메일. namyoung1013@gmail.com`}
      />
    </div>
  );
}
