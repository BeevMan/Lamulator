

let arrCurEqua = [];
let arrHistory = [];
let strCurNum = "0"; // switches to number after it returns an answer
const objMath = { 
	    "÷": function (a,b) {return a / b},
		"X": function (a,b) {return a * b},
		"-": function (a,b) {return a - b},
		"+": function (a,b) {return a + b},
		"dec": function (floatA,floatB,decs,intSymbol) { // converts numbers to integers instead of floating point/s 
		    
			console.log("multiplied by", decs);
			let intTemp = Number(floatA) * decs;
			let intTempb = Number(floatB) * decs;
			console.log(intTemp,arrCurEqua[intSymbol],intTempb);
			let temp = objMath[arrCurEqua[intSymbol]](intTemp,intTempb);
			if (arrCurEqua[intSymbol] === "÷"){
			    return temp;
			} else if (arrCurEqua[intSymbol] === "X"){
				temp = objMath["÷"](temp,decs);
			}
			return temp = objMath["÷"](temp,decs);
		}
	};

function calculate(input){
	console.log("-----input pressed-------");
	
	if (typeof input === "number" || input === "." && strCurNum.includes(".") === false){
		if (strCurNum === "0" && typeof input === "number" || typeof strCurNum === "number"){ // leave the zero only when a decimal is input after 0
			strCurNum = "";
		} 
		strCurNum += input;
		console.log(strCurNum);
		return document.getElementById("equation").value = strCurNum;
	} else if (objMath.hasOwnProperty(input)) { // if it's a math symbol
	    if (objMath.hasOwnProperty(arrCurEqua[arrCurEqua.length-1]) && strCurNum === "0"){ 
			console.log("replaced symbol!");
			return arrCurEqua[arrCurEqua.length-1] = input;
		}
		if (typeof strCurNum === "number"){
			strCurNum = strCurNum.toString();
			console.log("converted an answer to string!");
		}
	    arrCurEqua.push(strCurNum);
		strCurNum = "0";
		arrCurEqua.push(input);
		
	} else if (input === "=" && arrCurEqua.length >= 2 && strCurNum !== "0"){ 
		arrCurEqua.push(strCurNum);
		strCurNum = "0";
		arrCurEqua.push(input);
		
		let num1 = "";
		let intb = "";
		let intSymbol = 1;
		let num2 = 2;
		for (var i = 2; i <= arrCurEqua.length; i++){
			console.log("Doing Equation!");
			if (arrCurEqua[intSymbol] === "=") {
				console.log("end of equation");
				arrCurEqua.push(num1.toString());
				arrHistory.push(arrCurEqua);
				arrCurEqua = [];
				strCurNum = num1;
				return document.getElementById("equation").value = strCurNum;
			};
			if (typeof num1 === "string"){
				num1 = Number(arrCurEqua[0]);
			};
			if (Number.isInteger(num1) === false || arrCurEqua[num2].includes(".")){ // catch for floating points
				console.log("floating point number found in equation");
				num1 = num1.toString();
				console.log("num1",num1);
				let len1 = 0;
				if (num1.indexOf(".") !== -1){
					len1 = num1.length-1 - num1.indexOf(".");
				}
				let len2 = 0;
				if (arrCurEqua[num2].indexOf(".") !== -1){
					len2 = arrCurEqua[num2].length-1 - arrCurEqua[num2].indexOf(".");
				}
                let decCount = 0;			
				if (len1 >= len2){ 
					decCount = len1;
				} else {
				    decCount = len2;
				}
                console.log("longest decibal count is",decCount);
				let decInd = Math.pow(10, decCount);
				num1 = objMath.dec(num1,arrCurEqua[num2],decInd,intSymbol);
			} else {
				intb = Number(arrCurEqua[num2]);
				console.log(num1,arrCurEqua[intSymbol],intb);
				num1 = objMath[arrCurEqua[intSymbol]](num1,intb);
			}
			intSymbol += 2;
			num2 += 2;
			console.log("=",num1);
		}	
	}
}

function clearEntry (){
	strCurNum = "0";
	return document.getElementById("equation").value = strCurNum;
}
function clearIt (){
	arrCurEqua = [];
    clearEntry();
}
function backspace(){ 
    if (typeof strCurNum === "number"){ // incase user backspaces an answer 
		return;
	}
	strCurNum = strCurNum.substring(0,strCurNum.length-1) || "0";
	return document.getElementById("equation").value = strCurNum;
}

/* --IF DIVIDING WHOLE NUMBERS RETURNS AN ANSWER WITH DECIMALS THEIR MAY BE PROBLEMS--
50/3 currently returns 16.666666666666668 IT should return 16.666666666666667 but when multiplying my anser from 50/3 by 3 it returns 50
1/6 currently wrong, returns 0.16666666666666666 instead of 0.1666666666666667? when multiplying the answer by 6 it returns back to 1
1/7 currently returns 0.14285714285714285 instead of 0.1428571428571429?
1/9 currently returns 0.1111111111111111 (times 9 afterwards does not return 1)instead of 0.1111111111111111
10/12 is wrong and doesn't return to 10 when asnwer is multiplied by 12
10/15 is wrong but returns 10 when answer is multiplied by 15
10/24 returns the correct answer but when multiplying the answer by 24 it does not return 10
*/