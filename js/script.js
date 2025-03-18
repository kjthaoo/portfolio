const myFunction = () => {
  const winScroll = window.scrollY;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("bar").style.width = `${scrolled}%`;
};

window.onscroll = myFunction;

const getData = async () => {
  const url = "https://raw.githubusercontent.com/kjthaoo/portfolio/main/json/data.json";

  try {
    const response = await fetch(url);
    return response.ok ? await response.json() : null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const showData = async () => {
  const projects = await getData();
  if (!projects) return;

  const projectsSection = document.getElementById("projects");

  projects.sections.forEach((project) => 
    projectsSection.appendChild(createProjectElement(project))
  );
};

const createProjectElement = (project) => {
  const section = document.createElement("div");
  section.classList.add("project-section");

  const box = document.createElement("div");
  box.classList.add("box");
  section.appendChild(box);

  const card = document.createElement("section");
  card.classList.add("card");
  box.appendChild(card);

  const image = document.createElement("img");
  image.src = `images/${project.img_name}`;
  image.alt = project.title;
  image.classList.add("project-image");
  card.appendChild(image);

  const title = document.createElement("h3");
  const titleLink = document.createElement("a");
  
  titleLink.href = `projects/${project.link}`;
  titleLink.textContent = project.title;
  title.appendChild(titleLink);
  box.appendChild(title);

  const description = document.createElement("p");
  description.textContent = project.description;
  description.classList.add("project-description");
  box.appendChild(description);

  box.appendChild(document.createElement("hr"));

  return section;
};

window.onload = showData;
