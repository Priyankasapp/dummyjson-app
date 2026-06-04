import React, {useEffect, useState} from 'react';
import {useProduct} from "../context/ProductContext";


const CommentList = () => {
    const {
    loading,
    error,
    comments,
    totalComments,
    fetchComments,
  } = useProduct();

  const [skip, setSkip] = useState(0);
  const [selectedComment, setSelectedComment] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
  const limit=20;

  useEffect(() => {
    fetchComments(skip, limit);
  }, [skip]);
  const openModal = (comment) => {
  setSelectedComment(comment);
  setIsModalOpen(true);
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  setSelectedComment(null);
  setIsModalOpen(false);
  document.body.style.overflow = "unset";
};

useEffect(() => {
  const handleEsc = (e) => {
    if (e.key === "Escape") {
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
        <h2 className="text-lg font-semibold">Loading Comments...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Error: {error}
      </div>
    );
  }

  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.max(1, Math.ceil(totalComments / limit));
  const canPrev = skip > 0;
  const canNext = skip + limit < totalComments;

  return (
    <>
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Comments</h1>
        <p className="text-gray-500 mt-2">
          Showing {comments?.length || 0} of {totalComments} comments
        </p>
      </div>

      <div className="grid gap-6">
        {comments?.length > 0 ? (
          comments.map((comment) => (
            <article
              key={comment.id}
               onClick={() => openModal(comment)}
              className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 hover:shadow-lg transition"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Comment ID: {comment.id}
                  </p>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {comment.user?.fullName || comment.user?.username || 'Unknown User'}
                  </h2>
                  {comment.user?.username && (
                    <p className="text-sm text-gray-500">@{comment.user.username}</p>
                  )}
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                    👍 {comment.likes ?? 0}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">
                    Post {comment.postId}
                  </span>
                </div>
              </div>

              <p className="mt-5 text-gray-700 leading-7">{comment.body}</p>

              <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-500">
                <span>User ID: {comment.user?.id ?? '—'}</span>
                <span>Post ID: {comment.postId ?? '—'}</span>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-16 text-gray-500">
            No comments available.
          </div>
        )}
      </div>

     
    </section>

    {isModalOpen && selectedComment && (
  <div className="fixed inset-0 z-50 overflow-y-auto">

    {/* Backdrop */}
    <div
      className="fixed inset-0 bg-black/50"
      onClick={closeModal}
    ></div>

    {/* Modal */}
    <div className="flex min-h-full items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
        >
          ×
        </button>

        <div className="p-6">

          {/* User Info */}
          <div className="border-b pb-4 mb-4">
            <h2 className="text-2xl font-bold">
              {selectedComment.user?.fullName ||
                selectedComment.user?.username ||
                "Unknown User"}
            </h2>

            {selectedComment.user?.username && (
              <p className="text-gray-500">
                @{selectedComment.user.username}
              </p>
            )}
          </div>

          {/* Comment Content */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">
              Comment
            </h3>

            <p className="text-gray-700 leading-7">
              {selectedComment.body}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-b py-4">

            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {selectedComment.likes || 0}
              </div>
              <div className="text-sm text-gray-500">
                Likes
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {selectedComment.id}
              </div>
              <div className="text-sm text-gray-500">
                Comment ID
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {selectedComment.postId}
              </div>
              <div className="text-sm text-gray-500">
                Post ID
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {selectedComment.user?.id || "-"}
              </div>
              <div className="text-sm text-gray-500">
                User ID
              </div>
            </div>

          </div>

          {/* Additional Details */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-3">
              Details
            </h3>

            <div className="space-y-2 text-gray-600">

              <p>
                <strong>User Name:</strong>{" "}
                {selectedComment.user?.fullName ||
                  selectedComment.user?.username}
              </p>

              <p>
                <strong>Username:</strong>{" "}
                @{selectedComment.user?.username}
              </p>

              <p>
                <strong>Comment ID:</strong>{" "}
                {selectedComment.id}
              </p>

              <p>
                <strong>Post ID:</strong>{" "}
                {selectedComment.postId}
              </p>

              <p>
                <strong>Total Likes:</strong>{" "}
                {selectedComment.likes}
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
)}
    </>
  );
}

export default CommentList
