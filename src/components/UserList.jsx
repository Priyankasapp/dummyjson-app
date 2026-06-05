import React, { useEffect, useState } from "react";
// import { useProduct } from "../context/ProductContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/users/userSlice";
import { motion, AnimatePresence } from "framer-motion";

const UserList = () => {

  const dispatch = useDispatch();

  const { users, loading, error, totalUsers } = useSelector(
    (state) => state.users,
  );

  const [skip, setSkip] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const limit = 20;



  useEffect(() => {
    dispatch(
      fetchUsers({
        skip,
        limit,
      }),
    );
  }, [dispatch, skip, limit]);

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalContentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex justify-center items-center py-10 min-h-screen"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-b-2 border-blue-600"
        />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="text-center text-red-500 py-10"
      >
        Error: {error}
      </motion.div>
    );
  }

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          Users
        </motion.h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {users?.map((user) => (
              <motion.div
                key={user.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover="hover"
                whileTap="tap"
                onClick={() => openModal(user)}
                className="bg-white rounded-2xl shadow-md border p-5 hover:shadow-xl transition-shadow cursor-pointer"
              >
                <motion.div className="flex items-center gap-4 mb-4">
                  <motion.img
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    src={user.image}
                    alt={user.firstName}
                    className="w-16 h-16 rounded-full border-2 border-blue-200"
                  />

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-lg font-bold"
                    >
                      {user.firstName} {user.lastName}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="text-sm text-gray-500"
                    >
                      @{user.username}
                    </motion.p>

                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ scale: 1.05 }}
                      className="inline-block mt-1 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
                    >
                      {user.role}
                    </motion.span>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-2 text-sm"
                >
                  {[
                    { label: "Email", value: user.email },
                    { label: "Phone", value: user.phone },
                    { label: "Age", value: user.age },
                    { label: "Gender", value: user.gender },
                    { label: "Blood Group", value: user.bloodGroup },
                    { label: "University", value: user.university },
                    { label: "Company", value: user.company?.name },
                    { label: "Department", value: user.company?.department },
                    {
                      label: "Address",
                      value: `${user.address?.city}, ${user.address?.state}`,
                    },
                  ].map((item, index) => (
                    <motion.p
                      key={item.label}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.03 }}
                    >
                      <strong>{item.label}:</strong> {item.value || "N/A"}
                    </motion.p>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.section>

      {/* Modal with Animations */}
      <AnimatePresence>
        {isModalOpen && selectedUser && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <motion.button
                  onClick={closeModal}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
                >
                  ×
                </motion.button>

                <div className="p-6">
                  {/* User Header */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col items-center mb-6"
                  >
                    <motion.img
                      initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.15,
                      }}
                      src={selectedUser.image}
                      alt={selectedUser.firstName}
                      className="w-28 h-28 rounded-full border-4 border-blue-100"
                    />

                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-bold mt-4"
                    >
                      {selectedUser.firstName} {selectedUser.lastName}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.25 }}
                      className="text-gray-500"
                    >
                      @{selectedUser.username}
                    </motion.p>

                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {selectedUser.role}
                    </motion.span>
                  </motion.div>

                  {/* Details Grid */}
                  <motion.div
                    variants={modalContentVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.35 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
                  >
                    {[
                      { label: "Email", value: selectedUser.email },
                      { label: "Phone", value: selectedUser.phone },
                      { label: "Age", value: selectedUser.age },
                      { label: "Gender", value: selectedUser.gender },
                      { label: "Blood Group", value: selectedUser.bloodGroup },
                      { label: "Birth Date", value: selectedUser.birthDate },
                      { label: "Height", value: `${selectedUser.height} cm` },
                      { label: "Weight", value: `${selectedUser.weight} kg` },
                      { label: "Eye Color", value: selectedUser.eyeColor },
                      { label: "University", value: selectedUser.university },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                        className="bg-gray-50 p-2 rounded"
                      >
                        <strong>{item.label}:</strong> {item.value || "N/A"}
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Company Information */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 border-t pt-4"
                  >
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-bold text-lg mb-3"
                    >
                      Company Information
                    </motion.h3>

                    {[
                      { label: "Company", value: selectedUser.company?.name },
                      {
                        label: "Department",
                        value: selectedUser.company?.department,
                      },
                      { label: "Title", value: selectedUser.company?.title },
                    ].map((item, index) => (
                      <motion.p
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.55 + index * 0.05 }}
                      >
                        <strong>{item.label}:</strong> {item.value || "N/A"}
                      </motion.p>
                    ))}
                  </motion.div>

                  {/* Address */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 }}
                    className="mt-6 border-t pt-4"
                  >
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-bold text-lg mb-3"
                    >
                      Address
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      {selectedUser.address?.address}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.75 }}
                    >
                      {selectedUser.address?.city},{" "}
                      {selectedUser.address?.state}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      {selectedUser.address?.postalCode}
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserList;
