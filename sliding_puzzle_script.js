let board = document.getElementById('board');
for(i = 0; i < 4; i++){
	for(j = 0; j < 4; j++){
		if(i==3&&j==3)break;
		const newElement = document.createElement("div");
		newElement.setAttribute("style", `--i: ${i}; --j: ${j};`);
		newElement.setAttribute("class", "slider");
		board.append(newElement);
	}
}