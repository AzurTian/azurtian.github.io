function getScrollProgress() {
  const readingTarget = document.querySelector("main > article");

  if (readingTarget) {
    const targetRect = readingTarget.getBoundingClientRect();
    const targetTop = targetRect.top + window.scrollY;
    const targetHeight = readingTarget.scrollHeight;
    const readableHeight = targetHeight - window.innerHeight;

    if (readableHeight > 0) {
      return Math.min(Math.max((window.scrollY - targetTop) / readableHeight, 0), 1);
    }
  }

  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollableHeight <= 0) return 0;

  return Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1);
}

function updateScrollToTop() {
  const scrollToTop = document.getElementById("scroll-to-top");
  const progressCircle = document.getElementById("scroll-to-top-progress");
  if (!scrollToTop) return;

  if (window.scrollY > window.innerHeight * 0.5) {
    scrollToTop.classList.remove("translate-y-4", "opacity-0");
    scrollToTop.classList.add("translate-y-0", "opacity-100");
  } else {
    scrollToTop.classList.remove("translate-y-0", "opacity-100");
    scrollToTop.classList.add("translate-y-4", "opacity-0");
  }

  if (progressCircle) {
    const progress = getScrollProgress();
    progressCircle.style.strokeDashoffset = `${100 - progress * 100}`;
  }
}

window.addEventListener("scroll", updateScrollToTop, { passive: true });
window.addEventListener("resize", updateScrollToTop);
window.addEventListener("load", updateScrollToTop);
