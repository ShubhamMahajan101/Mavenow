import { Alert, ToastAndroid, I18nManager, Platform } from "react-native";
import { localStorage } from './localStorageProvider';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { config } from "./configProvider";
import Support from "../Support";

global.language_key = 1;
class Language_provider {

  language_get = async () => {
    var item = await AsyncStorage.getItem('language');
    console.log('check launguage option', item)
    if (item != null) {
      console.log('config language console', config.language)
      config.language = item;
    }
    console.log('language_key123', config.language)
  }

  language_set = (value) => {
    config.language = value;
    localStorage.setItemObject('language', value)
  }


// english
// hindi
// spanish
// dutch
// french
// Thai
// Arabic
// Chinese


  // Media option ///////////////////
  SelectOption =['Select Option','विकल्प चुनें','Seleccionar opción','Selecteer optie','Sélectionner une option','เลือกตัวเลือก','حدد الخيار','选择选项']
  MediaCamera = ['Camera', 'कैमरा','cámara','camera','caméra','กล้อง','آلة تصوير','相机'];
  Mediagallery = ['Gallery', 'गैलरी','Galería','Galerij','Galerie','แกลลอรี่','صالة عرض','画廊'];
  cancelmedia = ['Cancel','रद्द करे',"Cancelar","Annuleren","Annuler","ยกเลิก","يلغي"," 取消"];

  onlineTxt = ['online', 'ऑनलाइन', 'en línea','online', 'en ligne', 'ออนไลน์', 'متصل', '在线的']
  offlineTxt = ['offline', 'ऑफलाइन', "desconectada", "offline", "hors ligne", "ออฟไลน์", 'غير متصل على الانترنت', "离线"]


// ***************************************************************************************** Login Screen ********************************************************************************************
PleaseInsert =['Please Insert Email/mobile number.','कृपया ईमेल/मोबाइल नंबर डालें।',"Veuillez insérer votre e-mail/numéro de portable.","Voer e-mailadres/mobiel nummer in.","Introduzca el correo electrónico/número de móvil.","กรุณาใส่อีเมล์/หมายเลขโทรศัพท์มือถือ.","الرجاء إدخال البريد","请输入电子邮件/手机号码"]
lamguagename =['English','हिंदी',' española','Nederlands','française','แบบไทย','هندي','印地语']
ssplashTxt = ['का हिंदी अर्थ है – “लेख”','i am available in English',"Voulez-vous laisser un message ?","مرحبا مستخدم كيف حالك"]
LoginTxt = ['Login','लॉग इन करें',"Acceso","Log in","Connexion","เข้าสู่ระบบ","تسجيل الدخول","登录"]
LoginAccountTxt = ['Please Login to Your Account.','कृपया अपने खाते लॉग इन करें',"Por favor, ingrese a su cuenta","Log in op uw account","Veuillez vous connecter à votre compte","กรุณาเข้าสู่ระบบบัญชีของคุณ","يرجى تسجيل الدخول إلى ","请登录您的账户"]
LOGINbtnTxt = ['Login','लॉग इन करें',"ACCESO","LOG IN","CONNEXION","เข้าสู่ระบบ","تسجيل الدخول","登录"]
ORTxt = ['OR','या',"O","OF","OU","หรือ","أو","或者"]
OrLoginWith =['Or Login With','या इसके साथ लॉगिन करें','O inicia sesión con','Of log in met','Ou connectez-vous avec','หรือเข้าสู่ระบบด้วย','أو تسجيل الدخول باستخدام','或登录']
// clickhere =['click here','यहाँ क्लिक करें','haga clic aquí','Klik hier','Cliquez ici','คลิกที่นี่','点击这里','انقر هنا']
clickhere =['Click Here','यहाँ क्लिक करें','haga clic aquí','Klik hier','Cliquez ici','คลิกที่นี่','点击这里','انقر هنا']
// newAccountTxt = ['Create a new account','एक नया खाता बनाएं',"Crea una cuenta nueva","Maak een nieuw account aan","Créer un nouveau compte","สร้างบัญชีใหม่","انشاء حساب جديد","创建一个新账户"]
newAccountTxt = ['Create a New Account','एक नया खाता बनाएं',"Crea una cuenta nueva","Maak een nieuw account aan","Créer un nouveau compte","สร้างบัญชีใหม่","انشاء حساب جديد","创建一个新账户"]
  // ***************************************************************************************** Sign UP Screen ********************************************************************************************
  
