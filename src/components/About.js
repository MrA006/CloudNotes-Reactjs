import React from "react";
import { 
  FiInfo, 
  FiType, 
  FiCloud, 
  FiUsers, 
  FiTag, 
  FiBookOpen 
} from "react-icons/fi";

function About() {
  const features = [
    {
      icon: <FiInfo size={20} />,
      title: "Simple & Intuitive",
      desc: "Clean interface that makes jotting down ideas a breeze."
    },
    {
      icon: <FiType size={20} />,
      title: "Rich Text Editing",
      desc: "Highlight, bold, italicize—format your notes exactly how you like."
    },
    {
      icon: <FiCloud size={20} />,
      title: "Cloud Sync",
      desc: "Your notes stay up to date across all your devices."
    },
    {
      icon: <FiUsers size={20} />,
      title: "Real‑time Collaboration",
      desc: "Share and edit notes together with friends or colleagues."
    },
    {
      icon: <FiTag size={20} />,
      title: "Tags & Organization",
      desc: "Custom tags and folders mean you’ll never lose track of a note."
    },
  ];

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light py-5">
      <div className="container">
        {/* Main Card */}
        <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
          <div className="card-header bg-primary text-white py-4">
            <div className="d-flex align-items-center justify-content-center">
              <FiBookOpen className="me-2" size={28} />
              <h1 className="h2 mb-0">About iNoteBook</h1>
            </div>
          </div>

          <div className="card-body p-5">
            {/* Intro */}
            <p className="lead text-center mb-5">
              iNoteBook is your digital notebook—seamless, secure, and designed
              to help you capture your brilliance anytime, anywhere.
            </p>

            {/* Features Grid */}
            <div className="row gy-4">
              {features.map((f, i) => (
                <div key={i} className="col-md-6">
                  <div className="d-flex align-items-start feature-card p-3 rounded-3">
                    <div className="icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3">
                      {f.icon}
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">{f.title}</h5>
                      <p className="mb-0 text-muted">{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mission */}
            <div className="mt-5 bg-secondary bg-opacity-10 p-4 rounded-3 text-center">
              <h4 className="fw-semibold mb-3">Our Mission</h4>
              <p className="mb-0">
                To empower students, professionals, and creatives with a note‑taking
                tool that’s as organized and dynamic as their ideas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .feature-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.1);
        }
        .icon {
          width: 2.5rem;
          height: 2.5rem;
          flex-shrink: 0;
        }
        .lead {
          font-size: 1.125rem;
          color: #555;
        }
      `}</style>
    </div>
  );
}

export default About;
