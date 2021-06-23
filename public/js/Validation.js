function validateRegistrationForm() {
	var name = document.getElementById("user_name");
	var email = document.getElementById("user_email");
	var password = document.getElementById("user_password");
	var retype_password = document.getElementById("user_retype_password");

	var name_value = name.value;
	var email_value = email.value;
	var password_value = password.value;
	var retype_password_value = retype_password.value;

	if(name_value == "" || /\d/.test(name_value) || name_value.length<=2){
		document.getElementById("name_error").textContent = "Please Enter a correct Name";
		name.focus();
		return false;
	}else{
		document.getElementById("name_error").textContent = "";
	}

	if(email_value.length<=5){
		document.getElementById("email_error").textContent = "Please Enter a valid Email Address";
		email.focus();
		return false;
	}else{
		document.getElementById("email_error").textContent = "";
	}

	if(password_value.length<8){
		document.getElementById("password_error").textContent = "Password should be atlease 8 letters";
		password.focus();
		return false;
	}else{
		document.getElementById("password_error").textContent = "";
	}

	if(password_value != retype_password_value){
		document.getElementById("retype_password_error").textContent = "Password and Retype Password not match";
		retype_password.focus();
		return false;
	}else{
		document.getElementById("retype_password_error").textContent = "";
	}

	return true;
}


function validateLoginForm(){
	var email = document.getElementById("user_email");
	var password = document.getElementById("user_password");	

	var email_value = email.value;
	var password_value = password.value;

	if(email_value.length<=5){
		document.getElementById("email_error").textContent = "Please Enter a valid Email Address";
		email.focus();
		return false;
	}else{
		document.getElementById("email_error").textContent = "";
	}

	if(password_value.length<8){
		document.getElementById("password_error").textContent = "Password should be atlease 8 letters";
		password.focus();
		return false;
	}else{
		document.getElementById("password_error").textContent = "";
	}

	return true;
}