  SignUpTxt = ['Sign Up','साइन अप करें',"Inscribirse","Aanmelden","S'inscrire","ลงชื่อ","اشتراك","报名"]
  SwitchProfileTxt = ['You Can Switch Your Profile Anytime!','आप अपनी प्रोफ़ाइल कभी भी बदल सकते हैं!',"Puedes cambiar tu perfil en cualquier momento","U kunt uw profiel op elk moment wijzigen","Vous pouvez changer de profil à tout moment","คุณสามารถเปลี่ยนโปรไฟล์ของคุณได้ตลอดเวลา!","يمكنك تبديل ملف التعريف ","您可以随时切换您的个人资料！"]
  LearnerGuidanceTxt = ['Professional who is seeking  Solutions, Mentorship, Guidance, or Upskilling !','पेशेवर जो समाधान, सलाह, मार्गदर्शन या अपस्किलिंग की मांग कर रहा है!',"Profesional que busca Soluciones, Tutoría, Orientación o Upskilling","Professional die op zoek is naar oplossingen, mentorschap, begeleiding of bijscholing","Professionnel à la recherche de solutions, de mentorat, d'orientation ou de perfectionnement !","มืออาชีพที่กำลังมองหาแนวทางแก้ไข การให้คำปรึกษา การแนะแนว หรือการยกระดับทักษะ !","محترف يبحث عن حلول أو ","寻求解决方案、指导、指导或技能提升的专业人士！"]
  MentorGuideTxt = ['An expert, Mentor or Guide for other Professionals!','एक विशेषज्ञ, सलाहकार या अन्य पेशेवरों के लिए गाइड!',"Experto, Mentor o Guía para otros Profesionales","Een expert, mentor of gids voor andere professionals","Un expert, mentor ou guide pour d'autres professionnels !","ผู้เชี่ยวชาญ ที่ปรึกษา หรือคำแนะนำสำหรับมืออาชีพอื่นๆ!","خبير أو مرشد أو دليل ","其他专业人士的专家、导师或指南！"]
  SIGNUPbtnTxt = ['Sign Up','साइन अप करें',"INSCRIBIRSE","AANMELDEN","S'INSCRIRE","ลงชื่อ","اشتراك","报名"]
  ChooselanguageTxt = ['Choose language','भाषा चुनें*',"Elige lengua","Kies een taal","Choisissez la langue","เลือกภาษา","اختر اللغة","选择语言"]
  ChooseyourlanguageTxt = ['Choose your language','अपनी भाषा चुनें',"Elige tu idioma","Kies je taal","Choisissez votre langue","เลือกภาษาของคุณ","اختر لغتك","选择你的语言"]
  DoneTxt = ["Done",'हो गया','Hecho','Klaar','Fait','เสร็จแล้ว','منتهي','完毕']
  IagreedtoTxt=["I agreed to","मैं सहमत हो गया","acepté","Ik stemde ermee in","j'ai accepté","ฉันตกลงที่จะ","وافقت على","我同意"]
  Termsandconditions=['Terms and Conditions',"नियम और शर्तें","Términos y condiciones","Voorwaarden","Termes et conditions","ข้อกำหนดและเงื่อนไข","الأحكام والشروط","条款和条件"]
  FullName=['Full Name*','पूरा नाम',"'Nombre completo","Voor-en achternaam","Nom et prénom","ชื่อเต็ม","الاسم الكامل","全名"]
  Email=['Email*','ईमेल',"Correo electrónico","E-mail","E-mail","อีเมล","بريد إلكتروني","电子邮件"]
    // ***************************************************************************************** Varification Code Screen ********************************************************************************************
    // VerificationCodeTxt = ['Verification Code','सत्यापन कोड',"VerificationCodeTxt","Verificatie code","Le code de vérification","รหัสยืนยัน","رمز التحقق","验证码"]
    VerificationCodeTxt = ['Verification','सत्यापन ',"VerificationTxt","Verificatie","Le de vérification","รหัสยืนยัน","رمز التحقق","验证码"]
    typeCodeTxt = ['Please type the verification code sent to ','कृपया सत्यापन कोड टाइप करें जिसे भेजा गया है',"Por favor, escriba el código de verificación enviado a","Typ de verificatiecode in waarnaar is verzonden","Veuillez saisir le code de vérification envoyé à","กรุณาพิมพ์รหัสยืนยันที่ส่งมาที่","الرجاء كتابة رمز التحقق ","请输入发送至的验证码"]
    // VerifyOtpBtn = ['VERIFY OTP','ओटीपी सत्यापित करें',"VERIFICAR OTP","CONTROLEER OTP","VÉRIFIER OTP","ยืนยัน อปท","تحقق من ","验证一次性密码"]
    VerifyOtpBtn = ['VERIFY ','सत्यापित करें',"VERIFICAR","CONTROLEER ","VÉRIFIER ","ยืนยัน อปท","تحقق من ","验证一次性密码"]
    RemainingTxt = ['Remaining:','बचा हुआ:',"Restante","Overig","Restante","ที่เหลืออยู่","متبقي:"," 其余的"]
    ResendOtpTxt = ['RESEND OTP','ओटीपी पुनः भेजें',"REENVIAR OTP","OPNIEUW VERZENDEN OTP","RENVOYER OTP","ส่ง อปท อีกครั้ง","إعادة إرسال","重发一次性密码"]
      // ***************************************************************************************** Dashboard Screen ********************************************************************************************
      LearnerRecommendedTxt = ['Learner(s) Recommended for Profile','शिक्षार्थी (ओं) प्रोफ़ाइल के लिए अनुशंसित',"Alumna (s) recomendada para perfil","Leerling(en) aanbevolen voor profiel","Apprenant(s) recommandé(s) pour le profil","ผู้เรียนแนะนำสำหรับโปรไฟล์","متعلم (ق) موصى به للملف","为个人资料推荐的学员"]
      MavenRecommendedTxt = ['Maven(s) Recommended for Profile','प्रोफ़ाइल के लिए मावेन अनुशंसित',"Experto(s) recomendado(s) para el perfil","Maven(s) aanbevolen voor profiel","Maven(s) recommandé(s) pour le profil","มาเวน แนะนำสำหรับโปรไฟล์","مافن (ق) موصى به للملف ","专家推荐用于配置文件"]
      MavenTxt = ['Maven','विशेषज्ञ',"Experta","Maven","Maven","มาเวน","مخضرم","行家"]
      MavennTxt = ['(Maven)','(विशेषज्ञ)',"(Experta)","(Maven)","(Maven)","(มาเวน)","(مخضرم)","（行家）"]
      LearnerTxt = ['Learner','विद्यार्थी',"Aprendiza","Leerling","Apprenant","ผู้เรียน","متعلم","学习者"]
      LearnerrTxt = ['(Learner)','(विद्यार्थी)',"(Aprendiza)","(Leerling)","(Apprenant)","(ผู้เรียน)","(متعلم)","（学习者）"]
      MyLearnerTxt = ['My Learner(s)','मेरे शिक्षार्थी',"Mis alumnos","Mijn leerling(en)","Mes apprenants","ผู้เรียนของฉัน","متعلمي (ق)","我的学习者"]
      MyMavenxt = ['My Maven(s)','मेरे विशेषज्ञ',"Mi(s) experto(s)","Mijn meester(s)","Mes Maven(s)","มาเวน ของฉัน","مافن (ق)","我的专家",]
      MySessionRequestTxt = ['My Session Request','मेरा सत्र अनुरोध',"Mi sesión Solicitud","Mijn sessie Verzoek","Ma session Demande","เซสชันของฉัน คำขอ","جلستي   الطلب","我的会话 请求"]
      MyLearningRequestTxt = ['My Learning Request','मेरा सत्र अनुरोध',"Mi solicitud de aprendizaje","Mijn leerverzoek","Ma demanded'apprentissage","การเรียนรู้ของฉันคำขอ","طلب التعلم  الخاص بي","我的学习请求"]
      ViewAllTxt = ['View All','सभी को देखें',"Ver todo","Bekijk alles","Voir tout","ดูทั้งหมด","مشاهدة الكل","'查看全部"]
      WelcometoMavenow=['Welcome to Mavenow',"मेवेनोव में आपका स्वागत है","Bienvenida a mavenow","Welkom bij Mavenow","Bienvenue à Mavenow","ยินดีต้อนรับสู่มาเวนาว","  مخضرمยินดีต้อนรับสู่มาเวนาว","马夫诺"]
  FreeUpskillingCoursesTxt = ['Free Upskilling Courses','फ्री अपस्किलिंग कोर्स',"Cursos de actualización gratuitos","Gratis bijscholingscursussen","Cours de perfectionnement gratuits","หลักสูตรเพิ่มทักษะฟรี","دورات مجانية لتحسين ","免费技能提升课程" ]
  ExpertTalkTxt = ['Expert Talk','विशेषज्ञ वार्ता',"Charla de expertos","Deskundig gesprek","Discussion d'expert","การพูดคุยของผู้เชี่ยวชาญ","حديث الخبراء","专家讲座"]
  AskAnythingTxt = ['Ask Anything','कुछ भी पूछें','Pregunta cualquier cosa','Vraag iets'," Demandez n'importe quoi",'ถามอะไรก็ได้','اسأل أي شيء','随便问']
  Hi=["Hi","नमस्ते","Hola","Hoi","Salut","สวัสดี","أهلاً","你好"]
  GoodtoseeyouMaven =['Good to see you Maven','तुम्हें देखकर अच्छा लगा मावेन','Content de te voir maven','Qué bueno verte experto','Goed je te zien, maven','ดีใจที่ได้พบคุณมาเวน','من الجيد رؤيتك مخضرم','很高兴见到你，行家']
  Calender=['Calender','पंचांग','Calendario','Kalender','Calendrier','ปฏิทิน','تقويم','日历']
  Webringmost=['We bring most valuable upskilling courses free of cost to give an edge to your career.Start learning today!','हम आपके करियर को बढ़त देने के लिए सबसे मूल्यवान अपस्किलिंग कोर्स निःशुल्क लाते हैं। आज ही सीखना शुरू करें!','Brindamos los cursos de mejora de habilidades más valiosos sin costo para darle una ventaja a su carrera. ¡Comience a aprender hoy!','We bieden gratis de meest waardevolle bijscholingscursussen om uw carrière een voorsprong te geven. Begin vandaag nog met leren!','Nous proposons gratuitement les cours de perfectionnement les plus précieux pour donner un avantage à votre carrière. Commencez à apprendre dès aujourdhui !','เรานำเสนอหลักสูตรยกระดับทักษะที่มีค่าที่สุดโดยไม่เสียค่าใช้จ่ายเพื่อให้คุณได้เปรียบในอาชีพการงานของคุณ เริ่มเรียนรู้วันนี้!','نقدم دورات تحسين المهارات الأكثر قيمة مجانًا لإضفاء ميزة على حياتك المهنية. ابدأ التعلم ','我们免费提供最有价值的技能提升课程，为您的职业生涯增添优势。立即开始学习']

