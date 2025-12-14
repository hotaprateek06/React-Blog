import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function EditPost({ posts, updatePost }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === Number(id));
  if (!post) return <p className="text-center mt-20">Post not found</p>;

  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [content, setContent] = useState(post.content);

  const handleUpdate = () => {
    updatePost({ id: post.id, title, description, content });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">
          Edit Post
        </h1>

        <input
          className="w-full p-3 mb-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full p-3 mb-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
          className="w-full p-3 mb-4 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900 h-32"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={handleUpdate}
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Update Post
        </button>
      </div>
    </div>
  );
}

export default EditPost;
