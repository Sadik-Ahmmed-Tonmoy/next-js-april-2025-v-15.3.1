"use client";

import { SidebarNav } from "@/components/component-layout/sidebar-nav";
import { Box } from "@/components/ui-library/box";
import { Flex } from "@/components/ui-library/flex";
import { useState, useEffect } from "react";
import { Menu, Moon, Sun, ArrowLeft } from "lucide-react";

import { useTheme } from "next-themes";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/buttons/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // After mounting, we can render the theme toggle (to avoid hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close sidebar on route change or window resize (on larger screens)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Flex className="min-h-screen relative">
      {/* Desktop sidebar */}
      <Box as="aside" className="hidden lg:block w-72 border-r h-screen sticky top-0 overflow-hidden">
        <SidebarNav />
      </Box>
      
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {showSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setShowSidebar(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed top-0 left-0 bottom-0 w-72 border-r z-50 bg-background lg:hidden"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
                onClick={() => setShowSidebar(false)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <SidebarNav onSectionToggle={() => {}} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Main content */}
      <Box as="main" className="flex-1 min-w-0">
        {/* Mobile header */}
        <Box 
          className={cn(
            "sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden"
          )}
        //   px={4}
        >
          <Button variant="ghost" size="icon" onClick={() => setShowSidebar(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <Link 
            href="/" 
            className="flex items-center space-x-2 font-semibold"
          >
            Components
          </Link>
          <Box className="ml-auto">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}
          </Box>
        </Box>
        
        {/* Component content */}
        <Box className="flex-1">
          {children}
        </Box>
      </Box>
    </Flex>
  );
}