  CheckyourSchedulehere=['Check your Schedule here','अपना अनुसूची यहां देखें','Consulta tu horario aquí','Schema','Calendrier','กำหนดการ','جدول','日程']
  ChatwithyourMaven=['Chat with your Maven or Learner here You can also check your previous conversation and unread message','यहां अपने मेवेन या लर्नर के साथ चैट करें आप अपनी पिछली बातचीत और अपठित संदेश भी देख सकते हैं','Chatea con tu Experto o Aprendiz aquí También puedes revisar tu conversación anterior y el mensaje no leído','Chat hier met je Maven of Learner Je kunt ook je vorige gesprek en ongelezen bericht controleren','DiscutezavecvotreMavenorLearnericiVouspouvezégalementvérifiervotreconversationprécédenteetvotremessagenonlu','แชทกับ Mavenor Learner ของคุณที่นี่ คุณยังสามารถตรวจสอบการสนทนาก่อนหน้าและข้อความที่ยังไม่ได้อ่าน','الدردشة مع مافينور المتعلم ','在此处与您的专家或学习者聊天您还可以查看您之前的对话和未读消息']
  Yourappassistancetoprovideyouasmoothexperience=['Your app assistance to provide you a smooth experience','आपको सहज अनुभव प्रदान करने के लिए आपकी सहायता','La asistencia de su aplicación para brindarle una experiencia fluida','Uw hulp om u een vlotte ervaring te bieden','Lassistance de votre application pour vous offrir une expérience fluide','ความรวดเร็วของคุณมอบประสบการณ์ที่ราบรื่นให้กับคุณ','أنت من يعاينك أنت وخبراتك','您的应用程序为您提供流畅的体验']    
  Getinstantnotificationabouteachactivityhere=[' Get instant notification about each activity here','यहां प्रत्येक गतिविधि के बारे में तत्काल सूचना प्राप्त करें','Obtenga una notificación instantánea sobre cada actividad aquí','Ontvang hier direct een melding over elke activiteit','Recevez une notification instantanée sur chaque activité ici','รับการแจ้งเตือนทันทีเกี่ยวกับแต่ละกิจกรรมที่นี่','احصل على إخطار فوري','在此处获取有关每项活动的即时通知']
  Findthelistofallmylearningyouhaverequested=['Find the list of all my learning you have requested','आपके द्वारा अनुरोधित मेरे सभी सीखने की सूची प्राप्त करें','Encuentra la lista de todos mis aprendizajes que has solicitado','Zoek de lijst met al mijn leermateriaal dat u hebt opgevraagd','Retrouvez la liste de tous mes apprentissages que vous avez demandés','ค้นหารายการการเรียนรู้ทั้งหมดของฉันที่คุณร้องขอ','ابحث عن قائمة بكل ما طلبته','查找您要求的所有我的学习列表']
  MySessionRequest=['My Session Request','मेरा सत्र अनुरोध','Mi solicitud de sesión','Mijn sessieverzoek','Ma demande de session','คำขอเซสชันของฉัน','طلب الجلسة الخاصة بي','我的会话请求']
  Findthelistofcurrentandpreviouslearners=['Find the list of current and previous learners','वर्तमान और पिछले शिक्षार्थियों की सूची प्राप्त करें','Encuentre la lista de alumnos actuales y anteriores','Vind de lijst met huidige en vorige leerlingen','Retrouvezlalistedesapprenantsactuelsetprécédents','ค้นหารายชื่อผู้เรียนในปัจจุบันและก่อนหน้า','البحث عن المتعلمين الحاليين','查找当前和以前的学习者列表']
  Coursename=['Course name','कोर्स का नाम','Nombre del curso','Cursus naam','Nom du cours','ชื่อหลักสูตร','اسم الدورة التدريبية','课程名']
  // ***************************************************************************************** My Maven Profile Screen ********************************************************************************************
      MavenProfileTxt = ['My Maven Profile','मेरा मेवेन प्रोफाइल','Mi perfil experto',"Mijn Maven-profiel","Mon profil Maven","โปรไฟล์  มาเวน ของฉัน","ملفي الشخصي مافن","我的 行家 配置文件"]
      LearnerProfileTxt = ['My Learner Profile','मेरा शिक्षार्थी प्रोफ़ाइल',"Mi perfil de estudiante","Mijn leerlingprofiel","Mon profil d'apprenant","โปรไฟล์ผู้เรียนของฉัน","ملف المتعلم الخاص بي","我的学习者档案"]
      JoinDateTxt = ['Join Date : ','शामिल होने की तारीख : ',"Fecha de Ingreso","Lid worden van de datum","Date d'inscription","วันที่เข้าร่วม","تاريخ الانضمام","加入日期"]
      AchievementTxt = ['Achievement','उपलब्धि',"Logro","Prestatie","Réalisation","ความสำเร็จ","إنجاز","成就"]
      SessionCompletedTxt = ['Session Completed','सत्र पूरा हुआ',"Sesión completada","Sessie voltooid","Séance terminée","ซสชันเสร็จสมบูรณ์","اكتملت الجلسة","会话完成"]
      ActiveSessionTxt = ['Active Session','सक्रिय सत्र',"Sesión activa","Actieve sessie","Session active","เซสชันที่ใช้งานอยู่","جلسة نشطة","活动会话"]
      LearnersTxt = ['Learners','शिक्षार्थियों',"Estudiantes","Leerders","Apprenants","ผู้เรียน","المتعلمين","学习者"]
      MavensTxt = ['Mavens','विशेषज्ञ',"Mavens","Mavens","Mavens","มาเวนส์","مخضرم","达人"]
      aboutyourselfTxt = ['write something about yourself','अपने बारे में कुछ लिखो',"escribe algo sobre ti","Schrijf iets over jezelf","écris quelque chose à propos de toi","เขียนบางอย่างเกี่ยวกับตัวคุณเอง","أكتب شيئا عن نفسك","写一些关于你自己的事"]
      SkillsTxt = ['Skills','कौशल',"Habilidades","Vaardigheden","Compétences","ทักษะ","مهارات","技能"]
      seemoreTxt = ['see more','और देखें',"ver más","Bekijk meer","voir plus","ดูเพิ่มเติม","شاهد المزيد","查看更多"]
      RatingReviewTxt = ['Rating & Review','रेटिंग और समीक्षा',"Calificación y revisión","Beoordeling & recensie","Évaluation et avis","คะแนนและรีวิว","التقييم والمراجعة"," 评级与评论"]
      AboutMeTxt = ['About Me','मेरे बारे मेँ',"Acerca de mí","Over mij","Sur moi","'เกี่ยวกับฉัน","ْعَنِّي"," 关于我"]
      OverallRatingTxt = ['Overall Rating','समग्र रेटिंग',"Calificación general","Algemene beoordeling","Note globale","คะแนนรวม","تقييم عام","总体评价"]
      ClassNameTxt = ['Class Name','कक्षा का नाम',"Nombre de la clase","Naam van de klasse","Nom du cours","ชื่อชั้น","اسم الفصل","技能"," 班级名称"]
      SkillssTxt = ['Skills','कौशल',"Habilidades","Vaardigheden","Compétences","ทักษะ","مهارات"]
      StartDateTxt = ['Start Date','आरंभ तिथि',"Fecha inicio","Begin datum","Date début","วันที่เริ่มต้น","تاريخ البدء","开始日期"]
      EndDateTxt = ['End Date','अंतिम तिथि',"Fecha final","Einddatum","Date de fin","วันที่สิ้นสุด","تاريخ الانتهاء","结束日期"]
      AboutTxt = ['About','के बारे में',"Acerca de","Over","À propos","เกี่ยวกับ","عن"," 关于"]
      joiningDateTxt = ['joining Date','में शामिल होने की तारीख',"dia de ingreso","toetredingsdatum","date d'inscription","วันที่เข้าร่วม","تاريخ الانضمام","入职日期"]
      CompletedsesssionTxt = ['Completed sesssion','पूर्ण सत्र',"sesión completada","Voltooide sessie","Session terminée","เซสชันเสร็จสมบูรณ์","انتهت الجلسة","完成会话"]
      shareprofileTxt = ['This will share your Mavenow profile.','यह आपकी मावेनो प्रोफ़ाइल साझा करेगा।',"Esto compartirá tu perfil de Mavenow","Hiermee wordt uw Mavenow-profiel gedeeld","Cela partagera votre profil Mavenow","สิ่งนี้จะแชร์โปรไฟล์ มาเวนาว ของคุณ","سيؤدي هذا إلى مشاركة ملف ","这将分享您的 马夫诺 个人资料"]
      CancelTxt = ['Cancel','रद्द करे',"Cancelar","Annuleren","Annuler","ยกเลิก","يلغي"," 取消"]
      ShareTxt = ['Share','साझा करे',"Compartir","Deel","Partager","แบ่งปัน","يشارك","分享"]
      EditTxt = ['Edit','संपादन करे','Editar','Bewerking','Modifier','แก้ไข','يحرر','编辑']
      WanttoreportTxt = ['Are you sure Want to report?','क्या आप निश्चित रूप से रिपोर्ट करना चाहते हैं?','Estas segura quieres reportar','Weet je het zeker Wil je melden','Êtes-vous sûr de vouloir signaler','คุณแน่ใจหรือไม่ ต้องการรายงาน','هل أنت متأكد من أنك تريد الإبلاغ','您确定要举报吗']

        // *****************************************************************************************Maven Update Profile Screen ********************************************************************************************

