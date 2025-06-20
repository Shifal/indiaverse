const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-900 dark:bg-black dark:text-white transition-all duration-300">
      {children}
    </div>
  );
};

export default Layout;
