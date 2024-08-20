import { View } from "react-native";
import { Alert, ToastAndroid, Platform } from "react-native";
import Toast from 'react-native-simple-toast';
//--------------------------- Message Provider Start -----------------------
class messageFunctionsProviders {
	toast(message, position) {
		if (position == 'center') {
			Toast.showWithGravity(message, Toast.short, Toast.CENTER);
		}
		else if (position == 'top') {
			Toast.showWithGravity(message, Toast.short, Toast.TOP);
		}
		else if (position == 'bottom') {
			Toast.showWithGravity(message, Toast.short, Toast.BOTTOM);

		}
		else if (position == 'long') {
			Toast.showWithGravity(message, Toast.long, Toast.CENTER);
		}

	}

	alert(title, message, callback) {
		if (callback === false) {
			Alert.alert(
				title,
				message,
				[
					{
						text: msgTitle.ok[0],
					},
				],
				{ cancelable: false },
			);
		} else {
			Alert.alert(
				title,
				message,
				[
					{
						text: msgTitle.ok[0],
						onPress: () => callback,
					},
				],
				{ cancelable: false },
			);
		}

	}

	confirm(title, message, callbackOk, callbackCancel) {
		if (callbackCancel === false) {
			Alert.alert(
				title,
				message,
				[
					{
						text: msgTitle.cancel[0],
					},
					{
						text: msgTitle.ok[0],
						onPress: () => this.btnPageLoginCall(),
					},
				],
				{ cancelable: false },
			);
		} else {
			Alert.alert(
				title,
				message,
				[
					{
						text: msgTitle.cancel[0],
						onPress: () => callbackCancel,
					},
					{
						text: msgTitle.ok[0],
						onPress: () => callbackOk,
					},
				],
				{ cancelable: false },
			);
		}

	}

	later(title, message, callbackOk, callbackCancel, callbackLater) {
		Alert.alert(
			title,
			message,
			[
				{
					text: 'Ask me later',
					onPress: () => msgTitle.later[0],
				},
				{
					text: 'Cancel',
					onPress: () => msgTitle.cancel[0],
				},
				{
					text: 'OK',
					onPress: () => msgTitle.ok[0],
				},
			],
			{ cancelable: false },
		);
	}


}

//--------------------------- Title Provider Start -----------------------

class messageTitleProvider {
	//----------------- message buttons
	ok = ['Ok', 'Okay', 'Está bem'];
	cancel = ['Cancel', 'Cancelar', 'Cancelar'];
	later = ['Later', 'Más tarde', 'Mais tarde'];


	//--------------- message title 
	information = ['Information Message', 'Mensaje informativo', 'Mensagem Informativa'];
	alert = ['Alert', 'Alerta', 'Alerta'];
	confirm = ['Information Message', 'Mensaje informativo', 'Mensagem Informativa'];
	validation = ['Information Message', 'Mensaje informativo', 'Mensagem Informativa'];
	success = ['Information Message', 'Mensaje informativo', 'Mensagem Informativa'];
	error = ['Information Message', 'Mensaje informativo', 'Mensagem Informativa'];
	response = ['Response', 'Respuesta', 'Resposta'];
	server = ['Connection Error', 'Error de conexión', 'Erro de conexão'];
	internet = ['Connection Error', 'Error de conexión', 'Erro de conexão']
	deactivate_msg = ['Account deactived']
	deactivate = [0,]
	usernotexit = ["User id does not exist"]
	account_deactivate_title = ['your account deactivated please try again']
}

//--------------------------- Message Provider Start -----------------------

class messageTextProvider {
	//=========================Links tax

	link_not_avail = ["Link not available"]


	loginFirst = ['Please login first',];
	emptyContactResion = ['Please select contact reason',];
    networkconnection = ['Unable to connect. Please check that you are connected to the Internet and try again.', 'Unable to connect. Please check that you are connected to the Internet and try again.'];
	internet = ['Connection Error', 'Error de conexión', 'Erro de conexão']
	information = ['Information Message', 'Mensaje informativo', 'Mensagem Informativa'];
	internet = ['Connection Error', 'Error de conexión', 'Erro de conexão']
	servermessage = ['An Unexpected error occured , Please try again .If the problem continues , Please do contact us', 'An Unexpected error occured , Please try again .If the problem continues , Please do contact us'];
	//--------------------All Field Require-------------
	Sign_In_or_Login_error_msg = ['check terms and condition','नियम और शर्तें जांचें','vérifier les termes et conditions','controleer de voorwaarden','consultar términos y condiciones','ตรวจสอบข้อกำหนดและเงื่อนไข','تحقق من الشروط والأحكام','检查条款和条件']
	name_mobile_enter_message = ['Please enter name and mobile']
	openingHourShouldBeGreaterThenClosingHour = ['Opening hour should be greater then closing hour'];
	Start_time_End_time_greater_validation = ['End time should be greater than start time'];


