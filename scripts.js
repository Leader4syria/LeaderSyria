async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (isNaN(amount) || amount <= 0) {
        alert("يرجى إدخال مبلغ صحيح");
        return;
    }

    const apiKey = 'b1cbda66dda4e999a7ffa990'; // تأكد من أن المفتاح صالح
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === 'success') {
            const exchangeRate = data.conversion_rate;
            const convertedAmount = (amount * exchangeRate).toFixed(2);
            document.getElementById('conversionResult').innerText = `المبلغ المحول: ${convertedAmount} ${toCurrency}`;
            document.getElementById('exchangeRateInfo').innerText = `سعر الصرف الحالي: 1 ${fromCurrency} = ${exchangeRate.toFixed(4)} ${toCurrency}`;
        } else {
            alert("حدث خطأ أثناء الحصول على سعر الصرف");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("حدث خطأ أثناء الاتصال بالخادم");
    }
}
