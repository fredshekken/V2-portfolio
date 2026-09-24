import Image from "next/image";
import Link from "next/link";

const resumeSections = [
  {
    title: "Professional Summary",
    text: "[PLACEHOLDER, to be provided]",
  },
  {
    title: "Skills",
    text: "Languages: JavaScript, Python, Java, C, C++, SQL, HTML, CSS\nFrameworks: React.js, Next.js, Node.js, Express.js\nTools & Platforms: Git/GitHub, VS Code, Unity, Vercel, Supabase (PostgreSQL), Render\nDesign & Hardware: Figma, Canva, GIMP, Arduino, VEX IQ",
  },
  {
    title: "Educational Background",
    text: "Pamantasan ng Lungsod ng Maynila, Intramuros, Manila\nBachelor of Science in Computer Science, Expected 2027",
  },
  {
    title: "Work Experience",
    text: "[PLACEHOLDER: One PHP Technology OJT, role and dates to be provided]\nRobotics Intern, Hytec Power Inc., 2023\nDesigned, built, and programmed ADOBOT, a VEX IQ robot that autonomously completes an obstacle course.",
  },
  {
    title: "Seminars / Training",
    text: "Data Science & AI Career Bootcamp, 21 July 2022\n[MORE TO BE ADDED]",
  },
];

export default function AboutPage() {
  return (
    <main className="page-shell page-content">
      <div className="page-intro">
        <p className="eyebrow">About the maker</p>
        <h1 className="page-title">A short resume, thoughtfully arranged.</h1>
      </div>
      <div className="about-grid">
        <section className="about-card photo-card">
          <div className="image-frame profile-frame">
            <Image
              src="/profile.jpg"
              alt="Placeholder personal profile"
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="card-copy">
            <p className="eyebrow">Profile</p>
            <p>Computer Science student building practical skills through software development, robotics, and creative technology projects.</p>
            <Link className="text-button" href="/contact">Get in touch</Link>
          </div>
        </section>
        <section className="about-card resume-card">
          {resumeSections.map((section) => (
            <div className="resume-section" key={section.title}>
              <h2>{section.title}</h2>
              <p className="resume-text">{section.text}</p>
            </div>
          ))}
          <Link className="text-button" href="/">Back to home</Link>
        </section>
      </div>
    </main>
  );
}
