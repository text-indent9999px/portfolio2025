import { getProfileExperienceData } from '../../../server/profile/experience';
import { getProfileIntroData } from '../../../server/profile/intro';
import { getProfileSkillsData } from '../../../server/profile/skills';
import Blank from '../../ui/Blank';
import { BackButton } from '../../ui/Button';
import { PageHeader } from '../../ui/Heading';
import { ProfileContent } from './ProfileContent';

export default async function Profile() {
  const [skillsResult, experienceResult, introResult] = await Promise.all([
    getProfileSkillsData(),
    getProfileExperienceData(),
    getProfileIntroData(),
  ]);

  return (
    <div className="text-left break-keep">
      <BackButton />
      <Blank height="1.5rem" bgColor="transparent" />
      <PageHeader
        title="About me"
        fontFamily="eng-point"
        bottomSpacing="none"
        visualSize="3xl"
      />
      <ProfileContent
        skillTabItems={skillsResult.data?.tabItems ?? []}
        skillCategories={skillsResult.data?.categories ?? {}}
        skillDataError={skillsResult.errorMessage}
        experienceData={experienceResult.data?.experience ?? []}
        experienceDataError={experienceResult.errorMessage}
        introSections={introResult.data?.sections ?? []}
        introDataError={introResult.errorMessage}
      />
    </div>
  );
}
