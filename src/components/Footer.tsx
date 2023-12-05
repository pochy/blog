import { GithubIcon, Rss } from "lucide-react";
import Image from "next/image";
import { basePath } from "../../next.config";
const BASE_PATH = basePath ? basePath : "";

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-4xl w-full mx-auto pb-4 flex items-center justify-center">
        <div>
          <div className="flex mb-4">
            <Image
              src={`${BASE_PATH}/assets/authors/profile_m.png`}
              width={75}
              height={75}
              alt="profile"
              className="w-20 h-20"
            />
            <div className="flex flex-col justify-between pl-2">
              <span className="text-sm">Kenta Nakajima</span>
              <div className="flex mt-2">
                <a href="https://github.com/pochy" target="_blank">
                  <GithubIcon />
                </a>
                <a
                  href={`${BASE_PATH}/rss/feed.xml`}
                  target="_blank"
                  className="ml-2"
                >
                  <Rss color="#f26522" />
                </a>
              </div>
            </div>
          </div>
          <div>
            <span>© kinacoo.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