	//-----------------localbusiness  app -------------------
	EnterText = ['Please Enter some text']
	TextTooShort = ['Entered text is too short']

	emptyFirstName = ['Please enter first name',"कृपया प्रथम नाम दर्ज करें","Veuillez entrer le prénom","Voer de voornaam in",'Por favor, introduzca el nombre',"กรุณากรอกชื่อ","الرجاء إدخال الاسم الأول",'请输入名字']
	enteraboutme = ['Please enter about me ']
	firstNameMinLength = ['First Name is too short','प्रथम नाम बहुत छोटा है','Le prénom est trop court','Voornaam is te kort','El nombre es demasiado corto','ชื่อสั้นเกินไป','الاسم الأول قصير جدًا','名字太短']
	firstNameMaxLength = ['First Name is too long']
	validFirstName = ['Spaces not allowed in first name']

	emptyContactMessage = ['Please enter message', ''];

	emptyGroupName = ['Please enter Group Name']
	emptyGroupNameshort = ['Group Name is too short']

	emptyDeadLine = ['Please Select Deadline']

	emptycontacts = ['Please Select contacts']

	//  ================================================================
	writeyourquestion = ['Please Enter Field Minimum 2 Characters']
	//  ================================================================
	accountHolderName = ['Enter a first name','पहला नाम दर्ज करें','Entrez un prénom', 'Introduce un nombre','Voer een voornaam in','ป้อนชื่อ',"يرجى ادخال الاسم الاول",'输入名字']
	Syllabustitle = ['Please Enter  Title','कृपया शीर्षक दर्ज करें','Veuillez entrer le titre','Ingrese el título','Voer een titel in','กรุณาใส่ชื่อเรื่อง','الرجاء إدخال العنوان','请输入标题']
	CourseName = ['Please Enter  Course Name','कृपया पाठ्यक्रम का नाम दर्ज करें','Veuillez entrer le nom du cours','Ingrese el nombre del curso','Voer de cursusnaam in','กรุณาใส่ชื่อหลักสูตร','الرجاء إدخال اسم الدورة','请输入课程名称']
	selectTopic = ['Please Select Topic','कृपया विषय चुनें','Veuillez sélectionner un sujet','Seleccione un tema','Selecteer onderwerp','กรุณาเลือกหัวข้อ','الرجاء تحديد الموضوع','请选择主题']
	selectStartdate = ['Please Select Start Date','कृपया आरंभ तिथि चुनें','Veuillez sélectionner la date de début','Seleccione la fecha de inicio','กรุณาเลือกวันที่เริ่มต้น','يرجى تحديد تاريخ البدء','请选择开始日期']
	selectEndtdate = ['Please Select End date','कृपया अंतिम तिथि चुनें','Veuillez sélectionner la date de fin','Seleccione la fecha de finalización','Selecteer Einddatum','กรุณาเลือกวันที่สิ้นสุด','يرجى تحديد تاريخ الانتهاء','请选择结束日期']
	selectTime = ['Please Select Time','कृपया समय चुनें','Veuillez sélectionner lheure','Seleccione hora','Selecteer tijd','กรุณาเลือกเวลา','الرجاء تحديد الوقت','请选择时间']
	
	CourseFee = ['Please Enter Course Fee','कृपया पाठ्यक्रम शुल्क दर्ज करें','Veuillez entrer les frais de cours','Ingrese la tarifa del curso','Voer cursusgeld in','กรุณากรอกค่าธรรมเนียมหลักสูตร','الرجاء إدخال رسوم الدورة','请输入课程费用']
	selectGender =['PLease select Gender','कृपया लिंग चुनें','Por favor seleccione el género','Selecteer Geslacht','Veuillez sélectionner le sexe','กรุณาเลือกเพศ','يرجى تحديد الجنس','请选择性别']
	Syllabusdiscription = ['Please Enter Short  Description']
	Lecturercount = ['Please Enter Lecturer']
	Timeduration = ['Please Enter duration']
	selectskillsbasic = ['please select skills for request']
	selectskillsmedium = ['please select skills for request']
	StartDate = ['Please Select Start Date']
	EndDate = ['Please Select End Date']
	TimeSelect = ['Please Select a Time']
	priceset = ['Please Enter your course fee.']
    greaterDate =[ 'Please Select  greater date']
	//==============================overview=============================
	overview = ["Please enter overview"]
	report_txt = ["Please enter report"]
	review_txt = ["Please enter review"]
	no_category_available = ['No category available']

