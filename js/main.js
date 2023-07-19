const nav_bars = document.querySelector('.fa-bars');
const nav_links = document.querySelectorAll('.nav_links');
const nav_link = document.getElementById('nav_link');
// const nav_bg = document.querySelector('.nav_bg--mobile')

nav_bars.addEventListener('click', () => {
    nav_link.classList.toggle('show');
    // nav_bg.classList.toggle('active')
})
nav_links.forEach(function (link) {
    link.addEventListener('click', () => {
        nav_link.classList.remove('show')
    })
})

const hero_categories = document.querySelector('.hero_categories--all');
const hero_menu = document.getElementById('hero_menu');

hero_categories.addEventListener('click', () => {
    hero_categories.classList.toggle('arrow')

    let height = 0;
    let menu = hero_categories.nextElementSibling;
    if (menu.clientHeight == "0") {
        height = menu.scrollHeight
    }
    menu.style.height = `${height}px`
})

const carrousel = document.querySelector('.carousel');

let isDragging = false, starX, starScrollLeft, timeOutId

carrousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return
    carrousel.scrollLeft = starScrollLeft - (e.pageX - starX);
})
carrousel.addEventListener('mousedown', (e) => {
    isDragging = true
    carrousel.classList.add('draggin')
    starX = e.pageX;
    starScrollLeft = carrousel.scrollLeft
})
carrousel.addEventListener('mouseup', () => {
    isDragging = false
    carrousel.classList.remove('draggin')
})

const arrows = document.querySelectorAll('.container_cards .carrousel_indicators i');
const firstCard = carrousel.querySelector('.card').offsetWidth

arrows.forEach(btn => {
    btn.addEventListener('click', () => {
        carrousel.scrollLeft += btn.id === 'left' ? -firstCard : firstCard
    })
})

const carrouselChildren = [...carrousel.children]

let cardPerView = Math.round(carrousel.offsetWidth / firstCard)

carrouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carrousel.insertAdjacentHTML('afterbegin', card.outerHTML)
})
carrouselChildren.slice(0, cardPerView).forEach(card => {
    carrousel.insertAdjacentHTML('beforeend', card.outerHTML)
})

carrousel.addEventListener('scroll', () => {
    if (carrousel.scrollLeft === 0) {
        carrousel.scrollLeft = carrousel.scrollWidth - (2 * carrousel.offsetWidth)
    } else if (Math.ceil(carrousel.scrollLeft) === carrousel.scrollWidth - carrousel.offsetWidth) {
        carrousel.scrollLeft = carrousel.offsetWidth
    }
})

const autoPlay = () => {
    // if (window.innerWidth < 600) return;
    timeOutId = setTimeout(() => {
        carrousel.scrollLeft += firstCard
        autoPlay()
    }, 2500)
}
autoPlay()