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

// جلب كود عشوائي من ملف codes.txt
document.addEventListener('DOMContentLoaded', function () {
  const fetchCodeButton = document.getElementById('fetch-code-button');
  const currentCodeElement = document.getElementById('current-code');
  const copyButton = document.getElementById('copy-button');

  fetchCodeButton.addEventListener('click', function () {
    fetch('codes.txt') // جلب ملف الأكواد
      .then(response => response.text())
      .then(data => {
        const codes = data.split('\n').filter(code => code.trim() !== ''); // تقسيم الأكواد إلى مصفوفة
        if (codes.length > 0) {
          const randomCode = codes[Math.floor(Math.random() * codes.length)]; // اختيار كود عشوائي
          currentCodeElement.textContent = randomCode; // عرض الكود في المستطيل
          copyButton.disabled = false; // تفعيل زر النسخ
        } else {
          currentCodeElement.textContent = '--';
          copyButton.disabled = true; // تعطيل زر النسخ
        }
      })
      .catch(error => {
        console.error('حدث خطأ أثناء جلب الأكواد:', error);
        currentCodeElement.textContent = '--';
        copyButton.disabled = true; // تعطيل زر النسخ
      });
  });

  copyButton.addEventListener('click', function () {
    const codeToCopy = currentCodeElement.textContent;
    if (codeToCopy && codeToCopy !== '--') {
      navigator.clipboard.writeText(codeToCopy).then(() => {
        alert('تم نسخ الكود: ' + codeToCopy);
      }).catch(err => {
        console.error('فشل في نسخ الكود:', err);
      });
    }
  });
});