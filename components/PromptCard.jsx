"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import tick from "@/public/icons/tick.svg";
import copy_ from "@/public/icons/copy.svg";

const PromptCard = ({
  post,
  handleTagClick,
  searchByUserName,
  handleEdit,
  handleDelete,
}) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  // const postTags = post?.tag.split(",");
  // const postTagWithHash = postTags.map((p) => " #" + p);
  // const Tags = postTagWithHash.toString();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  return (
    <>
      <div className="prompt_card">
        <div className="flex justify-between items-start gap-5">
          <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
            <Image
              src={post.creator.image}
              alt="user_img"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
            <div className="flex flex-col">
              <h3
                onClick={() => router.push(`/users/${post?.creator._id}`)}
                className="font-satoshi font-semibold text-gray-900"
              >
                {post.creator.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {post.creator.email}
              </p>
            </div>
          </div>
          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={copied === post.prompt ? tick : copy_}
              width={20}
              height={20}
              alt={post.tag}
            />
          </div>
        </div>
        <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
        <p
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          {post.tag}
        </p>
        {session?.user?.id === post?.creator._id && pathName === "/profile" && (
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="text-white px-4 py-1 rounded-md mt-2 bg-blue-500 hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-white px-4 py-1 rounded-md mt-2 bg-red-500 hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PromptCard;
