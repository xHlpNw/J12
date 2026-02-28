const textarea = document.querySelector('textarea');


const colorBtn = document.getElementById('colorBtn');
const colorDropdown = document.getElementById('colorDropdown');
const r = document.getElementById('r');
const g = document.getElementById('g');
const b = document.getElementById('b');
const rVal = document.getElementById('rVal');
const gVal = document.getElementById('gVal');
const bVal = document.getElementById('bVal');
const previewSquare = document.querySelector('.color-preview');

const fontFamily = document.getElementById('font-family');
const fontSize = document.getElementById('font-size');
const bold = document.getElementById('bold');
const italic = document.getElementById('italic');
const strike = document.getElementById('strike');
const alignRadios = document.querySelectorAll('input[name="align"]');

colorBtn.addEventListener('click', () => {
    colorDropdown.style.display = colorDropdown.style.display === 'grid' ? 'none' : 'grid';
})

function updateColor(red, green, blue) {
    rVal.value = red;
    r.value = red;
    gVal.value = green;
    g.value = green;
    bVal.value = blue;
    b.value = blue;

    let color = `rgb(${red}, ${green}, ${blue})`;

    previewSquare.style.backgroundColor = color;
    textarea.style.color = color;
}

[r, g, b].forEach(slider => {
    slider.addEventListener('input', () =>  {
        updateColor(r.value, g.value, b.value);
    });
});

[rVal, gVal, bVal].forEach(input => {
    input.addEventListener('input', () =>  {
        updateColor(rVal.value, gVal.value, bVal.value);
    });
    input.addEventListener('blur', () => {
        input.value = input.value || 0;
        input.value = Math.max(0, Math.min(255, input.value));
        updateColor(rVal.value, gVal.value, bVal.value);
    });
});

updateColor(0, 0, 0);

function initStyles() {
    textarea.style.fontFamily = fontFamily.value;
    textarea.style.fontSize = fontSize.value + 'pt';
    textarea.style.fontWeight = bold.checked ? 'bold' : 'normal';
    textarea.style.fontStyle = italic.checked ? 'italic' : 'normal';

    alignRadios.forEach(radio => {
        if (radio.checked) textarea.style.textAlign = radio.id;
    });
}

initStyles();

fontFamily.addEventListener('change', () => {
    textarea.style.fontFamily = fontFamily.value;
});

fontSize.addEventListener('change', () => {
    let value = Math.max(8, Math.min(72, fontSize.value));
    textarea.style.fontSize = value + 'pt';
    fontSize.value = value;
});

bold.addEventListener('change', () => {
    textarea.style.fontWeight = bold.checked ? 'bold' : 'normal';
});

italic.addEventListener('change', () => {
    textarea.style.fontStyle = italic.checked ? 'italic' : 'normal';
});

strike.addEventListener('click', () => {
    textarea.style.textDecoration = strike.checked ? 'line-through' : 'none';
});

alignRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        textarea.style.textAlign = radio.id;
    });
});