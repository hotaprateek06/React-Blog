import { Link } from "react-router-dom";

function Profile({ posts }) {
  const likes = JSON.parse(localStorage.getItem("likes")) || {};
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};

  const likedPosts = posts.filter((p) => likes[p.id]);
  const bookmarkedPosts = posts.filter((p) => bookmarks[p.id]);

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-12 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">
          👤 My Profile
        </h1>

        {/* ❤️ Liked */}
        <Section title="❤️ Liked Posts" items={likedPosts} />

        {/* 🔖 Bookmarked */}
        <Section title="🔖 Bookmarked Posts" items={bookmarkedPosts} />
      </div>
    </div>
  );
}

function Section({ title, items }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      {items.length === 0 ? (
        <p className="text-gray-400">No posts here.</p>
      ) : (
        <div className="grid gap-4">
          {items.map((post) => (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              className="block bg-gray-800 p-4 rounded-xl hover:scale-[1.02] transition"
            >
              <h3 className="font-bold">{post.title}</h3>
              <p className="text-gray-400 text-sm">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
