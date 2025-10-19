import { useState } from "react";

// Project Card Props interface
interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  githubLink: string;
  liveLink?: string;
}

// Project Card Component
const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tags, image, githubLink, liveLink }) => (
  <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transform hover:-translate-y-2 transition-all duration-300 shadow-xl">
    {/* Project Image */}
    <div className="h-48 bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
      {image ? (
        <img src={image} alt={title} className="w-full h-full object-cover" />
      ) : (
        <span className="text-6xl">💻</span>
      )}
    </div>

    {/* Project Info */}
    <div className="p-6">
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-200 mb-4 line-clamp-3">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag: string, index: number) => (
          <span
            key={index}
            className="px-3 py-1 bg-cyan-500/30 rounded-full text-sm text-cyan-100 border border-cyan-400/30"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4">
        {githubLink && (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-lg text-center transition-all duration-300"
          >
            GitHub
          </a>
        )}
        {liveLink && (
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg text-center transition-all duration-300"
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  </div>
);

// Main Projects Page Component
export default function ProjectsPage() {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      title: "AI Chatbot Assistant",
      description:
        "An intelligent chatbot powered by natural language processing to assist students with common queries and provide information about ACM events and activities.",
      tags: ["Python", "NLP", "Machine Learning"],
      category: "AI/ML",
      githubLink: "#",
      liveLink: "#",
    },
    {
      title: "Event Management System",
      description:
        "A comprehensive web application for managing club events, registrations, and attendee tracking with real-time updates and notifications.",
      tags: ["React", "Node.js", "MongoDB"],
      category: "Web Dev",
      githubLink: "#",
      liveLink: "#",
    },
    {
      title: "Code Learning Platform",
      description:
        "An interactive platform designed to help students learn programming through gamified challenges and peer-to-peer collaboration.",
      tags: ["JavaScript", "Firebase", "Vue.js"],
      category: "Web Dev",
      githubLink: "#",
    },
    {
      title: "Campus Navigation App",
      description:
        "A mobile-friendly application that helps students navigate the campus, find classrooms, and locate important facilities with AR integration.",
      tags: ["React Native", "AR", "Maps API"],
      category: "Mobile",
      githubLink: "#",
      liveLink: "#",
    },
    {
      title: "Study Group Matcher",
      description:
        "An algorithm-based application that matches students with similar academic interests and schedules to form effective study groups.",
      tags: ["Python", "Django", "PostgreSQL"],
      category: "Web Dev",
      githubLink: "#",
    },
    {
      title: "IoT Smart Campus",
      description:
        "An IoT-based system for monitoring and controlling classroom environments, including lighting, temperature, and occupancy detection.",
      tags: ["IoT", "Arduino", "MQTT"],
      category: "IoT",
      githubLink: "#",
      liveLink: "#",
    },
  ];

  const categories = ["all", "Web Dev", "Mobile", "AI/ML", "IoT"];

  // Filter projects based on selected category
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className="relative min-h-screen w-full font-sans text-white">
      {/* Background shapes for decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Our Projects
            </h1>
            <div className="max-w-3xl mx-auto">
              <div className="glass-light mx-auto">
                <p className="text-lg md:text-xl text-gray-800">
                  Explore the innovative projects built by our talented members.
                  From web applications to AI solutions, we're pushing the
                  boundaries of technology.
                </p>
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  filter === category
                    ? "bg-cyan-500 text-white shadow-lg scale-105"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>

          {/* No results message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-300">No projects found in this category.</p>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20">
            <h2 className="text-3xl font-bold mb-4">Want to Contribute?</h2>
            <div className="max-w-2xl mx-auto">
              <div className="glass-light mx-auto mb-6">
                <p className="text-lg text-gray-800">
                  We're always looking for passionate students to join our projects
                  or start new ones. Share your ideas and collaborate with fellow
                  members!
                </p>
              </div>
            </div>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-10 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
              Submit Your Project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
