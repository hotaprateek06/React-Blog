import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home({ posts, deletePost, loading, showToast }) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState(null);

  /* ❤️ Likes */
  const [likes, setLikes] = useState(() => {
    return JSON.parse(localStorage.getItem("likes")) || {};
  });

  /* 🔖 Bookmarks */
  const [bookmarks, setBookmarks] = useState(() => {
    return JSON.parse(localStorage.getItem("bookmarks")) || {};
  });

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleLike = (id) => {
    setLikes((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      showToast(updated[id] ? "Added to liked posts ❤️" : "Removed from likes");
      return updated;
    });
  };

  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      showToast(
        updated[id]
          ? "Added to bookmarks 🔖"
          : "Removed from bookmarks"
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
          <h1 className="text-4xl font-extrabold mb-8 text-center">
            Blog Home
          </h1>

          <input
            placeholder="Search posts..."
            className="w-full mb-6 p-3 rounded-xl bg-gray-800 border border-gray-700 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {activeTag && (
            <button
              onClick={() => setActiveTag(null)}
              className="mb-6 px-4 py-1 rounded-full bg-blue-600 text-white text-sm"
            >
              #{activeTag} ✕
            </button>
          )}

          {loading && (
            <div className="w-full flex flex-col gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-32 bg-gray-800 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          )}

          {!loading && filteredPosts.length === 0 && (
            <p className="text-gray-400 mt-20">No posts found</p>
          )}

          {!loading && (
            <div className="w-full flex flex-col gap-8">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-800/90 p-6 rounded-2xl shadow-lg text-center"
                >
                  <h2 className="text-2xl font-bold">{post.title}</h2>
                  <p className="text-gray-300 mt-3">{post.description}</p>

                  {post.tags?.length > 0 && (
                    <div className="flex justify-center gap-2 mt-4 flex-wrap">
                      {post.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setActiveTag(tag)}
                          className="px-3 py-1 text-xs rounded-full bg-gray-700 hover:bg-blue-600"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-center gap-8 mt-6 items-center">
                    <Link to={`/post/${post.id}`} className="text-blue-400">
                      Read
                    </Link>

                    <Link to={`/edit/${post.id}`} className="text-yellow-400">
                      Edit
                    </Link>

                    <button
                      onClick={() => deletePost(post.id)}
                      className="text-red-400"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`text-xl ${
                        likes[post.id] ? "text-red-500" : "text-gray-400"
                      }`}
                    >
                      ❤️
                    </button>

                    <button
                      onClick={() => toggleBookmark(post.id)}
                      className={`text-xl ${
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
