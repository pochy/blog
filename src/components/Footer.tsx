import { GithubIcon, Rss } from "lucide-react";
import { basePath } from "../../next.config";
const BASE_PATH = basePath ? basePath : "";

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-4xl w-full mx-auto h-24 flex items-center justify-center">
        <div className="flex">
          <span>© kinacoo.com</span>
          <a href="https://github.com/pochy" target="_blank" className="ml-5">
            <GithubIcon />
          </a>
          <a
            href={`${BASE_PATH}/rss/feed.xml`}
            target="_blank"
            className="ml-5"
          >
            <Rss color="#f26522" />
          </a>
        </div>
      </div>
    </footer>
  );
}
