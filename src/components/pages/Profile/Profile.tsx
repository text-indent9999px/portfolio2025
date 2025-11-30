import Blank from '../../ui/Blank';
import { BackButton } from '../../ui/Button';
import { PageHeader } from '../../ui/Heading';
import { ProfileContent } from './ProfileContent';

export default function Profile() {
  return (
    <div className="text-left break-keep">
      <BackButton />
      <Blank height="1.5rem" bgColor="transparent" />
      <PageHeader
        title="About me"
        fontFamily="eng-point"
        bottomSpacing="xs"
        visualSize="3xl"
      />
      <ProfileContent />
    </div>
  );
}
