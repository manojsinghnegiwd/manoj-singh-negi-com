export const siteConfig = {
  name: "Manoj Singh Negi",
  title: "Manoj Singh Negi - Software Engineer",
  tagline: "Software Engineer | Tinkerer",
  bio: "I'm a software engineer passionate about building elegant solutions to complex problems. I create content on YouTube, write about my journey on Debugging My Life, and contribute to open source.",
  
  links: {
    github: "https://github.com/manojsinghnegiwd/manoj-singh-negi-com",
    youtube: "https://youtube.com/@Manojsinghnegiwd",
    blog: "https://debuggingmylife.com",
    linkedin: "https://www.linkedin.com/in/manojsinghnegiwd/",
    email: "mailto:justanothermanoj@gmail.com",
    phone: "tel:+918264586516",
    twitter: "https://twitter.com/manojsinghnegi",
  },

  // Companies I've worked with
  companies: [
    { name: "5axis.health", url: "https://5axis.health/" },
    { name: "MDExam", url: "https://mdexam.com/" },
    { name: "Brij.it", url: "https://brij.it/" },
    { name: "Autism 360™", url: "https://www.autism360.com/" },
    { name: "Conscia", url: "https://conscia.com/" },
    { name: "Avibra", url: "https://www.avibra.com/" },
  ],

  // YouTube videos configuration (automatically fetched from channel)
  featuredVideos: [
    {
      id: "lnOq5AYTBCs",
      title: "Building an AI Task Planner with Next js & OpenAI | Live Coding Session #2",
      thumbnail: "https://img.youtube.com/vi/lnOq5AYTBCs/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=lnOq5AYTBCs",
    },
    {
      id: "LHIpODKXTaY",
      title: "Building a URL Shortener Project with Next js | Live Coding Session #1",
      thumbnail: "https://img.youtube.com/vi/LHIpODKXTaY/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=LHIpODKXTaY",
    },
    {
      id: "NbSJhTolNvY",
      title: "Build an AI Browser Extension with OpenAI & Plasmo Framework (Step-by-Step)",
      thumbnail: "https://img.youtube.com/vi/NbSJhTolNvY/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=NbSJhTolNvY",
    },
  ],
};

export type SiteConfig = typeof siteConfig;

