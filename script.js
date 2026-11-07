const menu = document.getElementById('menu');
const links = document.getElementById('links');

menu.addEventListener('click', () => {
  links.classList.toggle('open');
  menu.textContent = links.classList.contains('open') ? '✕' : '☰';
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open');
  menu.textContent = '☰';
}));

const questions = [
 {q:'What should you do at a red traffic light?',a:['Speed up','Stop before the line','Honk and continue','Ignore it'],c:1,e:'A red light means stop. Wait until the signal allows you to move.'},
 {q:'Why should motorcyclists wear a helmet?',a:['For style','To protect the head','To ride faster','Only in rain'],c:1,e:'A properly fitted helmet helps protect the head from serious injury.'},
 {q:'What is safest when driving and your phone rings?',a:['Text quickly','Hold the phone','Ignore it until safely parked','Look down briefly'],c:2,e:'Avoid phone distractions. Stop somewhere safe before using your phone.'},
 {q:'What should you do near a pedestrian crossing?',a:['Speed up','Watch for pedestrians and give way as required','Honk continuously','Overtake'],c:1,e:'Slow down and allow pedestrians to cross safely.'},
 {q:'When should you wear a seatbelt?',a:['Every journey','Only highways','Only at night','Long trips only'],c:0,e:'Wear a seatbelt on every trip, even short ones.'},
 {q:'What should you do in a school zone?',a:['Speed up','Slow down and watch for children','Park on the crossing','Use your phone'],c:1,e:'Children may cross unexpectedly. Slow down and stay alert.'},
 {q:'What does a STOP sign mean?',a:['Slow down only','Stop completely, then proceed when safe','No parking','Keep moving'],c:1,e:'Come to a complete stop and check before proceeding.'},
 {q:'What should you do if you feel sleepy while driving?',a:['Drive faster','Turn up music','Stop safely and rest','Ignore it'],c:2,e:'Fatigue affects reaction time. Stop safely and rest.'}
];

let index = 0, score = 0, answered = false;
const $ = id => document.getElementById(id);
function renderQuestion() {
  answered = false;
  const item = questions[index];
  $('count').textContent = `QUESTION ${index+1} / ${questions.length}`;
  $('score').textContent = `SCORE: ${score}`;
  $('bar').style.width = `${index/questions.length*100}%`;
  $('question').textContent = item.q;
  $('feedback').textContent = '';
  $('next').disabled = true;
  $('next').textContent = index === questions.length-1 ? 'SEE MY RESULT →' : 'NEXT QUESTION →';
  $('answers').innerHTML = '';
  item.a.forEach((answer,i) => {
    const button = document.createElement('button');
    button.className = 'answer';
    button.textContent = `${String.fromCharCode(65+i)}. ${answer}`;
    button.addEventListener('click', () => choose(i));
    $('answers').appendChild(button);
  });
}
function choose(choice) {
  if (answered) return;
  answered = true;
  const item = questions[index];
  [...$('answers').children].forEach((button,i) => {
    button.disabled = true;
    if (i === item.c) button.classList.add('correct');
    if (i === choice && choice !== item.c) button.classList.add('wrong');
  });
  if (choice === item.c) {
    score++;
    $('feedback').textContent = 'Correct! ' + item.e;
  } else {
    $('feedback').textContent = 'Not quite. ' + item.e;
  }
  $('score').textContent = `SCORE: ${score}`;
  $('next').disabled = false;
}
function finish() {
  $('quizContent').hidden = true;
  $('result').hidden = false;
  $('bar').style.width = '100%';
  let message = score === 8 ? 'Perfect score! Excellent road-safety knowledge.' :
    score >= 5 ? 'Good work! Keep learning and practising safe habits.' :
    'Keep practising. Review the safety rules and try again.';
  $('resultText').textContent = `You scored ${score} out of 8. ${message}`;
}
$('next').addEventListener('click', () => {
  if (!answered) return;
  if (index < questions.length-1) { index++; renderQuestion(); }
  else finish();
});
$('restart').addEventListener('click', () => {
  index = 0; score = 0;
  $('quizContent').hidden = false;
  $('result').hidden = true;
  renderQuestion();
});
renderQuestion();
