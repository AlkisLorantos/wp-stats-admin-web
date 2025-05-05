// app/games/[id]/GameTabs.tsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface Props {
  gameId: string;
}

const tabs = [
  { name: "Overview", path: "" },
  { name: "Track", path: "track" },
  { name: "Review", path: "review" },
];

export function GameTabs({ gameId }: Props) {
  const pathname = usePathname();

  return (
    <div className="flex border-b">
      {tabs.map(({ name, path }) => {
        const fullPath = `/games/${gameId}${path ? `/${path}` : ""}`;
        const isActive = pathname === fullPath;

        return (
          <Link
            key={name}
            href={fullPath}
            className={clsx(
              "px-4 py-2 text-sm font-medium",
              isActive ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"
            )}
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
}