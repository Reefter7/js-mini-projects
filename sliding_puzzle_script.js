//////Scramble ////////////////////////////////////////////
const scrambledOrderI = [0,1,2,3].sort((a,b)=>.5-Math.random());
const scrambledOrderJ = [0,1,2,3].sort((a,b)=>.5-Math.random());
let openField = {i: scrambledOrderI[3], j: scrambledOrderJ[3]};

//////Create all sliders //////////////////////////////////
let board = document.getElementById('board');
for(i = 0; i < 4; i++){
	for(j = 0; j < 4; j++){
		if(i==3 && j==3) break;
		const newElement = document.createElement("div");
		newElement.setAttribute("class", "slider");
		newElement.dataset.i = `${scrambledOrderI[i]}`;
		newElement.dataset.j = `${scrambledOrderJ[j]}`;
		newElement.dataset.home = `${i+j*4}`;
		newElement.append(`${i+j*4}`);
		board.append(newElement);

		newElement.addEventListener("click", e => {
			const dataset = e.target.dataset;
			if(	dataset.i == openField.i && Math.abs(dataset.j - openField.j) == 1 ||
				dataset.j == openField.j && Math.abs(dataset.i - openField.i) == 1) {
					[openField.i, openField.j, dataset.i, dataset.j] = 
					[dataset.i, dataset.j, openField.i, openField.j];
				}
		});
	}
}

