

let arrCurEqua = [];
let arrHistory = [];
let strCurNum = "0"; // switches to number after it returns an answer
let intCount = 0; // goes up when math symbols are input
let objMath = { 
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
			console.log(temp);
			if (arrCurEqua[intSymbol] === "÷"){
				console.log("floating point with division!!!");
			    return temp;
			} else if (arrCurEqua[intSymbol] === "X"){
				console.log("floating point with multiplication!!");
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
	    if (objMath.hasOwnProperty(arrCurEqua[intCount]) && strCurNum === "0"){
			console.log("replaced symbol!");
			return arrCurEqua[intCount] = input;
		}
		if (typeof strCurNum === "number"){
			strCurNum = strCurNum.toString();
			console.log("converted an answer to string!");
		}
		if (intCount > 0){
		    intCount++;
	    }
		
		console.log(intCount);
	    arrCurEqua[intCount] = strCurNum;
		strCurNum = "0";
		arrCurEqua[++intCount] = input;
		console.log(intCount);
		
	} else if (input === "=" && intCount >= 1 && strCurNum !== "0"){ 
	    console.log("equals!");
		arrCurEqua[++intCount] = strCurNum;
		strCurNum = "0";
		arrCurEqua[++intCount] = input;
		
		let num1 = "";
		let intb = "";
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
                console.log("len1",len1,"len2",len2);				
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




