// شريط التقدم
window.onscroll = function() {
  const progressBar = document.getElementById("progressBar");
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = scrolled + "%";
};

// تأثيرات الظهور
const fadeInElements = document.querySelectorAll('.fade-in, .text-fade-in');

const checkVisibility = () => {
  fadeInElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

// إدارة الانيميشن والانتقال
document.addEventListener("DOMContentLoaded", function() {
  const serviceItem = document.querySelector('.service-item.animate');
  if (serviceItem) {
    serviceItem.addEventListener('click', function(event) {
      event.preventDefault(); // منع الانتقال المباشر
      const link = this.href; // الحصول على الرابط

      // تشغيل الانيميشن
      this.style.animation = 'scaleUp 0.5s ease';

      // الانتقال بعد انتهاء الانيميشن
      setTimeout(() => {
        window.location.href = link;
      }, 500); // الانتقال بعد 0.5 ثانية (مدة الانيميشن)
    });
  }
});

// تكوين Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// جلب الكود الأول من Firebase
document.addEventListener("DOMContentLoaded", function() {
  const codeElement = document.getElementById("current-code");
  const statusElement = document.getElementById("code-status");
  const copyButton = document.getElementById("copy-button");

  if (codeElement && statusElement && copyButton) {
    db.ref("codes").orderByKey().limitToFirst(1).once("value", snapshot => {
      if (snapshot.exists()) {
        snapshot.forEach(childSnapshot => {
          const codeKey = childSnapshot.key;
          const codeData = childSnapshot.val();

          codeElement.textContent = codeData.value;
          statusElement.textContent = codeData.used ? "مستخدم" : "متوفر";
          statusElement.classList.toggle("used", codeData.used);
          statusElement.classList.toggle("available", !codeData.used);
          copyButton.disabled = codeData.used;

          // عند نسخ الكود
          copyButton.addEventListener("click", () => {
            navigator.clipboard.writeText(codeData.value).then(() => {
              // تحديث الحالة في Firebase
              db.ref("codes/" + codeKey).update({ used: true });

              // تغيير مظهر الكود
              statusElement.textContent = "مستخدم";
              statusElement.classList.remove("available");
              statusElement.classList.add("used");
              copyButton.disabled = true;
            });
          });
        });
      } else {
        codeElement.textContent = "لا توجد أكواد متاحة";
        copyButton.disabled = true;
      }
    });
  }
});