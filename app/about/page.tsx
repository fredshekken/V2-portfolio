import Image from "next/image";
import Link from "next/link";

const resumeSections = [
  {
    title: "Professional Summary",
    text: "Front-end developer and UI/UX designer dedicated to blending bold, modern interfaces with intuitive user experiences. Experienced in architecting clean, accessible systems—from complex administrative dashboards like Gracewell NEXUS to modern e-commerce concepts like BeU Eyewear—ensuring digital products are as comfortable to navigate as they are visually engaging.",
  },
  {
    title: "Skills",
    text: "Languages: JavaScript, Python, Java, C, C++, SQL, HTML, CSS\nFrameworks: React.js, Next.js, Node.js, Express.js\nTools & Platforms: Git/GitHub, VS Code, Unity, Godot, Vercel, Supabase (PostgreSQL), Render, Playwright, Shortcut\nDesign & Hardware: Figma, Canva, GIMP, Arduino, VEX IQ",
  },
  {
    title: "Educational Background",
    text: "Pamantasan ng Lungsod ng Maynila, Intramuros, Manila\nBachelor of Science in Computer Science, Expected 2027",
  },
  {
    title: "Work Experience",
    text: "Quality Assurance Intern, One PHP Technology (May 2026 – Present)\n• Conduct manual functional testing and develop automated end-to-end (E2E) test suites using Playwright.\n• Track, document, and manage bugs and regressions using Shortcut to streamline fixes with engineering.\n\nRobotics Intern, Hytec Power Inc., 2023\n• Designed, built, and programmed ADOBOT, a VEX IQ robot that autonomously completes an obstacle course.",
  },
  {
    title: "Seminars / Training",
    text: "Data Science & AI Career Bootcamp, 21 July 2022",
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
              src="/MAGAAN-1X1.png"
              alt="Ida Magaan profile photo"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="card-copy">
            <p className="eyebrow">Profile</p>
            <p>
              Front-end developer and UI/UX designer crafting intuitive, accessible digital experiences and modern web systems.
            </p>
            <Link className="text-button" href="/contact">
              Get in touch
            </Link>
          </div>
        </section>
        <section className="about-card resume-card">
          {resumeSections.map((section) => (
            <div className="resume-section" key={section.title}>
              <h2>{section.title}</h2>
              <p className="resume-text" style={{ whiteSpace: "pre-line" }}>
                {section.text}
              </p>
            </div>
          ))}
          <Link className="text-button" href="/">
            Back to home
          </Link>
        </section>
      </div>
    </main>
  );
}