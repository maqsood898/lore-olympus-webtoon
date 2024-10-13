// PDFs sliderscroll-bar
const initSlider = () => {
    const slideBtns = document.querySelectorAll(".table-btn");
    const slideList = document.querySelector(".contents-table");
    const sliderScrollBar = document.querySelector(".content-scrollbar");
    const ScrollBarThumb = document.querySelector(".scrollbar-thumb");
    const maxScrollLeft = slideList.scrollWidth - slideList.clientWidth;

    ScrollBarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPos = ScrollBarThumb.offsetLeft;

        const handleMouseMov = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPos = thumbPos + deltaX;
            const maxThumbPos = sliderScrollBar.getBoundingClientRect().width - ScrollBarThumb.offsetWidth;

            const boundedPos = Math.max(0, Math.min(maxThumbPos, newThumbPos));
            const scrollPos = (boundedPos / maxThumbPos) * maxScrollLeft;

            ScrollBarThumb.style.left = `${boundedPos}px`;
            slideList.scrollLeft = scrollPos;
        }

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMov);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMov);
        document.addEventListener("mouseup", handleMouseUp);
    });

    slideBtns.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = slideList.clientWidth * direction;
            slideList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    const handleSlideButtons = () => {
        slideBtns[0].style.display = slideList.scrollLeft <= 0 ? "none" : "block";
        slideBtns[1].style.display = slideList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }

    const updateScrollThumbPos = () => {
        const scrollPos = slideList.scrollLeft;
        const thumbPos = (scrollPos / maxScrollLeft) * (sliderScrollBar.clientWidth - ScrollBarThumb.offsetWidth);
        ScrollBarThumb.style.left = `${thumbPos}px`;
    }

    slideList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPos();
    });
}

window.addEventListener("load", initSlider);

//more menu logic for phone

var togglemenu = document.querySelector(".head-title");

function toggleMoreMenu() {
    togglemenu.classList.toggle("show-menu")
}