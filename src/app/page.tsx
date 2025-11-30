import { HomeVisual } from '../components/heroVisual/Home';
import { SplitLayout } from '../components/layout';
import Home from '../components/pages/Home';

export default function Page() {
  return <SplitLayout leftContent={<HomeVisual />} rightContent={<Home />} />;
}
