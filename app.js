const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPay = document.getElementById('monthly-payment');
const total = document.getElementById('total-payment');
const total_int = document.getElementById('total-interest');
const cardElem = document.querySelector('.card');
const headingElem = document.querySelector('.heading');
const loadG = document.querySelector('#loader');
const results = document.querySelector('#results');

document.querySelector('#loan-form').addEventListener('submit', function(e){

	results.style.display = 'none';
	loadG.style.display = 'block';

	setTimeout(calcResult, 1000);
	e.preventDefault();
});

function calcResult() {
	loadG.style.display = 'none';

	const principal = parseFloat(amount.value);
	const calcInterest = parseFloat(interest.value) / 100 / 12;
	const calcPayments = parseFloat(years.value) * 12;

	//Monthly Payment
	const x = Math.pow(1 + calcInterest, calcPayments);
	const monthly = (principal*x*calcInterest)/(x-1);

	if(isFinite(monthly)) {
		monthlyPay.value = monthly.toFixed(2);
		total.value = (monthly * calcPayments).toFixed(2);
		total_int.value = ((monthly * calcPayments)-principal).toFixed(2);
		results.style.display = 'block';
	}else {
		showErr('Please fill all the inputs.');
	}

}

function showErr(error){
	const errDiv = document.createElement('div');
	errDiv.className = 'alert alert-warning ';


	errDiv.appendChild(document.createTextNode(error));

	cardElem.insertBefore(errDiv, headingElem);
	//Remove this div 
	setTimeout(removeFunc, 2000)
};

function removeFunc(){
	document.querySelector('.alert').remove();
}

//Loader 

