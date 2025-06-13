function About() {
  return (
    // Outer container for centering and background
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Inner content container with styling */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6">
        {/* Main heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-blue-700 mb-8">
          ABOUT US
        </h1>

        {/* Introduction paragraph */}
        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to <strong className="text-blue-600">iNoteBook</strong>, your trusted companion for organizing your thoughts and ideas. At iNoteBook, we believe that everyone has valuable ideas worth capturing, and our mission is to make the process of taking notes seamless, efficient, and enjoyable.
        </p>

        {/* Features section heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mt-6 mb-4">
          Features
        </h2>

        {/* Feature list */}
        <p className="text-lg text-gray-700 leading-relaxed">
          <strong className="text-blue-500">Simple and Intuitive Interface:</strong> We prioritize user experience by offering a clean and straightforward interface that makes note-taking a breeze.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          <strong className="text-blue-500">Rich Text Editing:</strong> Format your notes with ease using our rich text editor, allowing you to highlight important points and organize information effectively.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          <strong className="text-blue-500">Cloud Synchronization:</strong> Access your notes anytime, anywhere, and on any device, with our secure cloud synchronization feature.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          <strong className="text-blue-500">Collaboration Tools:</strong> Share your notes with friends, colleagues, or classmates and collaborate in real-time.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          <strong className="text-blue-500">Tagging and Organization:</strong> Keep your notes organized with customizable tags and folders, making it easy to find what you need when you need it.
        </p>
      </div>
    </div>
  );
}

export default About;