        UpdateMavenTxt = ['Update Maven Profile','विशेषज्ञ प्रोफाइल अपडेट करें',"Actualizar perfil de Maven","Maven-profiel bijwerken","Mettre à jour le profil Maven","อัปเดตโปรไฟล์ มาเวน","مخضرمتحديث ملف","更新 行家 配置文件"]
        UpdateLearnerTxt = ['Update Learner Profile','विद्यार्थी प्रोफाइल अपडेट करें',"Actualizar perfil de alumno","Update leerlingprofiel","Mettre à jour le profil de l'apprenant","อัปเดตโปรไฟล์ผู้เรียน","تحديث ملف المتعلم","更新学习者档案"]
        FullNameTxt = ['Full Name*','पूरा नाम*',"'Nombre completo*","Voor-en achternaam*","Nom et prénom*","ชื่อเต็ม*","*الاسم الكامل","全名*"]
        EmailTxt = ['Email*','ईमेल*',"Correo electrónico*","E-mail*","E-mail*","อีเมล*","*بريد إلكتروني","电子邮件*"]
        datebirthTxt = ['Date of birth*','जन्मदिन*',"Fecha de nacimiento*","Geboortedatum*","Date de naissance*","วันเกิด*","تاريخ الميلاد*","出生日期*"]
        GenderTxt = ['Gender','लिंग',"Género","Geslacht","Genre","เพศ","جنس","性别"]
        MaleTxt = ['Male','पुरुष',"Masculina","Mannelijk","Femelle","ชาย","ذكر","男性"]
        FemaleTxt = ['Female','महिला',"Femenina","Vrouwelijk","Femme","หญิง","أنثى","女性"]
        videolinkTxt = ['Profile youtube video link','प्रोफ़ाइल यूट्यूब वीडियो लिंक',"Perfil de enlace de vídeo de youtube","Profiel youtube videolink","Lien vidéo du profil youtube","ลิงค์วิดีโอโปรไฟล์ยูทูบ","رابط الملف الشخصي يوتيوب","个人资料一个互联网视频共享网站视频链接"]
        Update =['Update',"अद्यतन","Actualizar","Update","Mise à jour","อัปเดต","تحديث","更新"]
        LETSTALK =['Lets Talk About Your Expert Area',"अपने विशेषज्ञ क्षेत्र के बारे में बात करते हैं","HABLEMOS DE TU ÁREA DE EXPERTO","LATEN WE PRATEN OVER UW EXPERTGEBIED","PARLONS DE VOTRE ESPACE EXPERT","มาพูดคุยเกี่ยวกับพื้นที่ผู้เชี่ยวชาญของคุณกันเถอะ","لنتحدث عن منطقة الخبراء","让我们谈谈您的专业领域"]
        AboutUS =['AboutUS',"हमारे बारे में",'Sobre nosotros','Over ons','À propos de nous',"เกี่ยวกับเรา",'معلومات عنا','关于我们']
          // ***************************************************************************************** My Learner Screen ********************************************************************************************
          MyMavenTxt = ['My Maven(s)','मेरे विशेषज्ञ',"Mi(s) experto(s)","Mijn meester(s)","Mes Maven(s)","แมเวน ของฉัน","مخضرم","行家"]
          DataNotFoundTxt = ['Data Not Found','डेटा नहीं मिला','Datos no encontrados','data niet gevonden','données introuvables','ไม่พบข้อมูล','لم يتم العثور على بيانات','未找到数据']
          CurrentLearnerTxt = ['Current Learner(s)','वर्तमान शिक्षार्थी',"Estudiante(s) actual(es)","Huidige leerling(en)","Apprenant(s) actuel(s)","ผู้เรียนปัจจุบัน","المتعلم (المتعلمون) الحاليون","当前学习者"]
          CurrentMavenTxt = ['Current Maven(s)','वर्तमान विशेषज्ञ',"Expertos actuales","Huidige Maven(s)","Maven(s) actuel(s)","แมเวน ปัจจุบัน","المخضرمين الحاليين","当前专家"]
          OldLearnerTxt = ['Old Learner(s)','पुराना शिक्षार्थी',"Antiguos Aprendices","oud leerling(en)","Ancien(s) apprenant(s)","ผู้เรียนเก่า","المتعلمون القدامى"," 老学员"]
          OldMavenTxt = ['Old Maven(s)','पुराने विशेषज्ञ',"Vieja cuervo (s)","oude meester(s)","Vieux Maven(s)","แมเวน เก่า","قديم المخضرم","老专家"]
          notMavenTxt = [' not have current expert.','वर्तमान विशेषज्ञ नहीं है',"No tengo experto actual.","geen actuele deskundige.","pas d'expert actuel.","ไม่มีผู้เชี่ยวชาญในปัจจุบัน","ليس لديك خبير حالي.","没有当前的专家"]
          FeeTxt = [' Fee','शुल्क',"Tarifa","Tarief","Frais","ค่าธรรมเนียม","مصاريف","费用"]
          PaymentStatusTxt = ['Payment Status','भुगतान स्थिति',"Estado de pago","Betalingsstatus","Statut paiement","สถานะการชำระเงิน","حالة السداد"," 支付状态"]
          search = ['search','खोज','buscar','zoekopdracht','recherche','ค้นหา','يبحث','搜索']
          DetailsTxt = ['Details','विवरण','Detalles','Details','Détails','รายละเอียด','تفاصيل','细节']
          MyLearnerTxt = ['My Learner','मेरे शिक्षार्थी',"Mis alumnos","Mijn leerling(en)","Mes apprenants","ผู้เรียนของฉัน","متعلمي (ق)","我的学生"]
        // *****************************************************************************************Learner Details Screen ********************************************************************************************
        LearnerDetailsTxt = [" Learner's Details",'शिक्षार्थी का विवरण',"Detalles del alumno","Gegevens van de cursist","Détails de l'apprenant","รายละเอียดของผู้เรียน","تفاصيل المتعلم","学习者的详细信息"]
        MavenDetailsTxt = [" Maven's Details",'विशेषज्ञ का विवरण','Detalles del experto','Maven-details','Détails Maven','รายละเอียดมาเวน','تفاصيل المخضرم','梅文 详细信息']
        SessionAttendedTxt = ["Session Attended",'सत्र में भाग लिया',"Sesión a la que asistió","Sessie bijgewoond","Séance suivie","เข้าร่วมเซสชัน","حضر الجلسة","出席会议"]
        learnerskillTxt = ["As Learner Skill",'शिक्षार्थी कौशल के रूप में',"Como habilidad de aprendizaje","Als leervaardigheid","En tant que compétence d'apprentissage","เป็นทักษะของผู้เรียน","كمهارة متعلم","作为学习者技能"]
        MavenskillTxt = ["As Maven Skill",'विशेषज्ञ कौशल के रूप में',"Como habilidad Maven","Als Maven-vaardigheid","En tant que compétence Maven","เป็นทักษะ มาเวน","كمهارة مخضرم"," 作为 行家 技能   "]
        OkayTxt = ["Okay",'ठीक',"Bueno","Oké","D'accord","ตกลง","تمام","好的"]
        ChatTxt = ["Chat",'चैट',"Charlar","Chatten","Discuter","แชท","محادثة","聊天"]
        ReportTxt = ["Report",'रिपोर्ट करे',"Informe","Rapport","Rapport","รายงาน","تقرير","报告"]
        ReportedTxt = ["Reported",'रिपोर्ट किया',"Reportada","gerapporteerd","Signalée","รายงาน","ذكرت","举报了"]
        sureblockTxt = ["Are you sure you want to block",'क्या आप वाकई अवरोधित करना चाहते हैं',"¿Estás seguro de que quieres bloquear?","Weet je zeker dat je wilt blokkeren","Êtes-vous sûr de vouloir bloquer","คุณแน่ใจหรือไม่ว่าต้องการบล็อก","هل أنت متأكد أنك تريد منع","你确定要阻止吗"]
        YesTxt = ["Yes",'हाँ',"Sí","Ja","Oui","ใช่","نعم","是的"]
        NoTxt = ["No",'नहीं',"No","Nee","Non","เลขที่","لا","不"]
        Whatdoyouliketodo =['What do you like to do?','आप क्या करना चाहते हैं?','Qué te gusta hacer?','Wat doe je graag?','Quaimez-vous faire?','คุณชอบทำอะไร?','ماذا تريد ان تفعل','你有什么喜欢做的事?']
        Helpusunderstandwhatshappening=['Help us understand whats happening','क्या हो रहा है इसे समझने में हमारी मदद करें','Ayúdanos a entender lo que está pasando','Help ons te begrijpen wat er gebeurt','Aidez-nous à comprendre ce qui se passe','ช่วยให้เราเข้าใจว่าเกิดอะไรขึ้น','ساعدنا في فهم ما يحدث','帮助我们了解发生了什么']
        CANCELTxt = ["CANCEL",'रद्द करे',"CANCELAR","ANNULEREN","ANNULER","ยกเลิก","يلغي","取消"]
        Userisnotrelevant=['User is not relevant','उपयोगकर्ता प्रासंगिक नहीं है','La usuario no es relevante','Gebruiker is niet relevant','Lutilisateur nest pas pertinent',"ผู้ใช้ไม่เกี่ยวข้อง",'المستخدم غير ذي صلة','用户不相关']
        Userisnottrusted=['User is not trusted','उपयोगकर्ता विश्वसनीय नहीं है','La usuario no es de confianza','Gebruiker wordt niet vertrouwd','Lutilisateur nest pas digne de confiance','ผู้ใช้ไม่น่าเชื่อถือ','المستخدم غير موثوق به','用户不受信任']
        Usermightbeseemasabusive=['User might be seem as abusive','उपयोगकर्ता अपमानजनक लग सकता है','El usuario puede parecer abusivo','De gebruiker kan als beledigend overkomen','Lutilisateur peut sembler aussi abusif','ผู้ใช้อาจดูเหมือนไม่เหมาะสม','قد يبدو المستخدم مسيئًا','用户可能看起来像在辱骂']
        Badexperiencewiththisuser=['Bad experience with this user','इस उपयोगकर्ता के साथ बुरा अनुभव','Mala experiencia con este usuario','Slechte ervaring met deze gebruiker','Mauvaise expérience avec cet utilisateur','ประสบการณ์ที่ไม่ดีกับผู้ใช้รายนี้','تجربة سيئة مع هذا المستخدم','与该用户的糟糕体验']
        Other=['Other','अन्य','otra','ander','autre','อื่น','อื่น','其他']
        Alert=['Alert','चेतावनी','Alerta','Alarm','Alerte','เตือน','يُحذًِر','警报']


  // ***************************************************************************************** AutomationTesingScreen *****************************************************************************************

  SessionDurationTxt = ["Session Duration",'कक्षा अवधि',"Duración de la sesión","Sessieduur","Durée de la session","ระยะเวลาเซสชัน","مدة الجلسة","会话持续时间"]
  StartSessionTxt = ["Start Session",'कक्षा प्रारंभ करें',"Iniciar sesión","Sessie starten","Démarrer la session","เริ่มเซสชัน","بدء الجلسة","开始会话"]
  EndSessionTxt = ["End Session",'अंत वर्ग',"Finalizar sesión","Sessie beëindigen","Terminer la session","จบเซสชัน","جلسة نهاية"," 结束会话"]
  LearnerReviewsTxt = ["Learner Reviews",'विद्यार्थी टिप्पणियाँ',"Reseñas de estudiantes","Recensies van cursisten","Avis des apprenants","รีวิวผู้เรียน","مراجعات المتعلم","学习者评论"]
  FeedbackTxt = ["(Feedback)",'(प्रतिपुष्टि)',"Comentario","Feedback","Retour","ข้อเสนอแนะ","تعليق","反馈"]
  BatchTime=['Batch Time','कक्षा समय','temps de lot','batch tijd','tiempo de lote','เวลาแบทช์','وقت الدفعة','批处理时间']
    // ***************************************************************************************** Session Request Screen *****************************************************************************************
    SessionRequestTxt = ["Session Request",'मेरा सत्र अनुरोध',"solicitud de sesión","sessie verzoek","demande de séance",'คำขอเซสชัน','طلب الجلسة','会话请求']
    LearningRequestTxt = ["Learning Request",'मेरा सत्र अनुरोध',"Solicitud de aprendizaje","Leer verzoek","Demande d'apprentissage",'คำขอการเรียนรู้','طلب التعلم','学习要求']
    ActiveTxt = ["Active",'सक्रिय',"Activa","Actief","Active","คล่องแคล่ว","نشيط","积极的"]
    ScheduledTxt = ["Scheduled",'अनुसूचित',"Programada","Gepland","Programmé","กำหนดการ","المقرر","已预定"]
    CompletedTxt = ["Completed",'हो गया',"Terminada","Voltooid","Complété","สมบูรณ์","مكتمل","完全的"]
    RequestTxt = ["Request :",'अनुरोध करे',"Pedido","Verzoek","Demande","ขอ","طلب","要求"]
    LevelTxt = ["Level ",'स्तर',"Nivel","Niveau","Niveau","ระดับ","مستوى","等级"]
    EditDetailsTxt = ["Edit Details", 'विवरण संपादित करें','Editar detalles','Details bewerken','Modifier les détails','แก้ไขรายละเอียด','عدل التفاصيل','编辑详细信息']
    PostdateTxt = ["Post date",'पोस्ट की तारीख',"fecha Correo","Post-datum","Poste Date","วันที่โพสต์","تاريخ آخر","发布日期"]
    RsTxt = ["Rs",'रु',"$","Rs","Rs","อาร์เอส","روبية","卢比"]
    SearchEngine = ['SearchEngine','खोज इंजन','Buscador','Zoekmachine','Moteur de recherche','เครื่องมือค้นหา','محرك البحث','搜索引擎']
    Nodatafound =['No data found','डाटा प्राप्त नहीं हुआ','Datos no encontrados','Geen data gevonden','Aucune donnée disponible','ไม่พบข้อมูล','لاتوجد بيانات','没有找到数据']
    
    


    // ***************************************************************************************** Custem Drawer Screen *****************************************************************************************

