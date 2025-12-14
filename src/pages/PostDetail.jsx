import { useParams, Link } from "react-router-dom";

function PostDetail({ posts }) {
  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Post not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-12">
      {/* HERO CARD */}
      <div className="max-w-3xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-10">
        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white text-center leading-snug">
          {post.title}
        </h1>

        {/* Divider */}
        <div className="h-1 w-20 bg-blue-500 mx-auto mb-8 rounded"></div>

        {/* Content */}
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {post.content}
        </p>

        {/* Footer */}
        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-block px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
