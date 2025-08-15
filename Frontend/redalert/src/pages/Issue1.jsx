import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideNavbar from "../components/SideNav";

export default function IssueDetails() {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    const fetchIssue = async () => {
      const response = await fetch("/issues.json");
      const data = await response.json();
      const foundIssue = data.find((item) => item.id === Number(id));
      setIssue(foundIssue);
    };
    fetchIssue();
  }, [id]);

  if (issue === null) {
    return <div className="p-6">Loading...</div>;
  }
  if (!issue) {
    return <div className="p-6">Issue not found</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main Content */}
      <div className="flex-grow">
        {/* Top App Bar */}
        <div className="bg-white border-b-4 border-[#af8fe9] shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-xl font-bold text-[#af8fe9]">#{issue.id}</h1>
          </div>
        </div>

        {/* Page Body */}
        <div className="p-6 space-y-6">
          {/* Service Title */}
          <h1 className="text-3xl font-bold text-gray-800">{issue.title}</h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {issue.tags.map((tag, index) => (
              <span
                key={index}
                className={`px-4 py-1 rounded-full text-sm font-medium ${tag.color}`}
              >
                {tag.text}
              </span>
            ))}
          </div>

          {/* Description & Images */}
          <div className="grid grid-cols-5 gap-6">
            {/* Left - Description */}
            <div className="col-span-3">
              <p className="whitespace-pre-wrap text-gray-700 text-lg leading-relaxed">
                {issue.description}
              </p>

              {/* Timestamp + Accept Button */}
              <div className="flex items-center justify-between mt-8">
                <span className="text-gray-600 font-medium">
                  Raised: {issue.timestamp}
                </span>
                <button className="bg-[#af8fe9] hover:bg-[#946fd1] text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Accept
                </button>
              </div>
            </div>

            {/* Right - Images */}
            <div className="col-span-2 flex flex-col gap-4 items-center">
              {issue.images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Issue Image ${idx + 1}`}
                  className="w-4/5 h-auto object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