    WelcomeLearnerTxt = ["Welcome Learner",'स्वागत है शिक्षार्थी ',"Bienvenido estudiante","Welkom leerling","Bienvenue à l'apprenant","ยินดีต้อนรับ เรียน","مرحبًا بالمتعلم","欢迎学习者"]
    WelcomeMavenTxt = ["Welcome Maven",'स्वागत है विशेषज्ञ',"Bienvenida maven","Welkom Maven","Bienvenue Maven","ยินดีต้อนรับคุณมาเวน","مرحبًا بك مخضرم","欢迎 行家"]
    LearnerModeTxt = ["Learner Mode",'शिक्षार्थी मोड',"Modo de aprendizaje","Leermodus","Mode apprenant","โหมดผู้เรียน","وضع المتعلم","学习模式"]
    MavenModeTxt = ["Maven Mode",'विशेषज्ञ मोड',"Modo experto","Maven-modus","Mode expert","โหมดมาเวน","وضع المخضرم","专家模式"]
    AvailableTeachTxt = ["Available for Teach",'पढ़ाने के लिए तैयार',"Disponible para enseñar","Beschikbaar voor leren","Disponible pour enseigner","มีให้สอน","متاح للتعليم","可用于教学"]
    HomeTxt = ["Home",'होम',"Hogar","Thuis","Maison","บ้าน","بيت","家"]
    RequestTxt = ["Request",'अनुरोध',"Pedido","Verzoek","Demande","ขอ","طلب","要求"]
    ChatTxt = ["Chat",'चैट',"Charlar","Chatten","Discuter","แชท","محادثة","聊天"]
    NotificationTxt = ["Notification",'अधिसूचना',"Notificación","Kennisgeving","Notification","การแจ้งเตือน","إشعار","通知"]
    WalletTxt = ["Wallet",'वॉलेट',"Billetera","Portemonnee","Portefeuille","กระเป๋าสตางค์","محفظة","钱包"]
    RefundTxt = ["Refund",'धनवापसी',"Reembolso","Terugbetaling","Remboursement","คืนเงิน","استرداد","退款"]
    RefundHeaderTxt = ["Refund",'धनवापसी',"Reembolso","Terugbetaling","Remboursement","คืนเงิน","استرداد","退款"]
    HelpTxt = ["Help",'सहायता',"Ayuda","Hulp","Aider","ช่วย","يساعد"," 帮助"]
    HistoryTxt = ["History",'इतिहास',"Historia","Geschiedenis","Histoire","ประวัติศาสตร์","تاريخ","历史"]
    FeedbackTxt = ["Feedback",'फीडबैक',"Comentario","Feedback","Retour","ข้อเสนอแนะ","تعليق","反馈"]
    LanguageTxt = ["Language",'भाषा',"Idioma","Taal","Langue","ภาษา","لغة","语言"]
    LogoutTxt = ["Logout",'लॉग आउट करे',"Cerrar sesión","Uitloggen","Se déconnecter","ออกจากระบบ","تسجيل خروج","登出"]
    sureLogoutTxt = ["Are you sure want to logout ?",'क्या आप वाकई लॉगआउट करना चाहते हैं?',"¿Estás segura de que quieres cerrar sesión?","Weet u zeker dat u wilt uitloggen?","Voulez-vous vraiment vous déconnecter ?","คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ ?","هل أنت متأكد من أنك تريد ","您确定要注销吗？"]
    // Solutions = ['SolutionsforAnyplightsMavenowsGotYourBackAlright!inmesekoisahinhibethrhah?','','','','','','','']
        // ***************************************************************************************** Wallet Screen *****************************************************************************************
    AvailableBalanceTxt = ["Total Available Balance",'कुल उपलब्ध शेष राशि',"Saldo total disponible","Totaal beschikbaar saldo","Solde total disponible","ยอดคงเหลือที่มีอยู่ทั้งหมด","إجمالي الرصيد المتاح","总可用余额"]
    withdrawableAmounTxt = ["Total withdrawable Amount",'कुल निकासी राशि',"Monto total a retirar","Totaal opneembaar bedrag","Montant total retirable","จำนวนเงินที่ถอนได้ทั้งหมด","إجمالي المبلغ القابل للسحب","总提款额"]
    FundsprogressTxt = ["Withdrawable Funds progress",'निकासी योग्य धन प्रगति',"Progreso de los Fondos Retirables","Opneembare fondsen voortgang","Avancement des fonds retirables","ความคืบหน้าของกองทุนที่ถอนได้","تقدم الأموال القابلة للسحب","可提取资金进度"]
    AllStudentTxt = ["All Student",'सभी छात्र',"Toda estudiante","Alle studenten","Tout Étudiant","นักเรียนทุกคน","كل الطلاب","所有学生"]
    ChargesTxt = ["Charges",'शुल्क',"Cargos","kosten","Des charges","ค่าใช้จ่าย","رسوم","收费"]
    YourEarningTxt = ["Your Earning",'आपकी कमाई*',"Su ganancia","Uw verdiensten","Votre gain*","รายได้ของคุณ*","أرباحك *","你的收入*"]
    PaidStudentsTxt = ["Paid Students",'भुगतान किए गए छात्र',"Estudiantes pagados","Betaalde studenten","Étudiants rémunérés","นักเรียนที่ชำระเงิน","الطلاب المدفوعين","付费学生"]
            // ***************************************************************************************** Help Screen *****************************************************************************************
    HelpFAQSTxt = ["Help/FAQ'S",'सहायता / अक्सर पूछे जाने वाले प्रश्न',"Ayuda/Preguntas Frecuentes","Hulp/Veelgestelde vragen",'Aide/FAQ','ความช่วยเหลือ/คำถามที่พบบ่อย','التعليمات / الأسئلة الشائعة','帮助/常见问题解答']
    ContactUsTxt = ["Contact Us",'हमसे संपर्क करे',"Contacta con nosotras","Neem contact met ons op",'Contactez-nous','ติดต่อเรา','اتصل بنا','联系我们']
    AboutMeTxt=['About Me','मेरे बारे मेँ',"Acerca de mí","Over mij","Sur moi","'เกี่ยวกับฉัน","ْعَنِّي"," 关于我"]
    About= ['About','के बारे में',"Acerca de","Over","À propos","เกี่ยวกับ","عن"," 关于"]
    Mavenow =['Mavenow','मेवेनोव','mavenow','Mavenow','Mavenow','มาเวนาว','مافينو','马文诺',]
    Howcanwehelp =['How can we help','हम कैसे मदद कर सकते हैं','Cómo podemos ayudar','Hoe kunnen we helpen','Comment pouvons nous aider','เราสามารถช่วยได้อย่างไร','كيف يمكن أن نساعد','我们能帮你什么吗']
    you=['you?','आप?','tú?','Jij?','toi?','คุณ?','أنت?','你?',]
                // ***************************************************************************************** History Screen *****************************************************************************************
    studentstatusTxt = ["Request From Learner",'छात्रों से अनुरोध','Solicitud del alumno','Verzoek van leerling',"Demande de l'apprenant",'คำขอจากผู้เรียน','طلب من المتعلم','学习者的请求']
    SelectDateTxt = ["Select Date",'एक तिथि चुने','Seleccione fecha','Selecteer een datum',"Sélectionner une date",'เลือกวันที่','حدد تاريخ','选择日期']
    OkTxt = ["Ok",'ठीक है','De acuerdo','OK',"D'accord",'ตกลง','نعم','好的']
    DONETxt = ["DONE",'हो गया','Hecho','Klaar','Fait','เสร็จแล้ว','منتهي','完毕']
                    // ***************************************************************************************** My Schedule Screen *****************************************************************************************
    MyScheduleTxt = ["My Schedule",'मेरी तालिका','Mi horario','Mijn planning','Mon emploi du temps','ตารางของฉัน','جدولي','我的日程表']
    SessionTxt = ["Session",'मीटिंग','Sesión','Sessie','Session','การประชุม','حصة','会议']
    followersTxt= ['followers','अनुयायियों','seguidoras','volgers','suiveuses','ผู้ติดตาม','متابعون','追随者']
    LearnerRequestTxt= ['Learner Request','शिक्षार्थी अनुरोध','Solicitud de alumno','Aanvraag leerling',"Demande de l'apprenant",'คำขอของผู้เรียน','طلب المتعلم','学习者请求']
    PostingdateTxt =['Posting date','पोस्ट करने की तारीख','Fecha publicación','Postdatum', "Date d'affichage",'วันที่โพสต์','تاريخ النشر','发布日期']
    CategoryTxt = ['Category','वर्ग','Categoría','Categorie','Catégorie','หมวดหมู่','فئة','类别']
    wantlearnTxt = ['I want to learn','मैं सीखना चाहता हूँ','quiero aprender','Ik wil leren','je veux apprendre','ฉันต้องการที่จะเรียนรู้','اريد ان اتعلم','我想学习']
    MavenSuggestiontxt =['Maven Suggestion For Profile','प्रोफ़ाइल के लिए मावेन सुझाव','Sugerencia de Maven para el perfil','Suggestion Maven pour le profil',
    'Sugerencia de Maven para el perfil','ข้อเสนอแนะ Maven สำหรับโปรไฟล์','اقتراح Maven للملف ','Maven 对配置文件的建议']
                        // ***************************************************************************************** Automation Testing Screen *****************************************************************************************
    AutomationTestingTxt = ['Automation Testing','स्वचालन परीक्षण','Pruebas de automatización','Automatisering testen',"Tests d'automatisation",'การทดสอบระบบอัตโนมัติ','اختبار الأتمتة','自动化测试']
    DateTxt = ["Date",'तिथि','Fecha','Datum','Date','วันที่','تاريخ','日期']
    StartTimeTxt = ["Start Time",'प्रारंभ समय','Hora de inicio','Starttijd','Heure début','เวลาเริ่มต้น','وقت البدء','开始时间']
    EndTimeTxt = ["End Time",'समाप्ति समय','Hora de finalización','Eindtijd','Heure de fin','เวลาสิ้นสุด','وقت النهاية','时间结束']
    LearnerListTxt = ["Learner's List",'छात्रों की सूची','Lista de alumnos','Lijst van de leerling','Liste des apprenants','รายชื่อผู้เรียน','قائمة المتعلم','学习者名单']
    RescheduleSessionTxt = ["Reschedule Session",'पुनर्निर्धारित सत्र','Reprogramar sesión','Sessie opnieuw plannen','Reprogrammer la session','กำหนดเซสชันใหม่','إعادة جدولة الجلسة','重新安排会议']
    RescheduleClassTxt = ["Reschedule Class",'पुनर्निर्धारित कक्षा','Reprogramar Clase','Klasse opnieuw plannen','Reprogrammer la classe','ตารางเรียนใหม่','إعادة جدولة الفصل','重新安排课程']
    UpskillingCoursesTxt = ["Upskilling Courses",'अपस्किलिंग कोर्स','Cursos de perfeccionamiento','Bijscholingscursussen','Cours de perfectionnement','หลักสูตรเพิ่มทักษะ','دورات تحسين المهارات','技能提升课程']
    Description=['Description','विवरण','Descripción','Beschrijving','Description','คำอธิบาย','وصف','描述']    
    ReasonTxt=['Reason','कारण','razón','reden','raison','เหตุผล','سبب','原因']    
    Thiscourseincludes =['This course includes','इस कोर्स में शामिल है','Este curso incluye','Deze cursus is inclusief','Ce cours comprend','หลักสูตรนี้ประกอบด้วย','يشمل هذا المقرر','本课程包括']
    // ***************************************************************************************** Session Request Basic Screen *****************************************************************************************
   DurationTxt = ["Duration in min",'अवधि मिनट में','Duración en minutos','Duur in min','Durée en minutes','ระยะเวลาเป็นนาที','المدة بالدقيقة','持续时间（分钟）']
   SessionTimeTxt = ["Session Time",'अवधि','Tiempo sesión','Sessie tijd','Temps session','เวลาเซสชัน','وقت الجلسة','会话时间']
   sessionincludesTxt = ["This session includes",'इस सत्र में शामिल हैं','Esta sesión incluye','Deze sessie is inclusief','Cette séance comprend','เซสชันนี้ประกอบด้วย','تتضمن هذه الجلسة','本届会议包括']
   ApplyTillTxt = ["Apply Till",'आवेदन करें','Aplicar hasta','Solliciteer tot',"Appliquer jusqu'à",'สมัครจนถึง','تطبيق حتى','申请至']
   AppliedMavenTxt = ["Applied Maven",'अनुप्रयुक्त विशेषज्ञ','Experto aplicado','Toegepaste Maven','Appliqué Maven','ใช้ Maven','تطبيق المخضرم','应用专家']
   AcceptTxt = ["Accept",'स्वीकार ','Aceptar','Aanvaarden','Accepter','ยอมรับ','يقبل','接受']
   RejectTxt = ["Reject",'अस्वीकार','Rechazar','Afwijzen','Rejeter','ปฏิเสธ','يرفض','拒绝']
   AcceptedTxt = ["Accepted",'स्वीकार किया','Aceptada','Geaccepteerd','Accepté','ได้รับการยอมรับ','قبلت','公认']
   AppliedlearnerTxt = ['Applied learners','अनुप्रयुक्त शिक्षार्थी', 'Estudiantes aplicados','Toegepaste leerlingen','Apprenants appliqués','ผู้เรียนประยุกต์','المتعلمين التطبيقيين','应用型学习者']
   RequestDateTxt = ['Request Date', 'अनुरोध की तिथि','Fecha de solicitud','Datum van aanvraag','Date de la demande','วันที่ขอ','تاريخ الطلب','查询日期']
   SCHEDULESESSIONTxt = ["SCHEDULE SESSION",'अनुसूची सत्र','PROGRAMAR SESIÓN','SCHEMA SESSIE','PLANIFIER LA SÉANCE','เซสชันตาราง','موعد الجلسة','安排会议']
   OtherApplicantsTxt = ["Other Applicants",'अन्य आवेदक','Otras Solicitantes','Andere aanvragers','Autres candidats','ผู้สมัครอื่น ๆ','المتقدمون الآخرون','其他申请人']
   CreateSessionTxt = ["Create Session:",'सत्र बनाएँ:','Crear Sesión:','Sessie maken:','Créer une session :','สร้างเซสชัน:','إنشاء جلسة:','创建会话']
   CourseDurationTxt = ["Course Duration (in Minut)",'पाठ्यक्रम की अवधि (मिनट में)','Duración del curso (en minutos)','Cursusduur (in minuten)','Durée du cours (en minutes)','ระยะเวลาของหลักสูตร (เป็นนาที)','مدة الدورة (دقيقة)','课程时长（分钟）']
   SelectallTxt = ["Selectall",'सबका चयन करें','Seleccionar todo','Selecteer alles','Tout sélectionner','เลือกทั้งหมด','اختر الكل','全选']
   DeselectTxt = ["Deselect",'अचयनित','Deseleccionar','Deselecteren','Désélectionner','ยกเลิกการเลือก','إلغاء','取消选择']
   SubmitTxt = ["Submit",'जमा करे','Entregar','Indienen','Soumettre','ส่ง','يُقدِّم','提交']
   UserEarningTxt = ['User Earning','उपयोगकर्ता की कमाई','Ganancia del usuario','Gebruikers verdienen',"Gain d'utilisateur",'รายได้ของผู้ใช้','أرباح المستخدم','用户收益']
   Concernfeeper =['Concern fee per','चिंता शुल्क प्रति','tarifa de preocupación','Frais de préoccupation','Frais de préoccupation','ค่าความกังวล','رسوم القلق','关注费']
   Dance=['Dance','नृत्य','Danse','Bailar','Dans','เต้นรำ','الرقص','舞蹈']
   Applied=['Applied','लागू','Appliquée','Aplicada','Toegepast','สมัครแล้ว','مُطبَّق','应用']
   

