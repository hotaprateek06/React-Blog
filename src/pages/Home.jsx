import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home({ posts, deletePost, loading, showToast }) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState(null);

  const [likes, setLikes] = useState(() => {
    return JSON.parse(localStorage.getItem("likes")) || {};
  });

  const [bookmarks, setBookmarks] = useState(() => {
    return JSON.parse(localStorage.getItem("bookmarks")) || {};
  });

  const toggleLike = (id) => {
    setLikes((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem("likes", JSON.stringify(updated));

      showToast(
        updated[id]
          ? "❤️ Added to liked posts"
          : "💔 Removed from liked posts"
      );

      return updated;
    });
  };

  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem("bookmarks", JSON.stringify(updated));

      showToast(
        updated[id]
          ? "🔖 Added to bookmarks"
          : "❌ Removed from bookmarks"
      );

      return updated;
    });
  };

  const filteredPosts = posts.filter((p) => {
    const searchMatch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());

    const tagMatch = activeTag ? p.tags?.includes(activeTag) : true;
    return searchMatch && tagMatch;
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66')",
      }}
    >
      <div className="min-h-screen w-full bg-gray-900/85 flex justify-center px-4 py-12">
        <div className="w-full max-w-3xl flex flex-col items-center">
          <h1 className="text-4xl font-extrabold mb-8">Blog Home</h1>

          <input
            placeholder="Search posts..."
            className="w-full mb-6 p-3 rounded-xl bg-gray-800 border border-gray-700 text-center"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {!loading && (
            <div className="w-full flex flex-col gap-8">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-800/90 p-6 rounded-2xl text-center"
                >
                  <h2 className="text-2xl font-bold">{post.title}</h2>
                  <p className="text-gray-300 mt-3">{post.description}</p>

                  <div className="flex justify-center gap-8 mt-6 items-center">
                    <Link to={`/post/${post.id}`} className="text-blue-400">
                      Read
                    </Link>

                    <Link to={`/edit/${post.id}`} className="text-yellow-400">
                      Edit
                    </Link>

                    <button
                      onClick={() => deletePost(post.id)}
                      className="text-red-400 cursor-pointer"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`cursor-pointer text-xl ${
                        likes[post.id] ? "text-red-500" : "text-gray-400"
                      }`}
                    >
                      ❤️
                    </button>

                    <button
                      onClick={() => toggleBookmark(post.id)}
                      className={`cursor-pointer text-xl ${
                        bookmarks[post.id]
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                    >
                      🔖
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
