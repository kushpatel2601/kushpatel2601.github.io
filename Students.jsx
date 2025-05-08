
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  UserPlus,
  Search
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from "@/components/layout/PageLayout";
import { getStudents, getDepartments, addStudent, updateStudent, deleteStudent } from "@/lib/data";
import StudentActionsBar from "@/components/students/StudentActionsBar";
import StudentsTable from "@/components/students/StudentsTable";
import StudentForm from "@/components/students/StudentForm";
import StudentViewDialog from "@/components/students/StudentViewDialog";
import StudentDeleteDialog from "@/components/students/StudentDeleteDialog";

const Students = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  
  const initialFormData = {
    name: "",
    email: "",
    studentId: "",
    department: "",
    enrollmentDate: "",
    dateOfBirth: "",
    address: "",
    phone: "",
    gender: ""
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    loadStudents();
    setDepartments(getDepartments());
  }, []);

  const loadStudents = () => {
    setStudents(getStudents());
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.department && student.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleAddStudentClick = () => {
    resetForm();
    setIsAddDialogOpen(true);
  };

  const handleAddStudent = () => {
    try {
      addStudent(formData);
      loadStudents();
      setIsAddDialogOpen(false);
      toast({
        title: "Success",
        description: "Student added successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add student",
        variant: "destructive",
      });
    }
  };

  const handleEditClick = (student) => {
    setCurrentStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      studentId: student.studentId,
      department: student.department,
      enrollmentDate: student.enrollmentDate,
      dateOfBirth: student.dateOfBirth,
      address: student.address,
      phone: student.phone,
      gender: student.gender
    });
    setIsEditDialogOpen(true);
  };

  const handleViewClick = (student) => {
    setCurrentStudent(student);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (student) => {
    setCurrentStudent(student);
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateStudent = () => {
    try {
      updateStudent(currentStudent.id, formData);
      loadStudents();
      setIsEditDialogOpen(false);
      toast({
        title: "Success",
        description: "Student updated successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update student",
        variant: "destructive",
      });
    }
  };

  const handleDeleteStudent = () => {
    try {
      deleteStudent(currentStudent.id);
      loadStudents();
      setIsDeleteDialogOpen(false);
      toast({
        title: "Success",
        description: "Student deleted successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete student",
        variant: "destructive",
      });
    }
  };

  return (
    <PageLayout title="Students">
      <div className="space-y-6">
        <StudentActionsBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onAddStudentClick={handleAddStudentClick}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <StudentsTable
            students={filteredStudents}
            onViewClick={handleViewClick}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        </motion.div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Enter the student details below to add a new student to the system.
            </DialogDescription>
          </DialogHeader>
          <StudentForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            departments={departments}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddStudent}>Add Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>
              Update the student details below.
            </DialogDescription>
          </DialogHeader>
          <StudentForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            departments={departments}
            isEditMode={true}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStudent}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <StudentViewDialog
        isOpen={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        student={currentStudent}
      />

      <StudentDeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        student={currentStudent}
        onConfirmDelete={handleDeleteStudent}
      />
    </PageLayout>
  );
};

export default Students;
