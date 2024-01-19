import {
  NoSymbolIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
const iconMap = {
  available: PlayIcon,
  unavailable: NoSymbolIcon,
};

export function Card({
  title,
  value,
  type,
  link,
}: {
  title: string;
  value: number | string;
  type: 'available' | 'unavailable';
  link: string
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
     <Link href={link} className="flex p-4 bg-blue-600 text-white hover:bg-blue-700" > 
        {Icon ? <Icon  className="h-5 w-5 " /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </Link>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center`}
      >
        {value}
      </p>
    </div>
  );
}
