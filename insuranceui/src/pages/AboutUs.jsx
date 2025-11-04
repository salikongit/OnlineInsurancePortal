import React from "react";
import salikpic from "../assets/salikpic.png";
import abhishekhpic from "../assets/abhishekhpic.png";
import Tejas from "../assets/Tejas.png";

const teamMembers = [
  {
    name: "Mohammad Salik Mulla",
    github: "https://github.com/salikongit",
    linkedin: "https://www.linkedin.com/in/mohammad-salik-mulla-b81657233/",
    skills:
      "Java, HTML, CSS, JavaScript, React, NodeJS, ExpressJS, MySQL, MongoDB",
    role: "UI Development and API Testing",
    img: salikpic, // Replace with your actual photo URL later
  },
  {
    name: "Tejas Anil Jadhao",
    github: "https://github.com/tejas300102",
    linkedin:
      "https://www.linkedin.com/in/tejas-jadhao-993656291?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    skills:
      "Java, HTML, CSS, JavaScript, React, NodeJS, ExpressJS, MySQL, MongoDB",
    role: "Backend Development and API Testing",
    img: Tejas,
  },
  {
    name: "Abhishek Dasondhi",
    github: "https://github.com/abhishekshahab",
    linkedin: "https://www.linkedin.com/in/abhishek-dasondhi-3559b537b",
    skills:
      "Java, HTML, CSS, JavaScript, React, NodeJS, ExpressJS, MySQL, MongoDB",
    role: "ER Diagram, SDM, API Testing, Database Design",
    img: abhishekhpic,
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen  bg-gray-50 text-gray-800 flex flex-col items-center py-16 px-6 ">
      <h1 className="text-4xl md:text-5xl mt-10 font-bold mb-4 text-center">
        Meet Our Developers
      </h1>
      <p className="text-gray-600 text-center max-w-2xl mb-12">
        We are a passionate team of developers who collaborated to build this
        project with dedication, creativity, and technical expertise.
      </p>

      {/* Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-7xl">
        {teamMembers.map((member, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-2xl p-8 flex flex-col items-center hover:shadow-xl transition-all"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-42 h-54 rounded-full object-cover border-4 border-indigo-500 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {member.name}
            </h2>
            <p className="text-indigo-600 font-medium mb-2">{member.role}</p>

            <div className="flex gap-4 mb-3">
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-black transition-all"
              >
                <i className="fab fa-github text-2xl"></i>
              </a>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-all"
              >
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
            </div>

            <p className="text-sm text-gray-600 text-center">
              <span className="font-medium">Skills:</span> {member.skills}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
