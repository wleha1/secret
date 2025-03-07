const compliments = [
    "Римма, твоя энергия заряжает меня счастьем!",
    "С тобой каждый момент превращается в маленькую сказку!",
    "Твои глаза — как две звезды, которые светят только для меня!",
    "Ты делаешь каждый день особенным!",
    "Римма, ты вдохновляешь меня становиться лучше!",
    "С тобой мир становится ярче!",
    "С тобой даже дождь кажется солнечным!",
    "Ты делаешь этот мир красивее одним своим присутствием!",
    "Ты восхитительна во всем!",
    "Ты моя любимая причина для улыбки!",
    "Ты как весна — несешь тепло и радость!"
];

function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsContainer.appendChild(star);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    createStars();
    const openBtn = document.getElementById('openBtn');

    openBtn.addEventListener('click', function() {
        document.querySelector('.intro-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.intro-screen').style.display = 'none';
            document.querySelector('.congrats-screen').classList.add('visible');
        }, 1000);

        setInterval(createPetal, 300);
    });

    document.addEventListener('mousemove', (e) => {
        const stars = document.querySelector('.stars');
        const x = e.clientX / window.innerWidth * 10;
        const y = e.clientY / window.innerHeight * 10;
        stars.style.transform = `translate(${x}px, ${y}px)`;
    });


    document.getElementById('bouquet-btn').addEventListener('click', function(e) {
        createParticles(e.clientX, e.clientY);
        for (let i = 0; i < 10; i++) setTimeout(createPetal, i * 100);
        showRandomCompliment();
    });

    setInterval(createPetal, 1000);
});

function createParticles(x, y) {
    const container = document.body;
    const count = 30;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        const hue = Math.floor(Math.random() * 40) + 340; 
        const saturation = Math.floor(Math.random() * 30) + 70; 
        const lightness = Math.floor(Math.random() * 20) + 60; 
        particle.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;


        const tx = (Math.random() - 0.5) * 200; 
        const ty = (Math.random() - 0.5) * 200; 
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);

        container.appendChild(particle);

        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
}


function createPetal() {
    const petal = document.createElement('img');
    petal.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 0 C20 10 25 15 15 30 C5 15 10 10 15 0" fill="%23ff6f61" opacity="0.7"/></svg>';
    petal.classList.add('petal');

    const size = Math.floor(Math.random() * 30) + 20;
    petal.style.width = `${size}px`;

    const x = Math.random() * window.innerWidth;
    petal.style.left = `${x}px`;

    petal.style.top = `-50px`;

    const rotationDirection = Math.random() > 0.5 ? 1 : -1;
    const rotationSpeed = Math.random() * 360; 

    const horizontalDrift = (Math.random() - 0.5) * 200; 

    const petalsContainer = document.getElementById('petals-container');
    if (petalsContainer) {
        petalsContainer.appendChild(petal);
    }

    const animationDuration = Math.random() * 3 + 2; 
    petal.style.animation = `fall ${animationDuration}s linear forwards`;

    petal.style.setProperty('--drift', `${horizontalDrift}px`);

    petal.addEventListener('animationend', () => {
        petal.remove();
    });

    let rotation = 0;
    const rotatePetal = () => {
        rotation += rotationSpeed * rotationDirection * 0.01;
        petal.style.transform = `rotate(${rotation}deg)`;
        requestAnimationFrame(rotatePetal);
    };
    requestAnimationFrame(rotatePetal);
}

function showRandomCompliment() {
    const complimentElement = document.getElementById('compliment');
    if (!complimentElement) return;

    complimentElement.classList.remove('show');

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * compliments.length);
        complimentElement.textContent = compliments[randomIndex];

        complimentElement.classList.add('show');
    }, 100);
}

const mediaData = [
    {
        type: 'image',
        src: 'images/photo4.jpg',
        comment: 'Наша первая встреча — помнишь этот день?'
    },
    {
        type: 'video',
        src: 'images/video2.mp4',
        comment: 'А это тот самый день',
        muted: true
    },
    {
        type: 'image',
        src: 'images/photo2.jpg',
        comment: 'А вот он снова!'
    },
    {
        type: 'video',
        src: 'images/video6.mov',
        comment: 'Смотри какие здесь мы милые',
        muted: true
    },
    {
        type: 'video',
        src: 'images/video1.mov',
        comment: '',
        muted: true
    },

];

let currentMediaIndex = 0;
let mediaElements = [];

function preloadMedia() {
    mediaData.forEach((item, index) => {
        if (item.type === 'image') {
            const img = new Image();
            img.src = item.src;
            img.onload = () => {
                mediaElements[index] = img;
            };
        } else {
            const video = document.createElement('video');
            video.src = item.src;
            video.muted = item.muted;
            video.preload = 'auto';
            mediaElements[index] = video;
        }
    });
}

function showCurrentMedia() {
    const container = document.getElementById('media-display');
    container.querySelector('video')?.pause();
    container.innerHTML = '';

    const media = mediaElements[currentMediaIndex].cloneNode(true);
    media.classList.add('active');

    if (media.tagName === 'VIDEO') {

        media.autoplay = true;
        media.muted = true;
        media.setAttribute('playsinline', '');
        media.setAttribute('webkit-playsinline', '');
        media.loop = true;

        media.oncontextmenu = (e) => {
            e.preventDefault();
            return false;
        };

        media.play().catch(error => {
            console.log('Автовоспроизведение заблокировано. Нужно взаимодействие пользователя.');
        });
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'media-wrapper';
    wrapper.appendChild(media);
    container.appendChild(wrapper);

    const comment = document.getElementById('media-comment');
    comment.classList.remove('show');
    setTimeout(() => {
        comment.textContent = mediaData[currentMediaIndex].comment;
        comment.classList.add('show');
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    preloadMedia();

    document.getElementById('media-display').addEventListener('click', (e) => {
        e.preventDefault(); 
        currentMediaIndex = (currentMediaIndex + 1) % mediaData.length;
        showCurrentMedia();
    });

    const nextBtn = document.getElementById('nextBtn');
    nextBtn.addEventListener('click', function() {
        document.querySelector('.congrats-screen').classList.remove('visible');
        document.querySelector('.memories-screen').style.display = 'block';
        showCurrentMedia();
    });

    nextBtn.style.display = 'none';
});

openBtn.addEventListener('click', function() {
    document.querySelector('.intro-screen').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.intro-screen').style.display = 'none';
        document.querySelector('.congrats-screen').classList.add('visible');
        document.getElementById('nextBtn').style.display = 'block';
    }, 1000);
});

function preloadMedia() {
    mediaData.forEach((item, index) => {
        if (item.type === 'image') {
            const img = new Image();
            img.src = item.src;
            img.onload = () => mediaElements[index] = img;
            img.onerror = () => console.error("Ошибка загрузки:", item.src); 
        } else {
            const video = document.createElement('video');
            video.src = item.src;
            video.muted = item.muted;
            video.preload = 'auto';
            video.onerror = () => console.error("Ошибка загрузки:", item.src); 
            mediaElements[index] = video;
        }
    });
}


