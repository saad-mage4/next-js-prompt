"use client";
import { useEffect, useState } from "react";
import PromptCard from "@/components/PromptCard";

const page = ({ params }) => {
  const [userPost, setUserPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/user/${params.id}/posts`);
      const data = await response.json();
      setUserPost(data);
    };
    fetchPosts();
  }, [params.id]);

  console.log(userPost);

  return (
    <>
      <div className="mt-16 w-full gap-4 prompt_layout">
        {userPost.map((post) => (
          <PromptCard key={post._id} post={post} />
        ))}
      </div>
    </>
  );
};

export default page;
