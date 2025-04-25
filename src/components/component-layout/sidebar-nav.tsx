"use client";

import { Box } from "@/components/ui-library/box";
import { Flex } from "@/components/ui-library/flex";
import { Text } from "@/components/ui-library/typography";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, AlertCircle, BarChart, Bell, Blocks, BookOpen, Box as BoxIcon, Braces, Calendar, Check as CheckIcon, ChevronDown, ChevronRight, ChevronsRight, Clock, Code, Columns, Command, Component, Copy, CreditCard, Database, Droplet, Edit, File, FileText, Gauge, GitBranch, GitCommit, Globe, Grid, Hash, HelpCircle, Image, Images, Info, Key, Layers, Layout, LayoutGrid, Link as LinkIcon, List, Loader, Lock, Mail, Map, Maximize, Maximize2, Menu, MessageCircle, MessageSquare, Minus, Music, Navigation, Palette, Phone, PieChart, Play, Puzzle, Radar, Radio, RefreshCw, Repeat, Rows, ScrollText, Search, Shield, ShieldCheck, SidebarOpen, Sliders, Square, Star, Table, Tablet, Terminal, ToggleLeft, PenTool as Tool, TrendingUp, Type, Upload, User, UserPlus, Users, Video, Webhook, Wrench, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";

const components = [
  {
    category: "Getting Started",
    icon: BookOpen,
    items: [
      { name: "Introduction", href: "/docs/introduction", icon: Info },
      { name: "Installation", href: "/docs/installation", icon: Terminal },
      { name: "Theming", href: "/docs/theming", icon: Palette },
      { name: "CLI", href: "/docs/cli", icon: Command },
      { name: "Architecture", href: "/docs/architecture", icon: Blocks },
      { name: "Best Practices", href: "/docs/best-practices", icon: CheckIcon },
      { name: "Performance", href: "/docs/performance", icon: Gauge },
      { name: "Security", href: "/docs/security", icon: ShieldCheck },
    ],
  },
  {
    category: "Layout",
    icon: Layout,
    items: [
      { name: "Container", href: "/components/container", icon: BoxIcon },
      { name: "Grid", href: "/components/grid", icon: Grid },
      { name: "Flex", href: "/components/flex", icon: Layout },
      { name: "Box", href: "/components/box", icon: Square },
      { name: "Stack", href: "/components/stack", icon: Layers },
      { name: "Divider", href: "/components/divider", icon: Minus },
      { name: "Spacer", href: "/components/spacer", icon: Maximize },
      { name: "Columns", href: "/components/columns", icon: Columns },
      { name: "Rows", href: "/components/rows", icon: Rows },
      { name: "Aspect Ratio", href: "/components/aspect-ratio", icon: LayoutGrid },
      { name: "Center", href: "/components/center", icon: Maximize2 },
      { name: "Responsive", href: "/components/responsive", icon: Tablet },
    ],
  },
  {
    category: "Forms",
    icon: FileText,
    items: [
      { name: "Form", href: "/components/form", icon: FileText },
      { name: "Input", href: "/components/input", icon: Mail },
      { name: "Button", href: "/components/button", icon: CreditCard },
      { name: "Checkbox", href: "/components/checkbox", icon: CheckIcon },
      { name: "Radio", href: "/components/radio", icon: Radio },
      { name: "Select", href: "/components/select", icon: ChevronDown },
      { name: "Textarea", href: "/components/textarea", icon: FileText },
      { name: "Switch", href: "/components/switch", icon: ToggleLeft },
      { name: "Slider", href: "/components/slider", icon: Sliders },
      { name: "File Upload", href: "/components/file-upload", icon: Upload },
      { name: "Date Picker", href: "/components/date-picker", icon: Calendar },
      { name: "Time Picker", href: "/components/time-picker", icon: Clock },
      { name: "Color Picker", href: "/components/color-picker", icon: Droplet },
      { name: "OTP Input", href: "/components/otp-input", icon: Hash },
      { name: "Password", href: "/components/password", icon: Lock },
      { name: "Phone Input", href: "/components/phone-input", icon: Phone },
    ],
  },
  {
    category: "Data Display",
    icon: Table,
    items: [
      { name: "Table", href: "/components/table", icon: Table },
      { name: "Calendar", href: "/components/calendar", icon: Calendar },
      { name: "Avatar", href: "/components/avatar", icon: User },
      { name: "Badge", href: "/components/badge", icon: Bell },
      { name: "Card", href: "/components/card", icon: CreditCard },
      { name: "List", href: "/components/list", icon: List },
      { name: "Stats", href: "/components/stats", icon: TrendingUp },
      { name: "Timeline", href: "/components/timeline", icon: Clock },
      { name: "Tree View", href: "/components/tree-view", icon: GitBranch },
      { name: "Data Grid", href: "/components/data-grid", icon: Grid },
      { name: "Infinite Scroll", href: "/components/infinite-scroll", icon: ScrollText },
      { name: "Virtual List", href: "/components/virtual-list", icon: List },
    ],
  },
  {
    category: "Feedback",
    icon: MessageSquare,
    items: [
      { name: "Alert", href: "/components/alert", icon: AlertCircle },
      { name: "Toast", href: "/components/toast", icon: MessageSquare },
      { name: "Progress", href: "/components/progress", icon: Loader },
      { name: "Skeleton", href: "/components/skeleton", icon: Square },
      { name: "Spinner", href: "/components/spinner", icon: RefreshCw },
      { name: "Modal", href: "/components/modal", icon: Maximize2 },
      { name: "Drawer", href: "/components/drawer", icon: SidebarOpen },
      { name: "Tooltip", href: "/components/tooltip", icon: HelpCircle },
      { name: "Popover", href: "/components/popover", icon: MessageCircle },
      { name: "Notifications", href: "/components/notifications", icon: Bell },
      { name: "Loading States", href: "/components/loading-states", icon: Loader },
      { name: "Error States", href: "/components/error-states", icon: AlertCircle },
    ],
  },
  {
    category: "Navigation",
    icon: Navigation,
    items: [
      { name: "Menu", href: "/components/menu", icon: Menu },
      { name: "Navbar", href: "/components/navbar", icon: Navigation },
      { name: "Tabs", href: "/components/tabs", icon: Layout },
      { name: "Breadcrumb", href: "/components/breadcrumb", icon: ChevronRight },
      { name: "Pagination", href: "/components/pagination", icon: ChevronsRight },
      { name: "Stepper", href: "/components/stepper", icon: GitCommit },
      { name: "Link", href: "/components/link", icon: LinkIcon },
      { name: "Command Menu", href: "/components/command-menu", icon: Command },
      { name: "Context Menu", href: "/components/context-menu", icon: Menu },
      { name: "Dropdown", href: "/components/dropdown", icon: ChevronDown },
      { name: "Sidebar", href: "/components/sidebar", icon: SidebarOpen },
    ],
  },
  {
    category: "Media",
    icon: Image,
    items: [
      { name: "Image", href: "/components/image", icon: Image },
      { name: "Video", href: "/components/video", icon: Video },
      { name: "Audio", href: "/components/audio", icon: Music },
      { name: "File Viewer", href: "/components/file-viewer", icon: File },
      { name: "Carousel", href: "/components/carousel", icon: Image },
      { name: "Gallery", href: "/components/gallery", icon: Images },
      { name: "Media Player", href: "/components/media-player", icon: Play },
      { name: "Image Crop", href: "/components/image-crop", icon: Edit },
      { name: "File Upload", href: "/components/file-upload", icon: Upload },
      { name: "Lightbox", href: "/components/lightbox", icon: Maximize2 },
    ],
  },
  {
    category: "Data Entry",
    icon: Edit,
    items: [
      { name: "Rich Text", href: "/components/rich-text", icon: Type },
      { name: "Code Editor", href: "/components/code-editor", icon: Code },
      { name: "Markdown", href: "/components/markdown", icon: FileText },
      { name: "JSON Editor", href: "/components/json-editor", icon: Braces },
      { name: "Table Editor", href: "/components/table-editor", icon: Table },
      { name: "Spreadsheet", href: "/components/spreadsheet", icon: Table },
      { name: "Form Builder", href: "/components/form-builder", icon: Edit },
      { name: "Diagram Editor", href: "/components/diagram-editor", icon: Component },
    ],
  },
  {
    category: "Data Visualization",
    icon: PieChart,
    items: [
      { name: "Charts", href: "/components/charts", icon: BarChart },
      { name: "Graphs", href: "/components/graphs", icon: TrendingUp },
      { name: "Maps", href: "/components/maps", icon: Map },
      { name: "Sparklines", href: "/components/sparklines", icon: Activity },
      { name: "Gauges", href: "/components/gauges", icon: PieChart },
      { name: "Heat Maps", href: "/components/heat-maps", icon: Grid },
      { name: "Tree Maps", href: "/components/tree-maps", icon: Layers },
      { name: "Network Graphs", href: "/components/network-graphs", icon: GitBranch },
      { name: "Radar Charts", href: "/components/radar-charts", icon: Radar },
    ],
  },
  {
    category: "Authentication",
    icon: Lock,
    items: [
      { name: "Sign In", href: "/components/sign-in", icon: User },
      { name: "Sign Up", href: "/components/sign-up", icon: UserPlus },
      { name: "Password Reset", href: "/components/password-reset", icon: Key },
      { name: "Two Factor", href: "/components/two-factor", icon: Shield },
      { name: "OAuth", href: "/components/oauth", icon: Globe },
      { name: "Permissions", href: "/components/permissions", icon: Lock },
      { name: "Role Management", href: "/components/role-management", icon: Users },
    ],
  },
  {
    category: "Integration",
    icon: Puzzle,
    items: [
      { name: "REST API", href: "/components/rest-api", icon: Globe },
      { name: "GraphQL", href: "/components/graphql", icon: Database },
      { name: "Webhooks", href: "/components/webhooks", icon: Webhook },
      { name: "OAuth Apps", href: "/components/oauth-apps", icon: Key },
      { name: "API Keys", href: "/components/api-keys", icon: Key },
      { name: "Websockets", href: "/components/websockets", icon: Repeat },
    ],
  },
  {
    category: "Developer Tools",
    icon: Tool,
    items: [
      { name: "Console", href: "/components/console", icon: Terminal },
      { name: "API Explorer", href: "/components/api-explorer", icon: Globe },
      { name: "Database UI", href: "/components/database-ui", icon: Database },
      { name: "Code Generator", href: "/components/code-generator", icon: Code },
      { name: "Schema Editor", href: "/components/schema-editor", icon: Table },
      { name: "Performance Monitor", href: "/components/performance-monitor", icon: Activity },
    ],
  },
  {
    category: "Utils",
    icon: Wrench,
    items: [
      { name: "Portal", href: "/components/portal", icon: Maximize2 },
      { name: "Transitions", href: "/components/transitions", icon: Zap },
      { name: "Hooks", href: "/components/hooks", icon: Code },
      { name: "Icons", href: "/components/icons", icon: Star },
      { name: "Colors", href: "/components/colors", icon: Droplet },
      { name: "Typography", href: "/components/typography", icon: Type },
      { name: "Animations", href: "/components/animations", icon: Zap },
      { name: "Clipboard", href: "/components/clipboard", icon: Copy },
      { name: "Storage", href: "/components/storage", icon: Database },
      { name: "Validation", href: "/components/validation", icon: CheckIcon },
    ],
  },
];

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultExpanded?: boolean;
  onSectionToggle?: (section: string, isExpanded: boolean) => void;
}

