const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-black text-gray-800 dark:text-white transition-colors duration-300">
      {children}
    </div>
  );
};

export default Layout;
