const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789абвгдезийклмнопрстуфхцчшщыюяΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩあいうえおかきくけこさしすせそ中国的一些字 العربية";
const translations = ["KYMYU", "КЫМЮ", "凯穆", "كيميو", "ΚΥΜΥΥ", "キミュ"];
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * canvas.height;
}

function getRandomFont() {
    const fonts = [
        'https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap',
        'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap',
        'https://fonts.googleapis.com/css2?family=Lobster&display=swap',
        'https://fonts.googleapis.com/css2?family=Monoton&display=swap',
        'https://fonts.googleapis.com/css2?family=Oswald:wght@400&display=swap',
        'https://fonts.googleapis.com/css2?family=Pacifico&display=swap'
    ];
    const randomFontUrl = fonts[Math.floor(Math.random() * fonts.length)];
    const link = document.createElement('link');
    link.href = randomFontUrl;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return randomFontUrl.split('=')[1].split(':')[0];
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < drops.length; i++) {
        let text;
        if (Math.random() < 0.05) {
            const randomFont = getRandomFont();
            ctx.font = fontSize + "px '" + randomFont + "'";
            text = translations[Math.floor(Math.random() * translations.length)];
        } else {
            text = characters[Math.floor(Math.random() * characters.length)];
        }

        ctx.fillStyle = getRandomColor();
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(draw, 10);

