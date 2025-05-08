
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  Bell, 
  CreditCard, 
  Calendar,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { initializeData, getStudents, getCourses, getAnnouncements, getFees } from "@/lib/data";

const Dashboard = () => {
  useEffect(() => {
    // Initialize demo data
    initializeData();
  }, []);

  const students = getStudents();
  const courses = getCourses();
  const announcements = getAnnouncements();
  const fees = getFees();

  const unpaidFees = fees.filter(fee => fee.status !== 'Paid').length;
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <PageLayout title="Dashboard">
      <div className="grid gap-6">
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <motion.div 
            custom={0} 
            variants={cardVariants} 
            initial="hidden" 
            animate="visible"
          >
            <Card className="dashboard-card border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{students.length}</div>
                <p className="text-xs text-muted-foreground">
                  +2 new this month
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            custom={1} 
            variants={cardVariants} 
            initial="hidden" 
            animate="visible"
          >
            <Card className="dashboard-card border-l-4 border-l-purple-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{courses.length}</div>
                <p className="text-xs text-muted-foreground">
                  Fall semester 2023
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            custom={2} 
            variants={cardVariants} 
            initial="hidden" 
            animate="visible"
          >
            <Card className="dashboard-card border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Departments</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">
                  Across all faculties
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            custom={3} 
            variants={cardVariants} 
            initial="hidden" 
            animate="visible"
          >
            <Card className="dashboard-card border-l-4 border-l-red-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{unpaidFees}</div>
                <p className="text-xs text-muted-foreground">
                  Students with unpaid fees
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Recent Activity and Announcements */}
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div 
            custom={4} 
            variants={cardVariants} 
            initial="hidden" 
            animate="visible"
          >
            <Card className="dashboard-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Recent Announcements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {announcements.slice(0, 3).map((announcement) => (
                  <div key={announcement.id} className="flex items-start space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Bell className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{announcement.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {announcement.date} • {announcement.author}
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">View All Announcements</Button>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            custom={5} 
            variants={cardVariants} 
            initial="hidden" 
            animate="visible"
          >
            <Card className="dashboard-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-blue-500/10 p-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Mid-Term Examinations</p>
                    <p className="text-xs text-muted-foreground">
                      Oct 15, 2023 - Oct 20, 2023
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-purple-500/10 p-2">
                    <GraduationCap className="h-4 w-4 text-purple-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Faculty Development Program</p>
                    <p className="text-xs text-muted-foreground">
                      Oct 25, 2023 • Main Auditorium
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-green-500/10 p-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Annual Sports Meet</p>
                    <p className="text-xs text-muted-foreground">
                      Nov 5, 2023 - Nov 7, 2023
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">View Calendar</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Quick Actions */}
        <motion.div 
          custom={6} 
          variants={cardVariants} 
          initial="hidden" 
          animate="visible"
        >
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="h-auto flex flex-col items-center justify-center p-4 space-y-2">
                  <Users className="h-6 w-6" />
                  <span className="text-xs">Add Student</span>
                </Button>
                <Button className="h-auto flex flex-col items-center justify-center p-4 space-y-2" variant="outline">
                  <BookOpen className="h-6 w-6" />
                  <span className="text-xs">Add Course</span>
                </Button>
                <Button className="h-auto flex flex-col items-center justify-center p-4 space-y-2" variant="outline">
                  <Bell className="h-6 w-6" />
                  <span className="text-xs">New Announcement</span>
                </Button>
                <Button className="h-auto flex flex-col items-center justify-center p-4 space-y-2" variant="outline">
                  <CreditCard className="h-6 w-6" />
                  <span className="text-xs">Record Payment</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
