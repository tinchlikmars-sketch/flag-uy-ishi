const submitBtn = document.getElementById('submitBtn');
const nameInput = document.getElementById('nameInput');
const resultBox = document.getElementById('resultBox');
const nationalityList = document.getElementById('nationalityList');

submitBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    
    if (!name) {
        alert("Iltimos, ism kiriting!");
        return;
    }

    try {
        // API-dan ma'lumot olish
        const response = await fetch(`https://api.nationalize.io/?name=${name}`);
        const data = await response.json();

        // Ro'yxatni tozalash
        nationalityList.innerHTML = '';

        if (data.country && data.country.length > 0) {
            resultBox.style.display = 'block';

            data.country.forEach((item, index) => {
                const countryCode = item.country_id; // Masalan: 'UZ', 'RU'
                const probability = (item.probability * 100).toFixed(1); // Foizga o'girish

                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${index + 1}</span>
                    <img class="flag" src="https://flagcdn.com/w40/${countryCode.toLowerCase()}.png" alt="${countryCode}">
                    <span>${countryCode}</span>
                    <span style="margin-left: auto;" class="percentage">${probability}%</span>
                `;
                nationalityList.appendChild(li);
            });
        } else {
            alert("Ma'lumot topilmadi.");
        }
    } catch (error) {
        console.error("Xatolik yuz berdi:", error);
        alert("API bilan bog'lanishda xatolik!");
    }
});