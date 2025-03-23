"use client";

import React, { useState, useEffect } from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { X, Users, Megaphone } from "lucide-react"; // Added Users and Megaphone icons
import AboutUs1 from "./Aboutus1";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  department?: "frontend" | "backend" | "ui" | "hr" | "marketing";
  linkedin?: string;
  twitter?: string;
  github?: string;
  bio?: string;
}

interface TeamData {
  founders: TeamMember[];
  hrTeam: TeamMember[];
  marketingTeam: TeamMember[];
  developmentTeam: {
    frontend: TeamMember[];
    backend: TeamMember[];
    ui: TeamMember[];
  };
}

type Department = "all" | "frontend" | "backend" | "ui";

interface ProfileModalProps {
  member: TeamMember;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ member, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
          title="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {member.name}
              </h2>
              <p className="text-xl text-blue-600 mb-4">{member.role}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  About
                </h3>
                <p className="text-gray-600 leading-relaxed text-justify">
                  {member.bio || "No bio available"}
                </p>
              </div>

              <div className="flex justify-center md:justify-start space-x-6">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FaLinkedin className="w-6 h-6" />
                    <span>LinkedIn</span>
                  </a>
                )}

                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors"
                  >
                    <FaGithub className="w-6 h-6" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AboutUs() {
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [activeDepartment, setActiveDepartment] = useState<Department>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    fetch("/data/teamData.json")
      .then((response) => response.json())
      .then((data) => {
        setTeamData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Failed to load team data</p>
      </div>
    );
  }

  const getAllTeamMembers = () => {
    return [
      ...teamData.developmentTeam.frontend,
      ...teamData.developmentTeam.backend,
      ...teamData.developmentTeam.ui,
    ];
  };

  const getFilteredMembers = () => {
    if (activeDepartment === "all") {
      return getAllTeamMembers();
    }
    return teamData.developmentTeam[activeDepartment];
  };

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
  };

  const TeamSection = ({
    title,
    icon: Icon,
    members,
  }: {
    title: string;
    icon: any;
    members: TeamMember[];
  }) => (
    <div className="mb-20">
      <div className="flex items-center justify-center mb-8">
        <Icon className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-8 mb-8">
        {members &&
          members.map((member) => (
            <div
              key={member.name}
              className="w-64 bg-white rounded-xl shadow-lg transform transition-all hover:scale-105 cursor-pointer"
              onClick={() => handleMemberClick(member)}
            >
              <div className="p-6 text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {member.name}
                </h3>
                <p className="text-blue-600 mt-1">{member.role}</p>
                <div className="mt-4 flex justify-center space-x-4">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaLinkedin className="text-blue-600 w-5 h-5 hover:text-blue-800" />
                    </a>
                  )}

                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub className="text-gray-800 w-5 h-5 hover:text-gray-900" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="w-px h-16 bg-gray-300 mx-auto"></div>
    </div>
  );

  return (
    <>
      <AboutUs1 />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h1>
            <p className="text-xl text-gray-600">
              Meet the amazing people behind our success
            </p>
          </div>

          {/* Founders Section 
          <TeamSection
            title="Founder & Co-founder"
            icon={FaBriefcase}
            members={teamData.founders}
          />*/}

          {/* HR Section */}
          <TeamSection
            title="Human Resources"
            icon={Users}
            members={teamData.hrTeam}
          />

          {/* Marketing Section */}
          <TeamSection
            title="Marketing Team"
            icon={Megaphone}
            members={teamData.marketingTeam}
          />

          {/* Team Members Section */}
          <div>
            <div className="flex items-center justify-center mb-8">
              <AiOutlineTeam className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Development Team
              </h2>
            </div>

            {/* Sliding Filter Buttons */}
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 p-1 rounded-full flex space-x-1">
                {["all", "frontend", "backend", "ui"].map((dept) => (
                  <button
                    type="button"
                    key={dept}
                    onClick={() => setActiveDepartment(dept as Department)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${
                      activeDepartment === dept
                        ? "bg-white text-blue-600 shadow-md transform scale-105"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {dept.charAt(0).toUpperCase() + dept.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
              {getFilteredMembers().map((member) => (
                <div
                  key={member.name}
                  className="w-64 bg-white rounded-xl shadow-lg transform transition-all hover:scale-105 cursor-pointer"
                  onClick={() => handleMemberClick(member)}
                >
                  <div className="p-6 text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 mt-1">{member.role}</p>

                    {/* Social Media Links */}
                    <div className="mt-4 flex justify-center space-x-4">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaLinkedin className="text-blue-600 w-5 h-5 hover:text-blue-800" />
                        </a>
                      )}

                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaGithub className="text-gray-800 w-5 h-5 hover:text-gray-900" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Modal */}
        {selectedMember && (
          <ProfileModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </div>
    </>
  );
}
