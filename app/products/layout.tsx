export const metadata = {
  title: "Admin Panel - Products",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-10 px-10 border border-gray-300 min-h-screen m-2 rounded-md">
      {children}
    </div>
  );
};

export default layout;