                               // ***************************************************************************************** Add Course Screen *****************************************************************************************
   AddCourseTxt = ["Add Your Course",'अपना पाठ्यक्रम जोड़ें','Agrega tu curso','Voeg uw cursus toe','Ajoutez votre cours','เพิ่มหลักสูตรของคุณ','أضف دورتك','添加您的课程']
   EstimatedDurationTxt = ["Estimated Course Duration",'अनुमानित पाठ्यक्रम अवधि','Duración estimada del curso','Geschatte cursusduur','Durée estimée du cours','ระยะเวลาของหลักสูตรโดยประมาณ','المدة المقدرة للدورة','预计课程时长']
   SessionDurationnTxt = ["Session Duration",'सत्र की अवधि','Duración de la sesión','Sessieduur','Durée de la session','ระยะเวลาเซสชัน','مدة الجلسة','会话持续时间']
   freesessionTxt = ["You have 23 free session",'आपके पास 23 निःशुल्क सत्र हैं','Tienes 23 sesiones gratis','Je hebt 23 gratis sessies','Vous avez 23 séances gratuites','คุณมี 23 เซสชันฟรี','لديك 23 جلسة مجانية','您有 23 个免费会话']
   POSTTxt = ["POST",'पोस्ट करे','CORREO','NA','POSTE','โพสต์','بريد','邮政'] 
   YESTxt = ["YES",'हाँ','SÍ','JA','OUI','ใช่','نعم','是的']  
   NOTxt = ["NO",'नहीं','NO','NEE','NON','เลขที่','لا','不']
   CLOSETxt = ['CLOSE','बंद करे','CERCA','DICHTBIJ','FERMER','ปิด','يغلق','关闭']
   SelectLevelTxt = ["Select Level",'स्तर चुनें',"Selecciona el nivel","Kies een niveau","choisir Niveau","เลือกระดับ","اختار مستوى","选择级别"]
   CANCELTxt = ["CANCEL",'रद्द करे',"CANCELAR","ANNULEREN","ANNULER","ยกเลิก","يلغي","取消"]
   SUBMITTxt = ["SUBMIT",'जमा करे',"ENTREGAR","INDIENEN","SOUMETTRE","ส่ง","يُقدِّم","提交"]
   BasicTxt = ["Basic",' बेसिक्',"Básica","Eenvoudig","Basique","ขั้นพื้นฐาน","أساسي","基本的"]
   MediumTxt = ["Medium",' मध्यम',"Medio","Medium","Moyen","ปานกลาง","واسطة","中等的"]
   AdvanceTxt = ["Advance",' अग्रिम',"Avance","Voorschot","Avance","ก้าวหน้า","يتقدم","进步"]
   BadgesTxt = ["Badges",' बैज',"Insignias","Insignes","Insignes","ป้าย","شارات","徽章"]
   expertAreaTxt = ["Please let us know your expert Area :-",'कृपया हमें अपना विशेषज्ञ क्षेत्र बताएं : -',"Háganos saber su área de expertos : -","Laat ons uw expertisegebied weten : -","Veuillez nous indiquer votre domaine d'expertise :-","โปรดแจ้งให้เราทราบพื้นที่ผู้เชี่ยวชาญของคุณ :-","يرجى إعلامنا بمنطقة الخبراء الخاصة بك : -","请让我们知道您的专业领域 ：-"]
   RelatedKeywordTxt = ["Please Select Related Keyword About",'कृपया संबंधित कीवर्ड के बारे में चुनें',"Seleccione la palabra clave relacionada Acerca de","Selecteer Gerelateerd zoekwoord Over","Veuillez sélectionner un mot-clé associé","กรุณาเลือกคำค้นหาที่เกี่ยวข้อง เกี่ยวกับ   ","يرجى تحديد الكلمات الرئيسية ذات الصلة حول","请选择相关关键字 关于"]
   anyKeywordTxt = ["Please Select any Keyword.",'कृपया कोई भी कीवर्ड चुनें।',"Seleccione cualquier palabra clave.","Selecteer een trefwoord.","Veuillez sélectionner un mot-clé.","กรุณาเลือกคำหลักใด ๆ ","الرجاء تحديد أي كلمة رئيسية.","请选择任何关键字。"]
   ErrorTxt = ["Error",'गलती',"error","fout","erreur","ข้อผิดพลาด","خطأ","错误"]
   CommisionforchargeTxt = ["Commision 0% for next 30 course \nthen 10% should be charge per user",'अगले 30 कोर्स के लिए कमीशन 0% \nफिर प्रति उपयोगकर्ता 10% शुल्क लिया जाना चाहिए',"Comisión 0% para los próximos 30 cursos \nentonces se debe cobrar el 10% por usuario", "Commissie 0% voor de volgende 30 cursussen \nvervolgens moet 10% per gebruiker in rekening worden gebracht","Commission 0 % pour les 30 prochains cours \npuis 10 % devraient être facturés par utilisateur","ค่าคอมมิชชัน 0% สำหรับ 30 หลักสูตรถัดไป \nจากนั้น 10% ควรเรียกเก็บต่อผู้ใช้","العمولة 0٪ للدورة الثلاثين التالية \ n ثم يجب دفع 10٪ لكل مستخدم","接下来的 30 门课程佣金为 0% \n然后每个用户应收取 10%"]
   SuccessTxt = ['Success','सफलता','Éxito','Succes','Succès','ความสำเร็จ','نجاح','成功']
   TeachingsubmittedTxt = ['Your Teaching has been submitted successfully for admin approval.','आपका शिक्षण व्यवस्थापक अनुमोदन के लिए सफलतापूर्वक प्रस्तुत कर दिया गया है।','Su enseñanza se ha enviado con éxito para la aprobación del administrador.','Uw onderwijs is met succes ingediend voor goedkeuring door de beheerder.',"Votre enseignement a été soumis avec succès pour approbation par l'administrateur.",'ส่งการสอนของคุณเรียบร้อยแล้วเพื่อขออนุมัติจากผู้ดูแลระบบ',' تم إرسال تدريسك بنجاح لموافقة المسؤول.','您的教学已成功提交以供管理员批准。']
   ProfileTxt = ["Profile",'प्रोफ़ाइल',"perfil","profiel","profil","ประวัติโดยย่อ","حساب تعريفي","轮廓"]
   ContinueTxt = ["Continue",'जारी रखे',"Continuar","Doorgaan","Continuer","ดำเนินการต่อ","يكمل","继续"]
   CONTINUETxt = ["Continue",'जारी रखे',"CONTINUAR","DOORGAAN","CONTINUER","ดำเนินการต่อ","يكمل","继续"]
   ChatboatTxt = ["Chat boat",'चैटबॉट',"bot conversacional","Chatbot","Chatbot","แชทบอท","الشات بوت","聊天机器人"]
   WelcomeMavenowTxt = ["Welcome to Mavenow",'मेवेनोव में आपका स्वागत है',"Bienvenida a mavenow","Welkom bij Mavenow","Bienvenue à Mavenow","ยินดีต้อนรับสู่มาเวนาว"," مرحبًا بكم في Mavenow","欢迎来到 Mavenow"]
   solutionsoonTxt = ["Please post problem  below you , will get solution soon!",'कृपया अपने नीचे समस्या पोस्ट करें, जल्द ही समाधान मिलेगा!',"Publique el problema debajo de usted, ¡obtendremos una solución pronto!","Plaats alstublieft het probleem onder u, zal spoedig een oplossing krijgen!","Veuillez poster le problème ci-dessous, vous obtiendrez une solution bientôt !","กรุณาโพสต์ปัญหาด้านล่างคุณ จะได้รับการแก้ปัญหาเร็ว ๆ นี้!","يرجى نشر المشكلة أدناه ، وسوف تحصل على حل قريبًا!","请在您下方发布问题，我们会尽快解决！"]
//  ***************  Support **********************
    Supporttext  = ['Support','सहायता','Apoyo','Steun','Soutien','สนับสนุน','يدعم','支持']
    SUBMITtext =[' SUBMIT','जमा करे','ENTREGAR','INDIENEN','SOUMETTRE','ส่ง','يُقدِّم','提交',]
    // **********learnerlist************************
    LearnerList =['Learner List','शिक्षार्थी सूची','Lista de alumnos','LeerlingLijst','Liste des apprenants','รายชื่อผู้เรียน','قائمة المتعلم','学习者名单',]
    Yourearningperuser =['Your earning per user','प्रति उपयोगकर्ता आपकी कमाई','Votre gain par utilisateur','Uw verdiensten per gebruiker','Su ganancia por usuario','รายได้ของคุณต่อผู้ใช้','ربحك لكل مستخدم','您的每位用户收入']

