import { ProfileVisual } from '../../components/heroVisual/Profile';
import { SplitLayout } from '../../components/layout';
import { Profile } from '../../components/pages/Profile';

export default function ProfilePage() {
  return (
    <SplitLayout
      leftContent={<ProfileVisual />}
      rightContent={<Profile />}
    />
  );
}
