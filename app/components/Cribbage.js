deck=[];
player1={name:"", score:0, hand:[], role:"", opp:null, show:[]};
player2={name:"", score:0, hand:[], role:"", opp:player1, show:[]}
player1.opp=player2;
players=[player1,player2];
crib=[];
play=[];
playVal=0;
turn=0;
const WIN=169;
start();

function start(){
    player1.name="Adam";
    player2.name="Bob";
    deck=[[1,'c'],[2,'c'],[3,'c'],[4,'c'],[5,'c'],[6,'c'],[7,'c'],[8,'c'],[9,'c'],[10,'c'],[11,'c'],[12,'c'],[13,'c'],[14,'c'],[15,'c'],[1,'d'],[2,'d'],[3,'d'],[4,'d'],[5,'d'],[6,'d'],[7,'d'],[8,'d'],[9,'d'],[10,'d'],[11,'d'],[12,'d'],[13,'d'],[14,'d'],[15,'d'],[1,'h'],[2,'h'],[3,'h'],[4,'h'],[5,'h'],[6,'h'],[7,'h'],[8,'h'],[9,'h'],[10,'h'],[11,'h'],[12,'h'],[13,'h'],[14,'h'],[15,'h'],[1,'s'],[2,'s'],[3,'s'],[4,'s'],[5,'s'],[6,'s'],[7,'s'],[8,'s'],[9,'s'],[10,'s'],[11,'s'],[12,'s'],[13,'s'],[14,'s'],[15,'s']]
    shuffle(deck);
    //RNG Dealer
    decideDealer();
    startGame();
}

function startGame(){
    deck=[[1,'c'],[2,'c'],[3,'c'],[4,'c'],[5,'c'],[6,'c'],[7,'c'],[8,'c'],[9,'c'],[10,'c'],[11,'c'],[12,'c'],[13,'c'],[14,'c'],[15,'c'],[1,'d'],[2,'d'],[3,'d'],[4,'d'],[5,'d'],[6,'d'],[7,'d'],[8,'d'],[9,'d'],[10,'d'],[11,'d'],[12,'d'],[13,'d'],[14,'d'],[15,'d'],[1,'h'],[2,'h'],[3,'h'],[4,'h'],[5,'h'],[6,'h'],[7,'h'],[8,'h'],[9,'h'],[10,'h'],[11,'h'],[12,'h'],[13,'h'],[14,'h'],[15,'h'],[1,'s'],[2,'s'],[3,'s'],[4,'s'],[5,'s'],[6,'s'],[7,'s'],[8,'s'],[9,'s'],[10,'s'],[11,'s'],[12,'s'],[13,'s'],[14,'s'],[15,'s']]
    shuffle(deck);
    //RNG Dealer
    for(let i=0;i<6;i++){
        for(let j=0;j<2;j++){
            dealCard(deck,players[j].hand);
        }
    }
    for(let i=0;i<2;i++){
        players[i].hand=sort(players[i].hand);
    }
    promptCrib();
    for(let i=0;i<2;i++){
        players[i].show=sort(players[i].hand);
    }
    dealCard(deck,play);
    if(play[0][0]==13){
        console.log("Two for his heels");
        score(getDealer(),2);
    }
    promptPlay(getPone());
}

function promptPlay(player){
    if(player.hand.length==0){
        return "hand empty";
    }
    if(cantPlay(player)){
        return "Go";
    }
    for(let i=player.hand.length;playCard(player,player.hand[Math.floor(Math.random()*i)])=="exceeds 37";i--);
    
    switch(promptPlay(player.opp)){
        case "hand empty":
            switch(promptPlay(player)){
                case "hand empty":
                    playVal=0;
                    promptShow();
                    break;
                case "Go":
                    playVal=0;
                    promptPlay(player.opp);
            }
            break;
        case "Go":
            switch(promptPlay(player)){
                case "hand empty":
                    playVal=0;
                    promptPlay(player.opp);
                    break;
                case "Go":
                    playVal=0;
                    promptPlay(player.opp);
            }
    }
}