	//==========================Reason==================
	reason_txt = ["Please enter reason"]
	//==============================Social URl=============================
	facebook = ["Please enter Facebook url"]
	validfacebook = ["Please enter valid Facebook url"]

	instagram = ["Please enter Instagram url"]
	validinstagram = ["Please enter valid Instagram url"]

	linkedin = ["Please enter LinkedIn url"]
	validlinkedin = ["Please enter valid LinkedIn url"]

	google = ["Please enter Google url"]
	validgoogle = ["Please enter valid Google url"]

	entername = ['Please enter your name','कृपया अपना नाम दर्ज करें','Sil vous plaît entrez votre nom','Voer uw naam in','por favor, escriba su nombre','กรุณากรอกชื่อของคุณ','من فضلك أدخل إسمك','请输入你的名字']

	emptyname = ['Please enter your name','कृपया अपना नाम दर्ज करें','Sil vous plaît entrez votre nom','Voer uw naam in','por favor, escriba su nombre','กรุณากรอกชื่อของคุณ','من فضلك أدخل إسمك','请输入你的名字']

	emptyName = ['Please enter your name','कृपया अपना नाम दर्ज करें','Sil vous plaît entrez votre nom','Voer uw naam in','por favor, escriba su nombre','กรุณากรอกชื่อของคุณ','من فضلك أدخل إسمك','请输入你的名字']

	nameMinLength = ['Name is too short','नाम बहुत छोटा है','Le nom est trop court','Naam is te kort','el nombre es muy corto','ชื่อสั้นเกินไป','الإسم قصير جدا','名字太短']
	nameMaxLength = ['Name is too long']
	validname = ['Spaces not allowed an name']
	uploderesume =['Please upload ressume']
	uplodeResumefile =['Please upload ressume file','कृपया बायोडाटा फ़ाइल अपलोड करें','Por favor cargue el archivo de currículum','Upload uw CV-bestand','กรุณาอัพโหลดไฟล์เรซูเม่','الرجاء تحميل ملف السيرة ','请上传简历文件'
]

	//=============================Add Upcoming Holidays
	holiday_name = ['Please enter Holiday name']
	holiday_min_name = ['Holiday name is too short']
	holiday_Max_Length = ['Holoday name is too long']
	ChooseLanguage = ['Please choose a language','कृपया एक भाषा चुनें','Veuillez choisir une langue','Kies een taal','Por favor elige un idioma','กรุณาเลือกภาษา','الرجاء اختيار لغة','请选择语言']

    selectMode =['Please select mode','कृपया मोड चुनें','Veuillez sélectionner le mode',"Selecteer modus",'Por favor seleccione el modo','กรุณาเลือกโหมด','الرجاء تحديد الوضع','请选择模式']
	date_Validaytion = ['Please select date','']

	// ==============================

	//==============================Login===============================
	emptyEmail=['Please enter email address','कृपया ईमेल पता दर्ज करें','Veuillez saisir ladresse e-mail','Voer het e-mailadres in','Por favor, introduzca la dirección de correo electrónico',"'กรุณาใส่ที่อยู่อีเมล',","الرجاء إدخال عنوان البريد'",'请输入电子邮件地址']
	valideDate = ['Please select valide Date','कृपया वैध तिथि चुनें','Veuillez sélectionner une date valide','Seleccione la fecha de validez','Selecteer valide Datum','กรุณาเลือกวันที่ที่ถูกต้อง','الرجاء تحديد تاريخ','请选择有效日期']
	Invalid = ['The intered OTP invalid/incorrect. Please try again','दर्ज किया गया ओटीपी अमान्य/गलत है। कृपया पुन: प्रयास करें','LOTP intéressé est invalide/incorrect. Veuillez réessayer','De intered OTP is ongeldig/onjuist. Probeer het opnieuw','La OTP interesada no es válida/incorrecta. Inténtalo de nuevo','รหัส OTP ไม่ถูกต้อง/ไม่ถูกต้อง กรุณาลองอีกครั้ง','غير صحيح. حاول مرة اخرى','查询的 OTP 无效/不正确。请再试一次']
	emptyotp = ['Please Enter 4 digit OTP','कृपया 4 अंकों का ओटीपी दर्ज करें',' Veuillez entrer un OTP à 4 chiffres','Voer 4-cijferige OTP in','Ingrese OTP de 4 dígitos',"กรุณากรอกรหัส OTP 4 หลัก","الرجاء إدخال كلمة المرور لمرة واحدة (OTP) المكونة ",'请输入 4 位一次性密码']
	
	
	resendotp = ['OTP send your registerd Email']
	Language = ['Please choose a language','कृपया एक भाषा चुनें','Veuillez choisir une langue','Por favor elige un idioma','กรุณาเลือกภาษา','الرجاء اختيار لغة','Kies een taal','请选择语言']
	emailMaxLength = ['Email is too long']
	validEmail = ['Email address is not correct , please enter a valid email address.','ईमेल पता सही नहीं है, कृपया एक वैध ईमेल पता दर्ज करें।','Ladresse e-mail nest pas correcte, veuillez saisir une adresse e-mail valide.','E-mailadres is niet correct, vul een geldig e-mailadres in.','E-mailadres is niet correct, vul een geldig e-mailadres in.','ที่อยู่อีเมลไม่ถูกต้อง โปรดป้อนที่อยู่อีเมลที่ถูกต้อง','صحيح ، يرجى إدخال عنوان ','Ladresse e-mail nest pas correcte, veuillez saisir une adresse e-mail valide.']

