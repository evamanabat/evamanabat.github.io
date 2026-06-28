const layouts = [
  { size: 150, top: 5, left: 40 },
  { size: 95, top: 20, left: 5 },
  { size: 130, top: 55, left: 15 },
  { size: 125, top: 45, left: 70 },
  { size: 100, top: 0, left: 80 },
  { size: 95, top: 80, left: 45 }
];

document.addEventListener("DOMContentLoaded", () => {
  applyPhotoLayouts();
  setupSideNav();
  setupActiveExperienceRows();
  setupExpandableExperienceTiles();
});

function applyPhotoLayouts() {
  document.querySelectorAll(".experience-row:not(.expanded) > .experience-photos").forEach((cluster) => {
    const photos = cluster.querySelectorAll(".photo");

    photos.forEach((photo, index) => {
      const layout = layouts[index % layouts.length];

      photo.style.position = "absolute";
      photo.style.width = `${layout.size}px`;
      photo.style.height = `${layout.size}px`;
      photo.style.top = `${layout.top}%`;
      photo.style.left = `${layout.left}%`;
      photo.style.transform = "none";
    });
  });
}

function clearPhotoLayouts(cluster) {
  cluster.querySelectorAll(".photo").forEach((photo) => {
    photo.style.position = "";
    photo.style.width = "";
    photo.style.height = "";
    photo.style.top = "";
    photo.style.left = "";
    photo.style.transform = "";
  });
}

function setupSideNav() {
  const sections = document.querySelectorAll("section[id]");
  const dots = document.querySelectorAll(".side-nav .dot");

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      dots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        dots.forEach((dot) => dot.classList.remove("active"));

        const activeDot = document.querySelector(
          `.side-nav .dot[href="#${entry.target.id}"]`
        );

        if (activeDot) {
          activeDot.classList.add("active");
        }
      });
    },
    { threshold: 0.6 }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupActiveExperienceRows() {
  const rows = document.querySelectorAll(".experience-row");

  function updateActiveRow() {
    const screenCenter = window.innerHeight / 2;

    rows.forEach((row) => {
      const rect = row.getBoundingClientRect();
      const rowCenter = rect.top + rect.height / 2;
      const isNearCenter = Math.abs(screenCenter - rowCenter) < 180;

      row.classList.toggle("active-row", isNearCenter);
    });
  }

  window.addEventListener("scroll", updateActiveRow);
  window.addEventListener("resize", updateActiveRow);
  updateActiveRow();
}
function setupExpandableExperienceTiles() {
  document.querySelectorAll(".experience-row").forEach((row) => {
    const tile = row.querySelector(".experience-tile");
    const photos = row.querySelector(":scope > .experience-photos");

    if (!tile || !photos) return;

    let details = tile.querySelector(".experience-details");

    if (!details) {
      details = document.createElement("div");
      details.classList.add("experience-details");
      tile.appendChild(details);
    }

    tile.addEventListener("click", () => {
  const isExpanded = row.classList.contains("expanded");

  if (isExpanded) {
    const openPhotos = details.querySelector(".experience-photos");

    if (openPhotos) {
      row.appendChild(openPhotos);
    }

    row.classList.remove("expanded");
  } else {
    clearPhotoLayouts(photos);
    details.appendChild(photos);
    row.classList.add("expanded");

    setTimeout(() => {
      const rect = row.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset +
        rect.top -
        (window.innerHeight / 2) +
        (rect.height / 2);

      window.scrollTo({
        top: scrollTop,
        behavior: "smooth"
      });
    }, 100);
  }

  applyPhotoLayouts();
});
  });
}

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});