function promptCrib(){
    //random
    for(let i=0;i<2;i++){
        for(let j=0;j<2;j++){
            dealCard(players[j].hand,crib,Math.floor(Math.random()*players[j].hand.length));
        }
    }
    return;
}

function decideDealer(){
    //RNG
    let d=Math.floor(Math.random()*2);
    players[d].role="Dealer";
    players[(d+1)%2].role="Pone";
}

function getDealer(){
    if(player1.role=="Dealer"){
        return player1;
    }
    else{
        return player2;
    }
}

function getPone(){
    if(player1.role=="Pone"){
        return player1;
    }
    else{
        return player2;
    }
}

function shuffle(cards){
  let n=cards.length;
  while(n>0){
    let r=Math.floor(Math.random()*n);
    n--;
    [cards[n],cards[r]]=[cards[r],cards[n]];
  }
  return cards;
}

function sort(cards){
    if(cards.length==1){
        return cards;
    }
    let min=[cards[0][0],0];
    for(let i=1;i<cards.length;i++){
        if(cards[i][0]<min[0]){
            min=[cards[i][0],i];
        }
    }
    return [[min[0],cards[min[1]][1]]].concat(sort((cards.slice(0,min[1])).concat(cards.slice(min[1]+1,cards.length))));
}

function dealCard(source,place,index=0){
    place.push(source[index]);
    source.splice(index,1);
}

function playCard(player,card){
    if(playVal+card[0]>37){
        return "exceeds 37";
    }
    dealCard(player.hand,play,player.hand.indexOf(card));
    if(card[0]>12){
        playVal+=12;
    }
    else{
        playVal+=card[0];
    }
    //console.log(card);
    addScore(player,playScore());
    //console.log(playVal);
}

function addScore(player,score){
    player.score+=score;
    console.log("Points:"+score)
    console.log(player.name+"'s score:"+player.score)
    if(player.score>=WIN){
        declareWinner(player);
    }
}

function declareWinner(player){
    console.log(player.name+" Wins!");
    stop;
}

function playScore(){
    let score=0;
    //16/18
    if(playVal==18){
        score+=2;
        console.log("16/18");
    }
    //Double Pair Royal
    if(play.length>4 && play[play.length-1][0]==play[play.length-2][0] && play[play.length-2][0]==play[play.length-3][0] && play[play.length-3][0]==play[play.length-4][0]){
        score+=12;
        console.log("Double Pair Royal");
    }
    //Pair Royal
    else if(play.length>3 && play[play.length-1][0]==play[play.length-2][0] && play[play.length-2][0]==play[play.length-3][0]){
        score+=6;
        console.log("Pair Royal");
    }
    //Pair
    else if(play.length>2 && play[play.length-1][0]==play[play.length-2][0]){
        score+=2;
        console.log("Pair");
    }
    //Run (sequence) of three or more cards
    loop:{
        for(let i=play.length-1;i>2;i--){
            let run=sort(play.slice(-i));
            for(let j=1;j<run.length;j++){
                if(run[j-1][0]+1!=run[j][0]){
                    break loop;
                }
                if(j==run.length-1){
                    console.log("Run")
                    console.log(run);
                    score+=run.length;
                    break loop;
                }
            }
        }
    }
    //31
    if(playVal==37){
        score+=2
        console.log("31/37");
    }
    //last card, not 31
    else if(cantPlay(player1) && cantPlay(player2)){
        score+=1;
        console.log("Last card");
    }
    return score;
}

function cantPlay(player){
    if(player.hand.length==0){
        return true;
    }
    if(player.hand[0][0]+playVal>37){
        return true;
    }
    return false;
}

