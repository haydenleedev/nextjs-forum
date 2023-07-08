"use client";

import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
} from "next/navigation";

export default function DetailLink() {
  let router = useRouter();
  let path = usePathname(); // current url
  let params = useSearchParams(); // current url search parameter ( query strings)
  let dynamicParams = useParams(); // 유저가 dynamic route 입력한거 출력

  return (
    <button
      onClick={() => {
        router.push("/list");
      }}
    >
      Read more
    </button>
  );
}
