import { useEffect } from 'react';
import { useLocation, useNavigation } from 'react-router';

export default function NavigationProgress() {
  const location = useLocation();
  const navigation = useNavigation();

  const isNavigating =
    navigation.state === 'loading' &&
    !!navigation.location &&
    (navigation.location.pathname !== location.pathname ||
      navigation.location.search !== location.search ||
      navigation.location.hash !== location.hash);

  useEffect(() => {
    document.body.style.cursor = isNavigating ? 'progress' : '';
    return () => {
      document.body.style.cursor = '';
    };
  }, [isNavigating]);

  if (!isNavigating) return null;

  return (
    <div className="fixed top-0 left-0 z-99 h-1 w-full overflow-hidden bg-primary/20">
      <div className="absolute h-full animate-bar-slide-primary rounded-full bg-primary" />
      <div className="absolute h-full animate-bar-slide-secondary rounded-full bg-primary" />
    </div>
  );
}


// -------- examp -----------
return (
    <SidebarProvider>
      <NavigationProgress />
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <Toaster />
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
