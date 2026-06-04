import React, { useState, useEffect } from "react";
import { useProduct } from "../context/ProductContext";

const PostList = () => {
  const { post, loading, error, fetchPost, totalPost } = useProduct();

  const [skip, setSkip] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const limit = 20;

  useEffect(() => {
    fetchPost(skip, limit);
  }, [skip]);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    // Restore body scroll
    document.body.style.overflow = "unset";
  };

  // Handle escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <h2 className="text-lg font-semibold">Loading Posts...</h2>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          {/* Posts ({totalPost}) */}
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {post?.map((item) => (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-lg transition cursor-pointer hover:scale-105 transform duration-200"
            >
              <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                {item.title}
              </h2>

              <p className="text-gray-600 mb-4 line-clamp-4">{item.body}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between text-sm text-gray-500 border-t pt-3">
                <span>👍 {item.reactions?.likes || 0}</span>
                <span>👎 {item.reactions?.dislikes || 0}</span>
                <span>👁️ {item.views}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={closeModal}
                aria-label="Close modal"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <svg
                aria-hidden="true"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Modal Body */}
              <div className="p-6">
                {/* Title */}
                <h2 className="text-2xl font-bold mb-4 pr-8">
                  {selectedPost.title}
                </h2>

                {/* Tags */}
                {selectedPost.tags && selectedPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Content */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">
                    Content
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedPost.body}
                  </p>
                </div>

                {/* Reactions and Views */}
                <div className="border-t pt-4">
                  <div className="flex gap-6 justify-around">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {selectedPost.reactions?.likes || 0}
                      </div>
                      <div className="text-sm text-gray-500">Likes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {selectedPost.reactions?.dislikes || 0}
                      </div>
                      <div className="text-sm text-gray-500">Dislikes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedPost.views || 0}
                      </div>
                      <div className="text-sm text-gray-500">Views</div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                {selectedPost.userId && (
                  <div className="mt-4 text-sm text-gray-400 text-center border-t pt-4">
                    Post ID: {selectedPost.id} | User ID: {selectedPost.userId}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostList;
