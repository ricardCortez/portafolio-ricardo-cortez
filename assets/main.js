document.documentElement.classList.add("js");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(
  ".section-head, .about-copy, .focus-rail, .timeline-item, .project-card, .education-item, .contact-panel"
);

revealTargets.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.setProperty("--delay", `${Math.min(index % 4, 3) * 90}ms`);
});

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealTargets.forEach(item => observer.observe(item));
} else {
  revealTargets.forEach(item => item.classList.add("is-visible"));
}

const terminal = document.querySelector("[data-terminal]");
if (terminal && !prefersReducedMotion) {
  const text = terminal.textContent;
  let index = 0;
  terminal.textContent = "";

  const typeNext = () => {
    terminal.textContent = text.slice(0, index);
    index += 1;

    if (index <= text.length) {
      window.setTimeout(typeNext, index < 9 ? 80 : 24);
    }
  };

  window.setTimeout(typeNext, 650);
}