    // ********************** Search *************************
    Search=['Search','खोज','buscar','zoekopdracht','recherche','ค้นหา','يبحث','搜索']
    LetsChat=["Let's Chat",'आओ बात करें','Charlemos','Laten we chatten','Parlons','มาคุยกัน','دعنا نتحدث','来聊聊吧']
    SearchMavenandSkills=['Search Maven and Skills','मावेन और कौशल खोजें','Buscar expertos y habilidades','Zoek Maven en vaardigheden','Recherche Maven et compétences','ค้นหา Maven และทักษะ','ابحث عن المخضرمين ','搜索 行家 和技能']
//  ********************************** MY Maven ********************************
OldMaven=['Old Maven(s)','पुराना maven','Viejo experto','Oude Maven','Vieux Maven','โอลด์มาเวน',"قديم المخضرم","老行家"]
CurrentMaven =['Current Maven(s)','वर्तमान मावेन','Experto actual','Huidige Maven','Maven actuel','มาเวนคนปัจจุบัน','المخضرم الحالي','']
// ************************* Expert area****************************
WelcometoMavenow=['Welcome to Mavenow',"मेवेनोव में आपका स्वागत है","Bienvenida a mavenow","Welkom bij Mavenow","Bienvenue à Mavenow","ยินดีต้อนรับสู่มาเวนาว","  مخضرمยินดีต้อนรับสู่มาเวนาว","马夫诺"]
Hi=["Hi","नमस्ते","Hola","Hoi","Salut","สวัสดี","أهلاً","你好"]
GoodtoseeYouMaven =['Good to see You Maven','मैवेन आपको देखकर अच्छा लगा','Es bueno verte Maven','Goed je te zien Maven','Content de te voir Maven','ดีใจที่ได้พบคุณ มาเวน','مخضرم','行家']
// ***********footer***************
Footerhome =['Menu','मेन्यू','Menú','Menu','Menu','เมนู','قائمة طعام','菜单']
chat =['Chat','बात करना','Charlar','Chatten','Discuter','แชท','محادثة','聊天']
Schedule =['Schedule','अनुसूची','Cronograma','Schema','Calendrier','กำหนดการ','جدول','日程']
Video =['Video','वीडियो','video','video','vidéo','vidéo','فيديو','视频']
info=['info','जानकारी','información','informatie','Info','ข้อมูล','معلومات','信息']
Badges=['Badges','बैज','Insignes',"Insignias","Insignes","ป้าย","شارات",'徽章']

