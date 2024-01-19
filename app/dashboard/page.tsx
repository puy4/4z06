import { lusitana } from '@/app/ui/fonts';
import { Card } from '@/app/ui/dashboard/cards';

export default function Page() {
  
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Games
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        
          <Card title="ttt"  value= "Tic-Tac-Toe" type="available" link="app/ui/tictactoe" />
          <Card title="Duodecimal Cribbage"  value= "Duodecimal Cribbage" type="unavailable" link="" />

      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
         {}
      </div>

    </main>
  );
}