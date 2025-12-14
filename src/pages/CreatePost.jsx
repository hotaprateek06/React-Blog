import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost({ addPost }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !content) {
      alert("All fields are required");
      return;
    }

    addPost({
      id: Date.now(),
      title,
      description,
      content,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });

    navigate("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 px-4">
      <div className="w-full max-w-xl bg-gray-800/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">
          Create Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <textarea
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 h-32"
            placeholder="Full Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* 🏷 TAGS */}
          <input
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
            placeholder="Tags (comma separated e.g. react,js,ui)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
