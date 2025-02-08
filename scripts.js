async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (amount === "" || isNaN(amount)) {
        alert("يرجى إدخال مبلغ صحيح");
        return;
    }

    const apiKey = 'b1cbda66dda4e999a7ffa990'; // استبدل بمفتاح API الخاص بك
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === 'success') {
            const convertedAmount = data.conversion_result;
            const exchangeRate = data.conversion_rate;
            document.getElementById('result').innerText = `المبلغ المحول: ${convertedAmount.toFixed(2)} ${toCurrency}`;
            document.getElementById('exchangeRateInfo').innerText = `سعر الصرف الحالي: 1 ${fromCurrency} = ${exchangeRate.toFixed(4)} ${toCurrency}`;
        } else {
            alert("حدث خطأ أثناء الحصول على سعر الصرف");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("حدث خطأ أثناء الاتصال بالخادم");
    }
}''