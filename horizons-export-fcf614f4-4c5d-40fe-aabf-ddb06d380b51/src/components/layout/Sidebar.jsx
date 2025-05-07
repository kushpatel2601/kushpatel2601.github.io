
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  Calendar, 
  FileText, 
  Bell, 
  CreditCard, 
  BarChart, 
  Settings, 
  Home,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Users, label: "Students", path: "/students" },
  { icon: BookOpen, label: "Courses", path: "/courses" },
  { icon: GraduationCap, label: "Departments", path: "/departments" },
  { icon: Calendar, label: "Attendance", path: "/attendance" },
  { icon: FileText, label: "Grades", path: "/grades" },
  { icon: Bell, label: "Announcements", path: "/announcements" },
  { icon: CreditCard, label: "Fees", path: "/fees" },
  { icon: BarChart, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(true);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleMobileSidebar}
          className="bg-primary text-white hover:bg-primary/90"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile sidebar */}
      <motion.div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden",
          isMobileOpen ? "block" : "hidden"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobileOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        onClick={toggleMobileSidebar}
      />

      <motion.div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-[250px] bg-card shadow-xl md:hidden",
          isMobileOpen ? "block" : "hidden"
        )}
        initial={{ x: -250 }}
        animate={{ x: isMobileOpen ? 0 : -250 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-primary">EduERP</h2>
          <Button variant="ghost" size="icon" onClick={toggleMobileSidebar}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="py-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={toggleMobileSidebar}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Desktop sidebar */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 z-30 h-full border-r bg-card"
        initial={{ width: 250 }}
        animate={{ width: isOpen ? 250 : 70 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {isOpen ? (
            <h2 className="text-xl font-bold text-primary">EduERP</h2>
          ) : (
            <div className="w-full flex justify-center">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <div className="py-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center py-3 transition-colors",
                isOpen ? "px-4" : "justify-center px-2",
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", isOpen && "mr-3")} />
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
