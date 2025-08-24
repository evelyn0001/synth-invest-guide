import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 md:ml-0">
        <div className="container mx-auto p-6 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}