export function SidebarNav({ 
  className, 
  defaultExpanded = true,
  onSectionToggle,
  ...props 
}: SidebarNavProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<string[]>(
    defaultExpanded ? components.map(section => section.category) : []
  );

  const filteredComponents = useMemo(() => {
    if (!searchQuery.trim()) return components;

    const query = searchQuery.toLowerCase();
    return components.map(section => ({
      ...section,
      items: section.items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        section.category.toLowerCase().includes(query)
      ),
    })).filter(section => section.items.length > 0);
  }, [searchQuery]);

  const toggleSection = (category: string) => {
    setExpandedSections(prev => {
      const newExpanded = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category];
      
      onSectionToggle?.(category, newExpanded.includes(category));
      return newExpanded;
    });
  };

  return (
    <Box className={cn("pb-12", className)} {...props}>
      <Box className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 border-b">
        <Flex align="center" className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            placeholder="Search components..."
            type="search"
          />
        </Flex>
      </Box>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <Box className="space-y-1 py-4">
          <AnimatePresence initial={false}>
            {filteredComponents.map((section) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Box className="px-3 py-1">
                  <button
                    onClick={() => toggleSection(section.category)}
                    className={cn(
                      "flex items-center justify-between w-full px-4 py-2 text-sm font-medium",
                      "rounded-md transition-colors duration-200",
                      "hover:bg-accent hover:text-accent-foreground",
                      expandedSections.includes(section.category)
                        ? "bg-accent/50 text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <Flex align="center" gap={2}>
                      <section.icon className="h-4 w-4" />
                      <Text size="sm" weight="medium">
                        {section.category}
                        <Text as="span" size="sm" color="muted" className="ml-2">
                          ({section.items.length})
                        </Text>
                      </Text>
                    </Flex>
                    <motion.div
                      animate={{ 
                        rotate: expandedSections.includes(section.category) ? 180 : 0,
                        scale: expandedSections.includes(section.category) ? 1.1 : 1
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {expandedSections.includes(section.category) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: "auto", 
                          opacity: 1,
                          transition: {
                            height: { duration: 0.3, ease: "easeOut" },
                            opacity: { duration: 0.2, delay: 0.1 }
                          }
                        }}
                        exit={{ 
                          height: 0, 
                          opacity: 0,
                          transition: {
                            height: { duration: 0.2, ease: "easeIn" },
                            opacity: { duration: 0.1 }
                          }
                        }}
                        className="overflow-hidden"
                      >
                        <Box className="space-y-1 mt-1">
                          {section.items.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                  "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium",
                                  "transition-colors duration-200",
                                  "hover:bg-accent hover:text-accent-foreground",
                                  isActive
                                    ? "bg-accent text-accent-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                                )}
                              >
                                <Icon className="h-4 w-4" />
                                {item.name}
                              </Link>
                            );
                          })}
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredComponents.length === 0 && (
            <Box className="px-4 py-3 text-center">
              <Text color="muted" size="sm">No components found</Text>
            </Box>
          )}
        </Box>
      </ScrollArea>
    </Box>
  );
}