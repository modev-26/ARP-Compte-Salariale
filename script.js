const $=i=>document.getElementById(i),SOLDE=310000,norm=s=>s.trim().toUpperCase();
const fmt=n=>n.toLocaleString('fr-FR')+' FCFA';
const MOTIFS=['Frais de scolarité','Loyer','Santé','Dépenses familiales','Achat personnel','Autre'];
['mot1','mot2'].forEach(i=>$(i).innerHTML=MOTIFS.map(m=>'<option>'+m+'</option>').join(''));
const TX=[
{t:'in',l:'Salaire d’octobre',d:'Aujourd’hui',a:310000,m:'Paiement mensuel du salaire',p:'En cours de paiement'},
{t:'out',l:'Retrait Mobile Money',d:'24 oct. 2026',a:40000,m:'Frais de scolarité'},
{t:'in',l:'Prime de rendement',d:'20 oct. 2026',a:45000,m:'Objectifs du 3e trimestre atteints'},
{t:'out',l:'Retrait en agence',d:'15 oct. 2026',a:60000,m:'Loyer'},
{t:'in',l:'Remboursement de frais',d:'10 oct. 2026',a:25000,m:'Mission à Pointe-Noire'},
{t:'out',l:'Retrait Mobile Money',d:'05 oct. 2026',a:20000,m:'Santé'},
{t:'in',l:'Indemnité de transport',d:'01 oct. 2026',a:15000,m:'Indemnité mensuelle'}];
function draw(){$('jr').innerHTML=TX.map(x=>{const i=x.t==='in';
 return '<div class="tx '+(i?'in':'outc')+'"><div class="ic">'+(i?'↓':'↑')+'</div><div class="m"><b>'+x.l+'</b><div>'+x.d+' · Motif : '+x.m+'</div></div><div class="a">'+(i?'+':'−')+' '+fmt(x.a)+(x.p?'<span class="st">'+x.p+'</span>':'')+'</div></div>'}).join('')}
draw();
$('go').onclick=()=>{
 const ok=norm($('nom').value)==='OBISSI'&&norm($('pre').value)==='MAURICE'&&norm($('mat').value)==='ARP260045#'&&$('pin').value.trim()==='8904';
 if(!ok){$('err').classList.remove('hide');return}
 $('login').classList.add('hide');$('acc').classList.remove('hide');tick();scrollTo(0,0)};
$('out').onclick=()=>{$('acc').classList.add('hide');$('login').classList.remove('hide');$('pin').value='';$('err').classList.add('hide');back()};
const end=new Date('2026-11-15T23:59:59+01:00');
function tick(){let t=Math.max(0,end-Date.now())/1000|0;
 $('d').textContent=t/86400|0;$('h').textContent=t%86400/3600|0;$('m').textContent=t%3600/60|0;$('s').textContent=t%60}
setInterval(tick,1000);
function back(){['mm','ph'].forEach(i=>$(i).classList.add('hide'));
 $('mm1').classList.remove('hide');$('mm2').classList.add('hide');$('mm3').classList.add('hide');$('ph3').classList.add('hide');
 ['e1','e2','e3'].forEach(i=>$(i).classList.add('hide'));$('amt').value=$('amt2').value=$('tel').value=''}
document.querySelectorAll('[data-back]').forEach(b=>b.onclick=back);
$('oMM').onclick=()=>{back();$('mm').classList.remove('hide');$('mm').scrollIntoView({behavior:'smooth'})};
$('oPH').onclick=()=>{back();$('ph').classList.remove('hide');$('ph').scrollIntoView({behavior:'smooth'})};
function amount(v,e){const n=parseInt(v.replace(/\D/g,''),10);
 if(!n||n<=0){e.textContent='Saisissez un montant valide.';e.classList.remove('hide');return 0}
 if(n>SOLDE){e.textContent='Le montant dépasse votre solde de '+fmt(SOLDE)+'.';e.classList.remove('hide');return 0}
 e.classList.add('hide');return n}
function log(l,a,m){TX.splice(1,0,{t:'out',l,d:'Aujourd’hui',a,m,p:'En attente'});draw()}
let A=0;
$('ok1').onclick=()=>{A=amount($('amt').value,$('e1'));if(A){$('mm1').classList.add('hide');$('mm2').classList.remove('hide')}};
$('ok2').onclick=()=>{const d=$('tel').value.replace(/\D/g,'');
 if(d.length<9){$('e2').textContent='Numéro invalide.';$('e2').classList.remove('hide');return}
 $('e2').classList.add('hide');$('mm2').classList.add('hide');
 const r=$('mm3');r.classList.remove('hide');
 r.innerHTML='<b>Demande de retrait enregistrée.</b><br>Montant : '+fmt(A)+'<br>Motif : '+$('mot1').value+'<br>Numéro : +242 '+d+'<br>Veuillez patienter 48 h pour recevoir la totalité de la somme sur votre compte Mobile Money.';
 log('Retrait Mobile Money',A,$('mot1').value)};
$('ok3').onclick=()=>{const n=amount($('amt2').value,$('e3'));if(!n)return;
 const r=$('ph3');r.classList.remove('hide');
 r.innerHTML='<b>Retrait en agence enregistré.</b><br>Montant : '+fmt(n)+'<br>Motif : '+$('mot2').value+'<br>Présentez-vous à l’agence de retrait ARP avec votre matricule et une pièce d’identité.';
 log('Retrait en agence',n,$('mot2').value)};