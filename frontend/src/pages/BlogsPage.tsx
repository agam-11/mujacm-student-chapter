import { useState, useEffect } from "react";

// Blog Card Component
const BlogCard = ({ title, excerpt, author, date, category, readTime, image, link }) => (
  <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transform hover:-translate-y-2 transition-all duration-300 shadow-xl">
    {/* Blog Image */}
    <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center overflow-hidden">
      {image ? (
        <img src={image} alt={title} className="w-full h-full object-cover" />
      ) : (
        <span className="text-6xl">✍️</span>
      )}
    </div>

    {/* Blog Content */}
    <div className="p-6">
      {/* Category Badge */}
      <div className="mb-3">
        <span className="px-3 py-1 bg-purple-500/40 rounded-full text-sm text-purple-100 border border-purple-400/40">
          {category}
        </span>
      </div>

      <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2">
        {title}
      </h3>
      <p className="text-gray-200 mb-4 line-clamp-3">{excerpt}</p>

      {/* Author Info */}
      <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
            {author.charAt(0)}
          </div>
          <span>{author}</span>
        </div>
        <span>{readTime} min read</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">{date}</span>
        <a
          href={link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
        >
          Read More
        </a>
      </div>
    </div>
  </div>
);

// Featured Blog Component (supports image + link)
const FeaturedBlog = ({ title, excerpt, author, date, readTime, image, link }) => (
  <div className="bg-gradient-to-r from-purple-500 to-pink-500 bg-opacity-20 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/30 shadow-2xl mb-12">
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <span className="px-4 py-2 bg-white/20 rounded-full text-sm text-white font-semibold">
          ⭐ Featured
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-100 mb-6">{excerpt}</p>
        <div className="flex items-center gap-4 text-sm text-gray-200 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-600 font-bold">
              {author && author.charAt(0)}
            </div>
            <span className="font-semibold">{author}</span>
          </div>
          <span>•</span>
          <span>{date}</span>
          <span>•</span>
          <span>{readTime} min read</span>
        </div>
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
          >
            Read Featured Article
          </a>
        ) : (
          <button disabled className="inline-block bg-white/30 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed">
            Read Featured Article
          </button>
        )}
      </div>
      <div className="w-full md:w-1/3 h-64 md:h-auto bg-white/20 rounded-xl overflow-hidden flex items-center justify-center">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-8xl">📖</span>
        )}
      </div>
    </div>
  </div>
);

