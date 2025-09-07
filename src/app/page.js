import NowPlaying from './components/NowPlaying';
import ComingSoon from './components/ComingSoon';
import Category from './components/Category';

export default async function Home() {
  return (
    <main>
      <div className="categories">
        <NowPlaying name="Now Playing" />
        <ComingSoon name="Coming Soon" />
        <Category name="Comedy" id="35" />
        <Category name="Horror" id="27" />
        <Category name="Family" id="10751" />
        <Category name="Action" id="28" />
        <Category name="Sci-Fi" id="878" />
        <Category name="Drama" id="18" />
      </div>
    </main>
  );
}
