let currPrompt = '0';
let answer = 0;

let buttons = {
	clear: document.getElementById('clear'),
	del: document.getElementById('delete'),
	ans: document.getElementById('ans'),

	percent: document.getElementById('percent'),
	plus: document.getElementById('plus'),
	minus: document.getElementById('minus'),
	multiply: document.getElementById('multiply'),
	divide: document.getElementById('divide'),
	equals: document.getElementById('equals'),

	comma: document.getElementById('comma'),
	zero: document.getElementById('zero'),
	one: document.getElementById('one'),
	two: document.getElementById('two'),
	three: document.getElementById('three'),
	four: document.getElementById('four'),
	five: document.getElementById('five'),
	six: document.getElementById('six'),
	seven: document.getElementById('seven'),
	eight: document.getElementById('eight'),
	nine: document.getElementById('nine')
}

let map = {
	typeToLetter: {
		clear: 'c',
		del: 'd',
		ans: 'a',
		
		percent: '%',
		plus: '+',
		minus: '-',
		multiply: '*',
		divide: '/',
		equals: '=',

		comma: ',',
		zero: '0',
		one: '1',
		two: '2',
		three: '3',
		four: '4',
		five: '5',
		six: '6',
		seven: '7',
		eight: '8',
		nine: '9',
	},
	numbers: ['0','1','2','3','4','5','6','7','8','9',','],
	operators: ['+', '-', '*', '/']
}
for(const [type, dom] of Object.entries(buttons)){
	dom.addEventListener('click', ()=>pressedButton(type));
}

function pressedButton(type){
	console.log(`you pressed ${type}!`);
	let lastInput = map.typeToLetter[type];
	switch (lastInput) {
		case '+':
			if(currPrompt == '-'){
				currPrompt = '0';
				break;
			}
			if(!map.operators.includes(currPrompt.slice(-1))) currPrompt += '+';
			break;
		case '-':
			if(currPrompt == '0'){
				currPrompt = '-';
				break;
			}
			if(!(map.operators.includes(currPrompt.slice(-1)) && map.operators.includes(currPrompt.slice(-2,-1)))) {
				currPrompt += '-';
			}
			break;
		case '*': case '/':
			if(!map.operators.includes(currPrompt.slice(-1))) currPrompt += lastInput;
			break;
		case '%':
				if(map.numbers.includes(currPrompt.slice(-1))) currPrompt += lastInput;
				break;
		case 'c':
			if(currPrompt == '0') answer = 0;
			currPrompt = '0';
			break;
		case 'd':
			currPrompt = currPrompt.slice(0,-1);
			if(currPrompt.length == 0) currPrompt = '0';
			break;
		case 'a':
			if(!map.operators.includes(currPrompt.slice(-1)) && !(answer=='0' && currPrompt == '0')) currPrompt += answer;
			break;
		case '=':
			calculate();
			break;
		default:
			if(currPrompt == '0' && lastInput != ',') currPrompt = '';
			currPrompt += lastInput;
			break;
	}

	updateInput();
}

function calculate(){
	let equation = [''];
	for(char of currPrompt){
		if(map.numbers.includes(char)){
			equation[equation.length - 1] += char;
			continue;
		}
		if(map.operators.includes(char) || char=='%'){
			if(equation[equation.length - 1].length != 0){
				equation.push(char);
				equation.push('');
			} else {
				equation[equation.length -1] += char;
			}
		}
	}

	//Percentage:
	while(true){
		let i = equation.indexOf('%');
		if(i == -1)	break;
		equation[i-1] = (+equation[i-3] * +equation[i-1] / 100).toString();
		equation.splice(i, 1);
	}
	//Multiplication and Division:
	while(true){
		let t = equation.indexOf('*');
		let d = equation.indexOf('/');
		let i;
		if(t==-1 && d==-1) break;
		if(t==-1) i = d;
		if(d==-1) i = t;
		if(t!=-1 && d!=-1) i = Math.min(t,d);
		(equation[i] == '*') 
			? equation[i-1] = (+equation[i-1] * +equation[i+1]).toString()
			: equation[i-1] = (+equation[i-1] / +equation[i+1]).toString();
		equation.splice(i, 2);
	}

	//Addition and Subtraction:
	while(true){
		let a = equation.indexOf('+');
		let s = equation.indexOf('-');
		let i;
		if(a==-1 && s==-1) break;
		if(a==-1) i = s; 
		if(s==-1) i = a;
		if(a!=-1 && s!=-1) i = Math.min(a,s);
		(equation[i] == '+')
			? equation[i-1] = (+equation[i-1] + +equation[i+1]).toString()
			: equation[i-1] = (+equation[i-1] - +equation[i+1]).toString();
		equation.splice(i,2);
	}
	currPrompt = equation[0];
	answer = currPrompt;
	updateInput();
	currPrompt = '0';
}


function updateInput(){
	(answer != 0)
		? document.getElementById('memory').value = 'Ans: ' + answer
		: document.getElementById('memory').value = '';
	document.getElementById('current').value = currPrompt;
	document.getElementById('clear').innerHTML = 
	(currPrompt == '0')?'AC':'C';
}