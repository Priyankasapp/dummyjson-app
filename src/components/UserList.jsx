import React, { useEffect, useState } from "react";
import { useProduct } from "../context/ProductContext";

const UserList = () => {
  const { users, loading, error, totalUsers, fetchUsers } = useProduct();

  const [skip, setSkip] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const limit=20;

  useEffect(() => {
    fetchUsers(skip, limit);
  }, [skip]);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedUser(null);
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
        <h2 className="text-lg font-semibold">Loading Users...</h2>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  return (
    <>
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Users</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users?.map((user) => (
          <div
            key={user.id}
             onClick={() => openModal(user)}
            className="bg-white rounded-2xl shadow-md border p-5 hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={user.image}
                alt={user.firstName}
                className="w-16 h-16 rounded-full border"
              />

              <div>
                <h2 className="text-lg font-bold">
                  {user.firstName} {user.lastName}
                </h2>

                <p className="text-sm text-gray-500">@{user.username}</p>

                <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  {user.role}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p>
                <strong>Phone:</strong> {user.phone}
              </p>

              <p>
                <strong>Age:</strong> {user.age}
              </p>

              <p>
                <strong>Gender:</strong> {user.gender}
              </p>

              <p>
                <strong>Blood Group:</strong> {user.bloodGroup}
              </p>

              <p>
                <strong>University:</strong> {user.university}
              </p>

              <p>
                <strong>Company:</strong> {user.company?.name}
              </p>

              <p>
                <strong>Department:</strong> {user.company?.department}
              </p>

              <p>
                <strong>Address:</strong> {user.address?.city},{" "}
                {user.address?.state}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
    
    {isModalOpen && selectedUser && (
  <div className="fixed inset-0 z-50 overflow-y-auto">
    
    {/* Backdrop */}
    <div
      className="fixed inset-0 bg-black/50"
      onClick={closeModal}
    ></div>

    {/* Modal */}
    <div className="flex min-h-full items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
        >
          ×
        </button>

        <div className="p-6">

          {/* User Header */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={selectedUser.image}
              alt={selectedUser.firstName}
              className="w-28 h-28 rounded-full border-4 border-blue-100"
            />

            <h2 className="text-2xl font-bold mt-4">
              {selectedUser.firstName} {selectedUser.lastName}
            </h2>

            <p className="text-gray-500">
              @{selectedUser.username}
            </p>

            <span className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {selectedUser.role}
            </span>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

            <div>
              <strong>Email:</strong> {selectedUser.email}
            </div>

            <div>
              <strong>Phone:</strong> {selectedUser.phone}
            </div>

            <div>
              <strong>Age:</strong> {selectedUser.age}
            </div>

            <div>
              <strong>Gender:</strong> {selectedUser.gender}
            </div>

            <div>
              <strong>Blood Group:</strong> {selectedUser.bloodGroup}
            </div>

            <div>
              <strong>Birth Date:</strong> {selectedUser.birthDate}
            </div>

            <div>
              <strong>Height:</strong> {selectedUser.height} cm
            </div>

            <div>
              <strong>Weight:</strong> {selectedUser.weight} kg
            </div>

            <div>
              <strong>Eye Color:</strong> {selectedUser.eyeColor}
            </div>

            <div>
              <strong>University:</strong> {selectedUser.university}
            </div>

          </div>

          {/* Company */}
          <div className="mt-6 border-t pt-4">
            <h3 className="font-bold text-lg mb-3">
              Company Information
            </h3>

            <p>
              <strong>Company:</strong> {selectedUser.company?.name}
            </p>

            <p>
              <strong>Department:</strong> {selectedUser.company?.department}
            </p>

            <p>
              <strong>Title:</strong> {selectedUser.company?.title}
            </p>
          </div>

          {/* Address */}
          <div className="mt-6 border-t pt-4">
            <h3 className="font-bold text-lg mb-3">
              Address
            </h3>

            <p>
              {selectedUser.address?.address}
            </p>

            <p>
              {selectedUser.address?.city},{" "}
              {selectedUser.address?.state}
            </p>

            <p>
              {selectedUser.address?.postalCode}
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
)}</>
    
  );
};

export default UserList;
