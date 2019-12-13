

let arrCurEqua = [];
let arrHistory = [];
let strCurNum = "0"; // switches to number after it returns an answer
let intCount = 0; // goes up when math symbols are input
let objMath = { 
	    "÷": function (num1,num2) {return num1 / Number(arrCurEqua[num2])},
		"X": function (num1,num2) {return num1 * Number(arrCurEqua[num2])},
		"-": function (num1,num2) {return num1 - Number(arrCurEqua[num2])},
		"+": function (num1,num2) {return num1 + Number(arrCurEqua[num2])},
	};

function calculate(input){
	console.log("-----input pressed-------",input);
	
	
	if (typeof input === "number" || input === "." && strCurNum.includes(".") === false){
		if (strCurNum === "0" && typeof input === "number" || typeof strCurNum === "number"){ // leave the zero only when a decimal is input after 0
			strCurNum = "";
		} 
		strCurNum += input;
		console.log(strCurNum);
		return document.getElementById("equation").value = strCurNum;
	} else if (objMath.hasOwnProperty(input)) { // if it's a math symbol
	    if (objMath.hasOwnProperty(arrCurEqua[intCount]) && strCurNum === "0"){
			console.log("replaced symbol!");
			return arrCurEqua[intCount] = input;
		}
		if (typeof strCurNum === "number"){
			strCurNum = strCurNum.toString();
			console.log("converted an answer to string!");
		}
		if (intCount === 0){
		    console.log("somethin");
	    } else {
			intCount++;
	    }
		console.log(intCount);
	    arrCurEqua[intCount] = strCurNum;
		strCurNum = "0";
		arrCurEqua[++intCount] = input;
		console.log(intCount);
	} else if (input === "=" && intCount >= 1 && strCurNum !== "0"){ 
	    console.log("equals!");
	    intCount++;
		arrCurEqua[intCount] = strCurNum;
		strCurNum = "0";
		arrCurEqua[++intCount] = input;
		
		let num1 = "";
		let intSymbol = 1;
		let num2 = 2;
		for (var i = 2; i <= intCount; i++){
			console.log("LOOPY!",i,intCount);
			if (arrCurEqua[intSymbol] === "=") {
				console.log("break!", i,intCount);
				arrCurEqua[++intCount] = num1.toString();
				arrHistory.push(arrCurEqua);
				arrCurEqua = [];
				strCurNum = num1;
				intCount = 0;
				return document.getElementById("equation").value = strCurNum;
			};
			if (typeof num1 === "string"){
				num1 = Number(arrCurEqua[0]);
			};
			console.log(num1,arrCurEqua[intSymbol],Number(arrCurEqua[num2]));
			num1 = objMath[arrCurEqua[intSymbol]](num1,num2);
			intSymbol = intSymbol + 2;
			num2 = num2 + 2;
			console.log(num1);
		}
		
	}

}

function clearEntry (){
	console.log("display and strCurNum cleared")
	strCurNum = "0";
	return document.getElementById("equation").value = strCurNum;
}
function clearIt (){
	arrCurEqua = [];
	intCount = 0;
    clearEntry();
}
function backspace(){ 
    if (typeof strCurNum === "number"){ // incase user backspaces an answer 
		return;
	}
	strCurNum = strCurNum.substring(0,strCurNum.length-1) || "0";
	return document.getElementById("equation").value = strCurNum;
}




