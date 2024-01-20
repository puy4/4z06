import CardsClubIcon from 'mdi-react/CardsClubIcon';
import CardsDiamondOutlineIcon from 'mdi-react/CardsDiamondOutlineIcon';
import CardsHeartOutlineIcon from 'mdi-react/CardsHeartOutlineIcon';
import CardsSpadeIcon from 'mdi-react/CardsSpadeIcon';
import CardsPlayingOutlineIcon from 'mdi-react/CardsPlayingOutlineIcon';
import { lusitana } from '@/app/ui/fonts';

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white `}
    >
      <CardsPlayingOutlineIcon className="h-12 w-12 rotate-[0deg]" />
      <p className="text-text-xs  md:text-[44px]">4Z06 Group 16: Duodecimal Cribbage  </p>
    </div>
  );
}