	emptyLastName = ['Please enter  last name','कृपया 4 अंकीय ओटीपी दर्ज करें','Veuillez entrer un OTP à 4 chiffres','Voer een 4-cijferige OTP in','Ingrese OTP de 4 dígitos','กรุณากรอกรหัส OTP 4 หลัก','لمرة واحدة (OTP) المكونة','请输入 4 位一次性密码']
	lastNameMinLength = ['Last name is too short']
	lastNameMaxLength = ['Last name is too long']
	validLastName = ['Spaces not allowed in last name']


	Enterotp =  ['Please Enter 4 digit OTP','कृपया 4 अंकों का ओटीपी दर्ज करें','Veuillez entrer un OTP à 4 chiffres','Voer 4-cijferige OTP in','Ingrese OTP de 4 dígitos','กรุณาใส่รหัส OTP 4 หลัก','لمرة واحدة (OTP) المكونة','请输入 4 位 OTP']



	emptyFullName = ['Please enter  full name']
	fullNameMinLength = ['Full name is too short']
	fullNameMaxLength = ['Full name is too long']
	validFullName = ['Spaces not allowed in full name']
	otp = ['OTP is not correct']


	emptyMobile = ['Please Enter mobile number','कृपया मोबाइल नंबर दर्ज करें','Veuillez entrer le numéro de téléphone portable','Vul a.u.b. het mobiele nummer in','Por favor, introduzca el número de móvil',"กรุณากรอกเบอร์มือถือ","الرجاء إدخال رقم الهاتف",'请输入手机号码']






	ChooseLanguage = ['PLease select a language']



	emptyOtp = ['Please Enter 4 digit OTP','Veuillez entrer un OTP à 4 chiffres','कृपया 4 अंकों का ओटीपी दर्ज करें','กรุณาใส่รหัส OTP 4 หลัก','لمرة واحدة (OTP) المكونة','Voer 4-cijferige OTP in','Ingrese OTP de 4 dígitos','请输入 4 位 OTP']
mobileMaxLength = ['Enter a valid mobile number','Entrez un numéro de portable valide','एक वैध मोबाइल नंबर दर्ज करें','ป้อนหมายเลขโทรศัพท์มือถือที่ถูกต้อง','أدخل رقم هاتف صالح','Voer een geldig mobiel nummer in','Introduce un número de móvil válido','输入有效的手机号码']
	mobileMinLength =  ['Enter a valid mobile number','Entrez un numéro de portable valide','एक वैध मोबाइल नंबर दर्ज करें','ป้อนหมายเลขโทรศัพท์มือถือที่ถูกต้อง','أدخل رقم هاتف صالح','Voer een geldig mobiel nummer in','Introduce un número de móvil válido','输入有效的手机号码']

	otpMinLength =  ['Enter a valid mobile number','Entrez un numéro de portable valide','एक वैध मोबाइल नंबर दर्ज करें','ป้อนหมายเลขโทรศัพท์มือถือที่ถูกต้อง','أدخل رقم هاتف صالح','Voer een geldig mobiel nummer in','Introduce un número de móvil válido','输入有效的手机号码']

