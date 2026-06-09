const projects = [
  {
    title: "Linux Server Automation on AWS EC2",
    description: "Provisioned and configured Ubuntu EC2 instances on AWS, managed SSH access and user permissions, and automated administrative tasks using Bash scripting.",
    icon: "fa-solid fa-server",
    category: "cloud",
    tags: ["AWS EC2", "Ubuntu", "SSH", "Bash"]
  },
  {
    title: "CI/CD Pipeline Automation",
    description: "Built Jenkins CI/CD pipelines, integrated GitHub webhooks, and automated Docker image build and deployment workflows.",
    icon: "fa-solid fa-arrows-rotate",
    category: "cicd",
    tags: ["Jenkins", "Docker", "GitHub", "Webhooks"]
  },
  {
    title: "Kubernetes Deployment with Minikube",
    description: "Deployed containerized applications using Kubernetes Deployments and Services, managed YAML manifests, and troubleshot workloads with kubectl.",
    icon: "fa-solid fa-dharmachakra",
    category: "containers",
    tags: ["Kubernetes", "Minikube", "YAML", "kubectl"]
  },
  {
    title: "End-to-End DevOps Workflow",
    description: "Designed a workflow from code commit to deployment using GitHub, Jenkins, Docker, and Kubernetes.",
    icon: "fa-solid fa-rocket",
    category: "cicd",
    tags: ["GitHub", "Jenkins", "Docker", "K8s"]
  },
  {
    title: "Infrastructure as Code Automation",
    description: "Practiced infrastructure automation and configuration management using Terraform and Ansible for repeatable environment setup.",
    icon: "fa-solid fa-layer-group",
    category: "iac",
    tags: ["Terraform", "Ansible", "IaC", "Automation"]
  },
  {
    title: "Monitoring and Observability Setup",
    description: "Configured operational monitoring concepts using Prometheus and Grafana to support visibility into infrastructure and services.",
    icon: "fa-solid fa-chart-line",
    category: "cloud",
    tags: ["Prometheus", "Grafana", "Monitoring", "Ops"]
  }
];

const header = document.getElementById("siteHeader");
const scrollTopBtn = document.getElementById("scrollTop");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const projectsGrid = document.getElementById("projectsGrid");
const year = document.getElementById("year");
const typingText = document.getElementById("typingText");

year.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  const isScrolled = window.scrollY > 80;

  header.classList.toggle("scrolled", isScrolled);
  scrollTopBtn.classList.toggle("show", window.scrollY > 500);
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  document.body.classList.toggle("menu-open");

  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    document.body.classList.remove("menu-open");

    const icon = menuToggle.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  });
});

const typingWords = [
  "Cloud Infrastructure",
  "CI/CD Pipelines",
  "Docker Workflows",
  "Kubernetes Deployments",
  "Infrastructure Automation"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = typingWords[wordIndex];

  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 55 : 95;

  if (!isDeleting && charIndex === currentWord.length) {
    speed = 1100;
    isDeleting = true;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % typingWords.length;
    speed = 300;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

function renderProjects(filter = "all") {
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  projectsGrid.innerHTML = filteredProjects
    .map(
      (project) => `
      <article class="project-card tilt-card reveal" data-category="${project.category}">
        <div class="project-inner">
          <div class="project-icon">
            <i class="${project.icon}"></i>
          </div>

          <h3>${project.title}</h3>
          <p>${project.description}</p>

          <div class="project-tags">
            ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
        </div>
      </article>
    `
    )
    .join("");

  addTiltEffect();
  observeRevealElements();
}

renderProjects();

document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

function addTiltEffect() {
  const tiltCards = document.querySelectorAll(".tilt-card");

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
}

addTiltEffect();

function observeRevealElements() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

observeRevealElements();

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  const whatsappMessage = `Hi Shan,%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0ASubject: ${encodeURIComponent(subject)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;

  window.open(`https://api.whatsapp.com/send?phone=923207313448&text=${whatsappMessage}`, "_blank", "noopener,noreferrer");
});

const canvas = document.getElementById("particlesCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  const count = Math.min(80, Math.floor(window.innerWidth / 20));

  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 0.7,
    vx: (Math.random() - 0.5) * 0.42,
    vy: (Math.random() - 0.5) * 0.42
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(45, 212, 191, 0.78)";
    ctx.fill();

    for (let j = index + 1; j < particles.length; j++) {
      const other = particles[j];
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 130) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = `rgba(56, 189, 248, ${1 - distance / 130})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});
