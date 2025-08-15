import React from "react";
import SideNavbar from "../components/SideNav";
import img1 from "../assets/hotel1.jpg";
import img2 from "../assets/hotel2.jpg";

export default function IssueDetails() {
  // Dummy data
  const issueNumber = "#1023";
  const serviceTitle = "Air Conditioner Not Working";
  const tags = [
    { text: "Open", color: "bg-green-200 text-green-800" },
    { text: "High Priority", color: "bg-[#af8fe9]/20 text-[#4f3a9a]" },
    { text: "Room 305", color: "bg-blue-200 text-blue-800" },
  ];

  const description = `
Dear [Hotel Name] Support Team,

I am currently staying in Room 412 and would like to report several issues I have experienced since my check-in yesterday afternoon. I am bringing this to your attention so it can be addressed promptly, as it has been affecting the comfort of my stay.

Firstly, the air conditioning in the room is not functioning as expected. Although I have adjusted the settings multiple times and even switched it off and on again, the temperature remains warm and stuffy, especially during the night. This has made it difficult to sleep comfortably.

Secondly, I have noticed that the bathroom faucet is leaking, causing water to accumulate on the sink counter. While it is not a major flood, it is inconvenient and causes a constant dripping sound that can be quite distracting. I have placed towels around it to contain the water, but this is not an ideal solution.

Additionally, the in-room Wi-Fi connection has been unstable. The signal keeps dropping every 15–20 minutes, making it difficult to work on my laptop or attend virtual meetings. As I am here partly for business purposes, having a reliable internet connection is very important to me.

I chose your hotel because of the positive reviews and reputation for excellent service, and I truly hope this matter can be resolved quickly. Please let me know if a maintenance team can be sent to address the air conditioning, faucet, and Wi-Fi issues today.

Thank you for your attention to this matter, and I look forward to your prompt response.
  `.trim();

  const images = [img1, img2];
  const timestamp = "Raised: 2025-08-13 14:35";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main Content */}
      <div className="flex-grow">
        {/* Top App Bar */}
        <div className="bg-white border-b-4 border-[#af8fe9] shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-xl font-bold text-[#af8fe9]">{issueNumber}</h1>
          </div>
        </div>

        {/* Page Body */}
        <div className="p-6 space-y-6">
          {/* Service Title */}
          <h1 className="text-3xl font-bold text-gray-800">{serviceTitle}</h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, index) => (
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
                {description}
              </p>

              {/* Timestamp + Accept Button */}
              <div className="flex items-center justify-between mt-8">
                <span className="text-gray-600 font-medium">{timestamp}</span>
                <button className="bg-[#af8fe9] hover:bg-[#946fd1] text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Accept
                </button>
              </div>
            </div>

            {/* Right - Images */}
            <div className="col-span-2 flex flex-col gap-4 items-center">
              {images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Issue Image ${idx + 1}`}
                  className="w-4/5 h-4/5 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