	validMobile = ['Spaces and special characters not allowed in mobile number']
	validOTP = ['Spaces and special characters not allowed in otp number']
	emptytext = ['Please enter text minium 150 words']


	emptyAmount = ['Please enter a Contribution Amount']
	//  =======================================================
	targetAmtval = ['Please Enter Target Amount']
	AccountNumber = ['Please Enter Account Number']
	AccountNumberValid = ['Please Enter valid Account Number']
	IFSCValid = ['Please Enter IFSC code']
	enterIFSCValid = ['Please Enter valid IFSC code']

	//=================================Password===================
	emptyPassword = ['Please enter your password']
	passwordMaxLength = ['Password too long']
	passwordMinLength = ['Password should be atleast 6 digit']
	validPassword = ['Spaces not allowed in password']

	emptyAddress = ['Please Enter Addrees']
	addressMinLength = [' Addrees is too short']
	addressMaxLength = [' Addrees is too long']
	validAddress = ['Spaces not allowed in addrees']

	emptyPincode = ['Please enter pincode']
	pincodeMinLength = ['Pincode is too short']
	pincodeMaxLength = ['Pincode is too long']
	validPincode = ['Spaces and special characters not allowed in pin code']

	emptyOldPassword = ['Please enter old password']
	oldPasswordMaxLength = ['Old Password too long']
	oldPasswordMinLength = [' Old Password should be atleast 6 digit']
	validOldPassword = ['Spaces not allowed in old password']


	emptyNewPassword = ['Please enter new password']
	newPasswordMaxLength = [' New password too long']
	newPasswordMinLength = [' New password should be atleast 6 digit']
	validNewPassword = ['Spaces not allowed in new password']

	emptyPassword = ['Please enter your password']
	passwordMaxLength = ['Password too long']
	passwordMinLength = ['Password should be atleast 6 digit']
	validPassword = ['Spaces not allowed in password']

	emptyConfirmPassword = ['Please enter confirm password']
	confirmPasswordMaxLength = [' Confirm password too long']
	confirmPasswordMinLength = [' Confirm password should be atleast 6 digit']
	validConfirmPassword = ['Spaces not allowed in confirm password']
	passwordNotMatch = ['New password and confirm password fields must be equal']
	passwordNot = ['Password and confirm password fields must be equal']
	passwordMatch = ['Old password and new password fields must not be equal']

	acceptTerms = ['check terms and condition','नियम और शर्तें जांचें','vérifier les termes et conditions',
	'controleer de voorwaarden','consultar términos y condiciones', 'ตรวจสอบข้อกำหนดและเงื่อนไข','تحقق من الشروط والأحكام','检查条款和条件']

	selectturms = ['Please select any condition.']
	CheckTerms = ['Check Terms and Conditions .']
	emptyOtp = ['Please enter OTP']
	otpMinLength = ['OTP should be atleast 4 digit']
	otpMaxLength = ['OTP should be atleast 4 digit']
	otp = ['OTP send your register Email']

	Start_End_time_greater = ['End time should be greater than start time']


	//-------------------------contact us ---------------------
	emptyFullName = ['Please enter full name']
	fullNameMinLength = ['Full name is too short']
	fullNameMaxLength = ['Full name is too long']
	validName = ['Spaces not allowed in full name']
	messageSend = ['Message sent successfully ']
	LoginSuccess = ['Login successfully ']
	ProfileUpdate = ['Profile Update successfully ']
	validMessage = ['Spaces not allowed in message']

	//-----------------add report----------------
	emptyReportMessage = ['Please enter report message']
	validReportMessage = ['Please enter valid report message']


	//----------------select slot ---------
	emptyDate = ['Please select Date']
	emptyTime = ['Please select time']
	emptyPeople = ['Please select no of people']
	restaurant_close = ['Restaurant close on that day']
	emptySlot = ['Please select slot']
	selectAnotherSlot = ['Please select another slot']
	slotTimeOver = ['Slot time is over']

	//----------reservation history------------//
	already_checkin = ['You already check-in']
	checkin_first = ['Please check-in first']

	//----------------home filter -----------//
	emptyRestauCategory = ['Please select Restaurant Category']
	emptyReviewType = ['Please select Review Type']
	emptyFilterOption = ['Please select Filter Option']

	// =============================NO Yes
	No_txt = ["No"]
	Yes_txt = ["Yes"]

}

export const msgText = new messageTextProvider();
export const msgTitle = new messageTitleProvider();
export const msgProvider = new messageFunctionsProviders();
//--------------------------- Message Provider End -----------------------