const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't','u', 'v', 'w', 'x', 'y', 'z'];

const sidebarlinks = Array.from(document.getElementsByClassName("sidebarlink"));

sidebarlinks.forEach((link) => {
	const defaultValue = link.innerHTML;
	link.addEventListener('mouseover', e => {
		
		let iterations = 0;
		let interval = setInterval(()=>{
			let val = '';
			for(let  i = 0; i < defaultValue.length; i++){
				if(iterations > i + 2) {
					val += defaultValue.charAt(i);
					if(iterations > defaultValue.length && i == defaultValue.length - 1){
						clearInterval(interval);
						break;
					}
				} else if(defaultValue.charAt(i) == ' ') {
					val += ' ';
				} else {
					val += LETTERS[Math.floor(Math.random() * LETTERS.length)];
				}
			}
			link.innerHTML = val;
			iterations++;
		}, 50);
		
	});
});