function promptShow(){
    console.log("SHOW");
    console.log(play[0]);
    console.log(getPone().show);
    addScore(getPone(),showScoreHand(getPone().show));
    console.log(getDealer().show);
    addScore(getDealer(),showScoreHand(getDealer().show));
    crib=sort(crib.concat([play[0]]));
    crib=[[1,'c'],[2,'d'],[3,'h'],[4,'s'],[5,'c']];
    console.log(crib);
    addScore(getDealer(),showScore(sort(crib)));
    getDealer().role="";
    getPone().role="Dealer";
    getDealer().opp.role="Pone";
    startGame();
}

//Use for hand
function showScoreHand(hand){
    let score=0;
    //One for his nob
    for(let i=0;i<hand.length;i++){
        if(hand[i][0]==13 && hand[i][1]==play[0][1]){
            score++;
            console.log("One for his nob");
            break;
        }
    }
    //Flush, 4 cards
    for(let i=1;i<hand.length;i++){
        if(hand[i-1][1]!=hand[i][1]){
            break;
        }
        if(i==hand.length-1){
            score+=4
            console.log("Flush, 4 cards");
        }
    }
    return score+showScore(sort(hand.concat([play[0]])));
}

//Use for crib
function showScore(cards){
    let score=0;
    //"Fifteen"(Sixteen/Eighteen)
    for(let i=0;i<cards.length-1;i++){
        for(let j=i+1;j<cards.length;j++){
            if((cards[i][0]>12 && cards[j][0]==6) || (cards[j][0]>=12 && cards[i][0]==6)){
                score+=2;
                console.log("Sixteen(Eighteen)");
            }
            else if(cards[i][0]+cards[j][0]==18 && cards[i][0]<=12 && cards[j][0]<=12){
                score+=2
                console.log("Sixteen(Eighteen)");
            }
        }
    }
    //Double Pair Royal
    for(let i=1;i<16;i++){
        let streak=0;
        for(let j=0;j<cards.length;j++){
            if(cards[j][0]==i){
                streak++;
            }
        }
        if(streak==4){
            score+=12;
            console.log("Double Pair Royal");
        }
        else if(streak==3){
            score+=6;
            console.log("Pair Royal");
        }
        else if(streak==2){
            score+=2;
            console.log("Pair");
        }
    }
    //Run (sequence) of three or more cards
    for(let i=0;i<cards.length-2;i++){
        let run=1;
        for(let j=i+1;j<cards.length-1;j++){
            if(cards[i][0]+1==cards[j][0]){
                run++;
                for(let k=j+1;k<cards.length;k++){
                    if(cards[j][0]+1==cards[k][0]){
                        run++;
                        for(let l=k+1;l<cards.length;l++){
                            if(cards[k][0]+1==cards[l][0]){
                                run++;
                                for(let m=l+1;m<cards.length;m++){
                                    run++;
                                    break;
                                }
                                break;
                            }
                        }
                        break;
                    }
                }
                break;
            }
        }
        if(run>2){
            score+=run;
            console.log("Run");
            break;
        }
    }
    //Flush, 5 cards
    for(let i=1;i<cards.length;i++){
        if(cards[i-1][1]!=cards[i][1]){
            break;
        }
        if(i==cards.length-1){
            score+=5
            console.log("Flush, 5 cards");
        }
    }
    return score;
}

function decToDoz(dec,deg=Math.floor(Math.log(dec)/Math.log(12))){
    if(dec<12 && deg==0){
        if(dec==11){
            return "B";
        }
        if(dec==10){
            return "A"
        }
        return dec.toString();
    }
    let quo=Math.floor(dec/(12**deg));
    if(quo==11){
        quo="B";
    }
    else if(quo==10){
        quo="A";
    }
    else{
        quo=quo.toString();
    }
    return quo + decToDoz(dec%(12**deg),deg-1);
}

function dozToDec(doz){
    let dec=0;
    for(let i=0;i<doz.length;i++){
        if(doz.charAt(i)=='A'){
            dec+=10;
        }
        else if(doz.charAt(i)=='B'){
            dec+=11;
        }
        else{
            dec+=Number(doz.charAt(i));
        }
        if(i<doz.length-1){
            dec*=12;
        }
    }
    return dec;
}
