document.addEventListener("DOMContentLoaded", () => {
  setupActiveExperienceRows();
  setupExpandableExperienceTiles();
  setupProjectCards();
  setupNavbarActiveLinks();
});

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

    if (!tile) return;

    let details = tile.querySelector(".experience-details");

    if (!details) {
      details = document.createElement("div");
      details.classList.add("experience-details");
      tile.appendChild(details);
    }

    tile.addEventListener("click", () => {
      const isExpanded = row.classList.contains("expanded");

      document.querySelectorAll(".experience-row.expanded").forEach((openRow) => {
        if (openRow === row) return;

        const openTile = openRow.querySelector(".experience-tile");
        const openDetails = openTile?.querySelector(".experience-details");
        const openPhotos = openDetails?.querySelector(".experience-photos");

        if (openPhotos) {
          openRow.appendChild(openPhotos);
        }

        openRow.classList.remove("expanded");
      });

      const photos =
        row.querySelector(":scope > .experience-photos") ||
        details.querySelector(".experience-photos");

      if (!photos) return;

      if (isExpanded) {
        row.appendChild(photos);
        row.classList.remove("expanded");
      } else {
        details.appendChild(photos);
        row.classList.add("expanded");

        row.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    });
  });
}

function setupProjectCards() {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });
}

function setupNavbarActiveLinks() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar a");

  function setActiveLink(id) {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href").slice(1);
      setActiveLink(id);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => observer.observe(section));
}