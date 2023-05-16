"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [myPosts, setMyPosts] = useState([]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to your profile page!"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