// Main Blogs Page Component
export default function BlogsPage() {
  const [filter, setFilter] = useState("all");
  const [mediumBlogs, setMediumBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableCategories, setAvailableCategories] = useState([
    "all",
    "Web Development",
    "Machine Learning",
    "Cybersecurity",
    "Emerging Tech",
    "Programming",
  ]);

  // Fetch Medium blogs via RSS feed
  useEffect(() => {
    const fetchMediumBlogs = async () => {
      try {
        // MUJ ACM Medium account
        const mediumUsername = "@acmmuj";
        const rssUrl = `https://medium.com/feed/${mediumUsername}`;
        
        // Using RSS2JSON API to convert RSS to JSON
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();
        
        if (data.status === "ok") {
          // Transform Medium posts to our blog format
          const transformedBlogs = data.items.slice(0, 6).map((item) => {
            // Extract first image from content if available
            const imgRegex = /<img[^>]+src="([^">]+)"/;
            const imgMatch = item.content?.match(imgRegex);
            const image = imgMatch ? imgMatch[1] : null;

            // Clean description
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = item.description;
            const cleanDescription = tempDiv.textContent || tempDiv.innerText || "";

            // Calculate read time (rough estimate: 200 words per minute)
            const wordCount = cleanDescription.split(/\s+/).length;
            const readTime = Math.ceil(wordCount / 200);

            return {
              title: item.title,
              excerpt: cleanDescription.substring(0, 200) + "...",
              author: item.author || "ACM Team",
              date: new Date(item.pubDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              category: item.categories?.[0] || "Technology",
              readTime: readTime > 0 ? readTime : 5,
              image: image,
              link: item.link,
            };
          });

          setMediumBlogs(transformedBlogs);
          
          // Extract unique categories from Medium blogs
          if (transformedBlogs.length > 0) {
            const uniqueCategories = ["all", ...new Set(transformedBlogs.map(blog => blog.category))];
            setAvailableCategories(uniqueCategories);
          }
        } else {
          throw new Error("Invalid response from RSS feed");
        }
      } catch (err) {
        console.error("Error fetching Medium blogs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMediumBlogs();
  }, []);

  const blogs = [
    {
      title: "Getting Started with React: A Beginner's Guide",
      excerpt:
        "Learn the fundamentals of React.js and build your first interactive web application with this comprehensive tutorial for beginners.",
      author: "Rahul Kumar",
      date: "Oct 10, 2025",
      category: "Web Development",
      readTime: 6,
    },
    {
      title: "Machine Learning Algorithms Explained",
      excerpt:
        "A deep dive into the most popular machine learning algorithms, their use cases, and how to implement them in Python.",
      author: "Ananya Singh",
      date: "Oct 8, 2025",
      category: "Machine Learning",
      readTime: 10,
    },
    {
      title: "Cybersecurity Best Practices for Students",
      excerpt:
        "Essential tips and practices to protect your digital identity and stay safe online in today's connected world.",
      author: "Vikram Patel",
      date: "Oct 5, 2025",
      category: "Cybersecurity",
      readTime: 5,
    },
    {
      title: "Building Responsive Websites with Tailwind CSS",
      excerpt:
        "Discover how Tailwind CSS can streamline your development workflow and help you create beautiful, responsive designs quickly.",
      author: "Neha Gupta",
      date: "Oct 3, 2025",
      category: "Web Development",
      readTime: 7,
    },
    {
      title: "The Rise of Quantum Computing",
      excerpt:
        "Understanding quantum computing, its potential applications, and how it could transform industries in the coming decades.",
      author: "Arjun Reddy",
      date: "Sep 30, 2025",
      category: "Emerging Tech",
      readTime: 9,
    },
    {
      title: "Data Structures Every Developer Should Know",
      excerpt:
        "Master the essential data structures that form the foundation of efficient algorithms and software development.",
      author: "Sneha Joshi",
      date: "Sep 28, 2025",
      category: "Programming",
      readTime: 8,
    },
  ];

  // Use latest blog as featured: prefer Medium post, otherwise use first sample blog
  const featuredBlog = mediumBlogs.length > 0 ? mediumBlogs[0] : blogs.length > 0 ? blogs[0] : null;

  // Determine which blogs to use and filter them
  const blogsToDisplay = mediumBlogs.length > 0 ? mediumBlogs : blogs;
  const filteredBlogs = filter === "all"
    ? blogsToDisplay
    : blogsToDisplay.filter(blog => (blog.category || "").toLowerCase() === filter);

  const categories = mediumBlogs.length > 0 ? availableCategories : [
    "all",
    "Web Development",
    "Machine Learning",
    "Cybersecurity",
    "Emerging Tech",
    "Programming",
  ];

  return (
  <div className="relative min-h-screen w-full font-sans text-white">
      {/* Background shapes for decoration */}
  <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-60 left-10 w-80 h-80 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-400 rounded-full blur-3xl"></div>
      </div>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Our Blogs
            </h1>
            <div className="max-w-3xl mx-auto">
              <div className="glass-light mx-auto">
                <p className="text-lg md:text-xl text-gray-800">
                  Insights, tutorials, and stories from our community of tech
                  enthusiasts. Stay updated with the latest in technology and
                  innovation.
                </p>
              </div>
            </div>
          </div>

          {/* Featured Blog (only show if we have a featured post from Medium) */}
          {featuredBlog && <FeaturedBlog {...featuredBlog} />}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
              <p className="mt-4 text-gray-200">Loading blogs from Medium...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-300 mb-4">
                Unable to load Medium blogs. Showing sample blogs instead.
              </p>
            </div>
          )}

          {/* Filter Buttons */}
          {!loading && (
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter((category || "").toLowerCase())}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    filter === (category || "").toLowerCase()
                      ? "bg-purple-500 text-white shadow-lg scale-105"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          )}

          {/* Blogs Grid */}
          {!loading && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog, index) => (
                  <BlogCard key={index} {...blog} />
                ))}
              </div>
              
              {/* No results message */}
              {filteredBlogs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-300">No blogs found in this category.</p>
                </div>
              )}
            </>
          )}

          {/* Newsletter Subscription */}
          <div className="mt-16 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-opacity-20 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20">
            <h2 className="text-3xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <div className="max-w-2xl mx-auto">
              <div className="glass-light mx-auto mb-6">
                <p className="text-lg text-gray-800">
                  Get the latest blog posts, event updates, and tech news delivered
                  straight to your inbox every week!
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-gray-300 backdrop-blur-sm"
                style={{ WebkitTextFillColor: 'white' }}
              />
              <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