                               // ***************************************************************************************** Create Syllabus Screen *****************************************************************************************
CreateSyllabusTxt=['Create Syllabus','पाठ्यक्रम बनाएं','Crear plan de estudios','Syllabus maken','Créer un programme','สร้างหลักสูตร','إنشاء منهج','创建教学大纲']
workingtitleTxt=['How about a working title','वर्किंग टाइटल के बारे में क्या ख्याल है','¿Qué tal un título provisional?','Wat dacht je van een werktitel',"Que diriez-vous d'un titre de travail",'ชื่อเรื่องการทำงานเป็นอย่างไร','ماذا عن عنوان العمل','工作头衔怎么样']
changelaterTxt=["it's ok if can't think of a good title now. You can change it later.",'यह ठीक है अगर अभी एक अच्छे शीर्षक के बारे में नहीं सोच सकते हैं। आप इसे बाद में बदल सकते हैं।','está bien si no puedo pensar en un buen título ahora. Puedes cambiarlo más tarde.','het is oké als je nu geen goede titel kunt bedenken. U kunt dit later wijzigen.',"ce n'est pas grave si je ne peux pas penser à un bon titre maintenant. Vous pouvez le changer plus tard.",'ไม่เป็นไรถ้าตอนนี้ยังคิดชื่อเรื่องไม่ออก คุณสามารถเปลี่ยนได้ในภายหลัง','لا بأس إذا كنت لا تستطيع التفكير في عنوان جيد الآن. يمكنك تغييره لاحقًا.','如果现在想不出一个好标题也没关系。您可以稍后更改它。']
titleTxt=["title",'शीर्षक','título','titel',"titre",'ชื่อ','عنوان','标题']
ShortDescriptionTxt=["Short Description",'संक्षिप्त वर्णन','Breve descripción','korte beschrijving',"brève description",'คำอธิบายสั้น','وصف قصير','简短的介绍']
EditProfile =['Edit Profile','प्रोफ़ाइल संपादित करें','Editer le profil','Editar perfil','Bewerk profiel','แก้ไขโปรไฟล์','تعديل الملف الشخصي','编辑个人资料']
Coursefeeperuser = ['Course fee per user.','प्रति उपयोगकर्ता पाठ्यक्रम शुल्क','Frais de cours par utilisateur','Cursusgeld per gebruiker','Precio del curso por usuario','ค่าเรียนต่อผู้ใช้','رسوم الدورة لكل مستخدم','每个用户的课程费用']

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Job List Screen ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
JobsTxt=['Jobs','नौकरियां','trabajos','banen','emplois','งาน','وظائف','工作']
JobListTxt=["Job List",'नौकरी सूची','lista de trabajo','werklijst',"Liste d'emplois",'รายการงาน','قائمة الوظائف','工作清单']
SearchJobTxt=["Search Job...",'नौकरी खोजें...','Buscar empleos...','Jobs zoeken...',"Recherche de travail...",'ค้นหางาน...','بحث وظائف...','搜索职位']
ApplyTxt=["Apply",'आवेदन करें','aplicar','toepassen','appliquer','นำมาใช้','يتقدم', '申请']
SearchotherJobsTxt=["Search Other Jobs",'अन्य नौकरियाँ खोजें','Buscar otros trabajos','Zoek andere banen',"Rechercher d'autres emplois",'ค้นหางานอื่น ๆ','ابحث عن وظائف أخرى','搜索其他职位']
JobSuccessfullyAppliedTxt=["Job Successfully Applied",'नौकरी के लिए सफलतापूर्वक आवेदन किया गया','Trabajo aplicado con éxito','Vacature succesvol toegepast','Emploi appliqué avec succès',
'สมัครงานสำเร็จ','تم تطبيق الوظيفة بنجاح','职位申请成功']
VideoRecordingTxt=["Video Recording",'वीडियो रिकॉर्डिंग','Grabación de vídeo','Video-opname','Enregistrement video','บันทึกวีดีโอ','تسجيل الفيديو', '视频录制']
ResumeTxt=["Resume",'संक्षिप्त विवरण','Reanudar','Cv','CV','ประวัติย่อ','سيرة ذاتية', '恢复']
UploadanewresumefileTxt=["Upload a new resume file",'एक नई बायोडाटा फ़ाइल अपलोड करें','Subir un nuevo archivo de currículum','Upload een nieuw cv-bestand','Télécharger un nouveau fichier CV',
'อัปโหลดไฟล์เรซูเม่ใหม่','قم بتحميل ملف سيرة ذاتية جديد', '上传新的简历文件']
LiveVideoRecordingTxt=['Live Video Recording Your Profile','आपकी प्रोफ़ाइल की लाइव वीडियो रिकॉर्डिंग','Grabación de video en vivo de su perfil','Live video-opname van uw profiel',
'Enregistrement vidéo en direct de votre profil','บันทึกวิดีโอสดโปรไฟล์ของคุณ','تسجيل فيديو مباشر لملف التعريف الخاص بك','实时视频记录您的个人资料']
SelectTxt=['Select','चुनें','Seleccionar','Selecteer','Sélectionner','เลือก','يختار','选择']
BacktoHome =['Back to Home','घर वापिस जा रहा हूँ','De retour à la maison',"'De retour à la maison',",'De vuelta a casa','กลับไปที่บ้าน','العودة إلى المنزل','回到家']
                               // ***************************************************************************************** Create Topic Screen *****************************************************************************************
CreateTopicTxt=["Create Topic",'विषय बनाएँ','Crear tema','Onderwerp maken',"Créer un sujet",'สร้างหัวข้อ','إنشاء موضوع','创建主题']
flutterTxt=["flutter",'स्पंदन','aleteo','fladderen',"battement",'กระพือ','رفرفة','扑']
flutterdescriptionTxt=["flutter description",'स्पंदन विवरण','descripción del aleteo','flutter beschrijving',"description du flottement",'คำอธิบายกระพือ','وصف رفرفة','颤动描述']
LecturerCountTxt=["Lecturer Count",'व्याख्याता गणना','Recuento de profesores','Docent tellen',"Nombre de conférenciers",'อาจารย์นับ','محاضر العد','讲师人数']
countTxt=["count",'गिनती करना','contar','graaf',"compter",'นับ','عدد','数数']
VideoUrlTxt=["Video Url",'वीडियो यूआरएल','URL del vídeo','Video URL',"URL de la vidéo",'URL วิดีโอ','رابط الفيديو','视频网址']
SyllabusTxt=["Syllabus",'पाठ्यक्रम','Programa de estudios','Syllabus',"Programme",'หลักสูตร','المنهج','教学大纲']
PREVIEWTxt=["PREVIEW",'पूर्व दर्शन','AVANCE','VOORBEELD',"APERÇU",'ดูตัวอย่าง','معاينة','预览']
ADDTOPICTxt=["ADD NEW TOPIC",'नया विषय जोड़ें','AÑADIR NUEVO TEMA','VOEG EEN NIEUW ONDERWERP TOE',"AJOUTER UN NOUVEAU SUJET",'เพิ่มหัวข้อใหม่','أضف موضوعًا جديدًا','添加新主题']
CreateTopicTxt=["Create Content For Topic - ",'विषय के लिए सामग्री बनाएं -','Crear contenido para el tema -','Maak inhoud voor onderwerp -',"Créer du contenu pour le sujet -",'สร้างเนื้อหาสำหรับหัวข้อ -','إنشاء محتوى للموضوع -','为主题创建内容 -']
yousuredeleteTxt=['Are you sure you want to delete ?','क्या आप आश्वस्त है कि आपको डिलीट करना है ?','¿Estás segura de que quieres eliminar?','Weet je zeker dat je wilt verwijderen ?','Etes-vous sûr que vous voulez supprimer ?','คุณแน่ใจหรือว่าต้องการลบ ?','هل أنت متأكد أنك تريد حذف ؟','你确定你要删除 ？']
PreviewSyllabusTxt = ['Preview Syllabus','पाठ्यक्रम का पूर्वावलोकन करें','Vista previa del plan de estudios','Voorbeeld syllabus','Aperçu du programme','ดูตัวอย่างหลักสูตร','معاينة المنهج','预览课程大纲']
CourseDetailsTxt= ['Course Details','पाठ्यक्रम विवरण','detalles del curso','cursus details','Détails du cours','รายละเอียดหลักสูตร','تفاصيل الدورة','课程详情']
SyllabusDetailsTxt= ['Syllabus Details','पाठ्यक्रम विवरण','Detalles del plan de estudios','Syllabusdetails','Détails du programme','รายละเอียดหลักสูตร','تفاصيل المنهج','教学大纲详情']
CourseNameTxt=["Course Name",'कोर्स का नाम','Nombre del curso','Cursus naam',"Nom du cours",'ชื่อหลักสูตร','اسم الدورة التدريبية','课程名']
CreateCourseTxt=["Create Your Course",'अपना कोर्स बनाएं','Crea tu curso','Creëer je cursus',"Créez votre cours",'สร้างหลักสูตรของคุณ','أنشئ دورتك','创建您的课程']
NameTxt=["Name",'नाम','Nombre','Naam',"Nom",'ชื่อ','اسم','姓名']
TopicTxt=["Topic",'विषय','Tema','Onderwerp',"Sujette",'หัวข้อ','عنوان','话题']
SelectTopicTxt=["Select Topic",'विषय का चयन करें','Seleccionar tema','Selecteer onderwerp',"Sélectionnez le sujet",'เลือกหัวข้อ','حدد الموضوع','选择主题']
ServiceChargeTxt=["Mavenow 5 % Service Charge",'मेवेनॉव 5% सर्विस चार्ज','Mavenow 5 % de cargo por servicio','Mavenow 5% servicekosten',"Mavenow 5 % de frais de service",'มาเวนาว 5 % ค่าบริการ','Mavenow 5٪ رسوم الخدمة','Mavenow 5% 服务费']
NEXTTxt=["NEXT",'अगला','PRÓXIMA','VOLGENDE',"SUIVANTE",'ต่อไป','التالي','下一个']
AlertTxt=["Alert",'चेतावनी','Alerta','Alarm',"Alerte",'เตือน','يُحذًِر','警报']
CourseFeeTxt=["Course Fee",'पाठ्यक्रम शुल्क','Precio del curso','Cursusgeld',"Frais de cours",'ค่าเรียน','رسوم الدورة','课程费用']
skillssectionTxt=["We recommend adding your skill used in this experience your skills section",'हम अनुशंसा करते हैं कि आप इस अनुभव में उपयोग किए गए अपने कौशल को अपने कौशल अनुभाग में जोड़ें',
'Recomendamos agregar la habilidad utilizada en esta experiencia en la sección de habilidades','We raden aan om je vaardigheid die in deze ervaring wordt gebruikt toe te voegen aan je vaardighedensectie',
"Nous vous recommandons d'ajouter votre compétence utilisée dans cette expérience dans votre section compétences",'เราขอแนะนำให้เพิ่มทักษะของคุณที่ใช้ในส่วนทักษะของคุณในประสบการณ์นี้',
'نوصي بإضافة المهارات الخاصة بك المستخدمة في هذه التجربة قسم مهاراتك','我们建议添加您在此体验中使用的技能您的技能部分']
mavenexpertiesTxt=["We have whom can help you immediately to fix your problem would like to connect level of maven experties",'हमारे पास आपकी समस्या को ठीक करने के लिए तुरंत आपकी मदद करने वाले मावेन विशेषज्ञों के स्तर को जोड़ना चाहते हैं',
'Tenemos quién puede ayudarlo de inmediato a solucionar su problema. Le gustaría conectar el nivel de expertos expertos.','We hebben mensen die u onmiddellijk kunnen helpen om uw probleem op te lossen en graag een niveau van maven-experts willen verbinden',
"Nous avons qui peut vous aider immédiatement à résoudre votre problème et souhaite connecter le niveau d'expertise maven",'เรามีผู้ที่สามารถช่วยเหลือคุณได้ทันทีเพื่อแก้ไขปัญหาที่คุณต้องการเชื่อมต่อผู้เชี่ยวชาญระดับ Maven',
'لدينا من يمكنه مساعدتك على الفور لإصلاح مشكلتك ويرغب في الاتصال بمستوى الخبراء المخضرمين','我们有谁可以立即帮助您解决您的问题想要连接 maven 专家级别']

 
}
export const Lang_chg = new Language_provider();






