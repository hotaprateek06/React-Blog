import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home({ posts, deletePost, loading }) {
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
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBookmark = (id) => {
    setBookmarks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  /* 🔍 Search + Tag Filter */
  const filteredPosts = posts.filter((p) => {
    const searchMatch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());

    const tagMatch = activeTag
      ? p.tags?.includes(activeTag)
      : true;

    return searchMatch && tagMatch;
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66')",
      }}
    >
      <div className="min-h-screen w-full bg-gray-900/85 backdrop-blur-sm flex justify-center px-4 py-12">
        <div className="w-full max-w-3xl flex flex-col items-center">
          <h1 className="text-4xl font-extrabold mb-8 text-center">
            Blog Home
          </h1>

          {/* 🔍 Search */}
          <input
            placeholder="Search posts..."
            className="w-full mb-6 p-3 rounded-xl bg-gray-800 border border-gray-700 text-center
                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* 🏷 Active Tag */}
          {activeTag && (
            <div className="mb-6">
              <button
                onClick={() => setActiveTag(null)}
                className="px-4 py-1 rounded-full bg-blue-600 text-white text-sm"
              >
                #{activeTag} ✕
              </button>
            </div>
          )}

          {/* 🦴 Skeleton */}
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

          {/* Empty State */}
          {!loading && filteredPosts.length === 0 && (
            <div className="flex flex-col items-center text-gray-400 mt-20">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-lg font-medium">No posts found</p>
              <p className="text-sm mt-1">
                Try changing search or tag
              </p>
            </div>
          )}

          {/* Posts */}
          {!loading && (
            <div className="w-full flex flex-col gap-8">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-800/90 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center
                             transition-all duration-300
                             hover:scale-[1.03] hover:shadow-blue-500/30 hover:shadow-2xl"
                >
                  <h2 className="text-2xl font-bold">
                    {post.title}
                  </h2>

                  <p className="text-gray-300 mt-3">
                    {post.description}
                  </p>

                  {/* 🏷 Tags */}
                  {post.tags?.length > 0 && (
                    <div className="flex justify-center gap-2 mt-4 flex-wrap">
                      {post.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setActiveTag(tag)}
                          className="px-3 py-1 text-xs rounded-full bg-gray-700 hover:bg-blue-600 transition"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-center gap-8 mt-6 text-sm font-medium items-center">
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
