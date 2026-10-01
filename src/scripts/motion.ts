import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

/* Entrance reveals: [data-reveal] blur-up, [data-words] word-by-word. */
const revealIO = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("is-visible");
      revealIO.unobserve(e.target);
    }
  },
  { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
);
document.querySelectorAll("[data-reveal], [data-words]").forEach((el) => revealIO.observe(el));
document.querySelectorAll(".aurora-text").forEach((el) => el.classList.add("is-flowing"));

if (!reduce) {
  /* Smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync. */
  const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -96 } });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  (window as unknown as { lenis: Lenis }).lenis = lenis;

  /* Hero: the orb drifts and fades as the page moves on. */
  document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    const speed = Number(el.dataset.parallax || 0.2);
    gsap.to(el, {
      yPercent: speed * 100,
      opacity: el.dataset.parallaxFade ? 0.2 : 1,
      ease: "none",
      scrollTrigger: { trigger: el.closest("section") ?? el, start: "top top", end: "bottom top", scrub: true },
    });
  });

  /* Manifesto: words light up as they cross the viewport. */
  document.querySelectorAll<HTMLElement>("[data-scrub]").forEach((el) => {
    gsap.fromTo(
      el.querySelectorAll(".sw"),
      { opacity: 0.16 },
      {
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
      },
    );
  });

  /* Stacked approach cards: each one recedes as the next arrives. */
  document.querySelectorAll<HTMLElement>("[data-stack]").forEach((stack) => {
    const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", stack);
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      gsap.to(card.firstElementChild, {
        scale: 0.93,
        opacity: 0.45,
        filter: "blur(2px)",
        ease: "none",
        scrollTrigger: { trigger: next, start: "top 85%", end: "top 20%", scrub: true },
      });
    });
  });

  /* Numbers count up when they come into view. */
  document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const end = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals ?? 0);
    const obj = { v: 0 };
    el.textContent = (0).toFixed(decimals);
    gsap.to(obj, {
      v: end,
      duration: 1.8,
      ease: "power3.out",
      onUpdate: () => (el.textContent = obj.v.toFixed(decimals)),
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  });

  /* Paths that draw themselves with scroll. */
  document.querySelectorAll<SVGGeometryElement>("[data-draw]").forEach((el) => {
    gsap.fromTo(
      el,
      { strokeDasharray: 1, strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: { trigger: el.closest("ol, section") ?? el, start: "top 70%", end: "bottom 60%", scrub: 0.6 },
      },
    );
  });

  /* Selected work: vertical scroll pans the gallery sideways (desktop only). */
  const mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => {
    document.querySelectorAll<HTMLElement>("[data-hpan]").forEach((wrap) => {
      const track = wrap.querySelector<HTMLElement>("[data-hpan-track]");
      if (!track) return;
      wrap.classList.add("is-pinned");
      const distance = () => track.scrollWidth - wrap.clientWidth;
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => document.querySelectorAll("[data-hpan]").forEach((w) => w.classList.remove("is-pinned"));
  });

  /* Magnetic CTAs. */
  if (finePointer) {
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
      });
      el.addEventListener("pointerleave", () => {
        xTo(0);
        yTo(0);
      });
    });
  }

  /* Refresh once fonts settle, so pinned lengths are right. */
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

/* Carousel arrows: [data-scroll="1|-1"][data-target=id]. */
document.querySelectorAll<HTMLButtonElement>("[data-scroll]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const track = document.getElementById(btn.dataset.target ?? "");
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    track.scrollBy({ left: Number(btn.dataset.scroll) * (card.offsetWidth + 16), behavior: "smooth" });
  });
});

/* Click-to-play Wistia and YouTube videos. */
document.addEventListener("click", (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-wistia], [data-youtube]");
  if (!btn) return;
  const iframe = document.createElement("iframe");
  iframe.src = btn.dataset.wistia
    ? `https://fast.wistia.net/embed/iframe/${btn.dataset.wistia}?autoPlay=true&playerColor=1e1638`
    : `https://www.youtube-nocookie.com/embed/${btn.dataset.youtube}?autoplay=1&playsinline=1&rel=0`;
  iframe.title = btn.dataset.title ?? "Video";
  iframe.allow = "autoplay; fullscreen";
  iframe.allowFullscreen = true;
  iframe.className = "absolute inset-0 size-full";
  btn.replaceWith(iframe);
});

/* Cursor spotlight on cards. */
if (finePointer) {
  document.querySelectorAll<HTMLElement>(".spotlight").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
}
