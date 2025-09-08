import NowPlaying from './components/NowPlaying';
import ComingSoon from './components/ComingSoon';
import Category from './components/Category';

export default async function Home() {
  return (
    <main>
      <div className="categories">
        <NowPlaying />
        <ComingSoon />
        <Category id="35" />
        <Category id="27" />
        <Category id="10751" />
        <Category id="28" />
        <Category id="878" />
        <Category id="18" />
      </div>
    </main>
  );
}
