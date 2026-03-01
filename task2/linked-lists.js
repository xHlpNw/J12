const data = {
    "Россия": ["Москва", "Санкт-Петербург", "Самара", "Казань", "Новосибирск"],
    "Германия": ["Берлин", "Гамбург", "Франкфурт-на-Майне"],
    "Италия": ["Рим", "Флоренция", "Венеция"],
    "Франция": ["Париж", "Марсель", "Ницца", "Канны"],
    "США": ["Вашингтон", "Нью Йорк", "Лос Анджелес", "Лас Вегас", "Сан Франциско"]
};

const countrySelect = document.getElementById("country");
const citySelect = document.getElementById("city");

window.addEventListener("DOMContentLoaded", function () {
    for (let country in data) {
        const option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    }
});

countrySelect.addEventListener("change", function () {
    const selectedCountry = this.value;
    citySelect.replaceChildren();

    if (selectedCountry && data[selectedCountry]) {
        let defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Выберите город";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        citySelect.appendChild(defaultOption);

        data[selectedCountry].forEach(function (city) {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });

        citySelect.disabled = false;
        citySelect.style.display = "inline";
    } else {
        citySelect.disabled = true;
        citySelect.style.display = "none";
    }
});