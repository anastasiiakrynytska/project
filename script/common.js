function handleSmoothScroll() {
    document.body.addEventListener('click', (e) => {
        const t = e.target;
        if(t.classList.contains('smooth-scroll')) {
            e.preventDefault();
            const target = document.querySelector(t.getAttribute('href'));
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    })
}

handleSmoothScroll();