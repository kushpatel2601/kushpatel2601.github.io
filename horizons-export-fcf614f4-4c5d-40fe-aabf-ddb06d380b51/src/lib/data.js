
import { generateId } from '@/lib/utils';

// Initialize localStorage with demo data if it doesn't exist
export const initializeData = () => {
  // Students
  if (!localStorage.getItem('students')) {
    const students = [
      {
        id: generateId(),
        name: 'John Smith',
        email: 'john.smith@example.com',
        studentId: 'ST10001',
        department: 'Computer Science',
        enrollmentDate: '2023-09-01',
        dateOfBirth: '2002-05-15',
        address: '123 University Ave, College Town',
        phone: '(555) 123-4567',
        gender: 'Male',
        profileImage: ''
      },
      {
        id: generateId(),
        name: 'Emily Johnson',
        email: 'emily.johnson@example.com',
        studentId: 'ST10002',
        department: 'Business Administration',
        enrollmentDate: '2023-09-01',
        dateOfBirth: '2003-02-20',
        address: '456 College Blvd, University City',
        phone: '(555) 987-6543',
        gender: 'Female',
        profileImage: ''
      },
      {
        id: generateId(),
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        studentId: 'ST10003',
        department: 'Electrical Engineering',
        enrollmentDate: '2022-09-01',
        dateOfBirth: '2001-11-08',
        address: '789 Engineering Dr, Tech City',
        phone: '(555) 456-7890',
        gender: 'Male',
        profileImage: ''
      }
    ];
    localStorage.setItem('students', JSON.stringify(students));
  }

  // Courses
  if (!localStorage.getItem('courses')) {
    const courses = [
      {
        id: generateId(),
        code: 'CS101',
        name: 'Introduction to Computer Science',
        department: 'Computer Science',
        credits: 3,
        description: 'Fundamental concepts of programming and computer science.',
        instructor: 'Dr. Alan Turing',
        schedule: 'Mon, Wed 10:00 AM - 11:30 AM',
        capacity: 40,
        enrolled: 35
      },
      {
        id: generateId(),
        code: 'BUS202',
        name: 'Principles of Marketing',
        department: 'Business Administration',
        credits: 3,
        description: 'Introduction to marketing concepts and strategies.',
        instructor: 'Prof. Sarah Johnson',
        schedule: 'Tue, Thu 1:00 PM - 2:30 PM',
        capacity: 60,
        enrolled: 45
      },
      {
        id: generateId(),
        code: 'EE220',
        name: 'Circuit Analysis',
        department: 'Electrical Engineering',
        credits: 4,
        description: 'Analysis of electrical circuits using various techniques.',
        instructor: 'Dr. Robert Maxwell',
        schedule: 'Mon, Wed, Fri 2:00 PM - 3:00 PM',
        capacity: 30,
        enrolled: 28
      },
      {
        id: generateId(),
        code: 'MATH101',
        name: 'Calculus I',
        department: 'Mathematics',
        credits: 4,
        description: 'Introduction to differential and integral calculus.',
        instructor: 'Dr. Emma Newton',
        schedule: 'Mon, Wed, Fri 9:00 AM - 10:00 AM',
        capacity: 50,
        enrolled: 48
      }
    ];
    localStorage.setItem('courses', JSON.stringify(courses));
  }

  // Enrollments
  if (!localStorage.getItem('enrollments')) {
    const enrollments = [
      {
        id: generateId(),
        studentId: 'ST10001',
        courseCode: 'CS101',
        enrollmentDate: '2023-09-05',
        status: 'Active',
        grade: 'A-'
      },
      {
        id: generateId(),
        studentId: 'ST10001',
        courseCode: 'MATH101',
        enrollmentDate: '2023-09-05',
        status: 'Active',
        grade: 'B+'
      },
      {
        id: generateId(),
        studentId: 'ST10002',
        courseCode: 'BUS202',
        enrollmentDate: '2023-09-06',
        status: 'Active',
        grade: 'A'
      },
      {
        id: generateId(),
        studentId: 'ST10003',
        courseCode: 'EE220',
        enrollmentDate: '2022-09-07',
        status: 'Active',
        grade: 'B'
      },
      {
        id: generateId(),
        studentId: 'ST10003',
        courseCode: 'MATH101',
        enrollmentDate: '2022-09-07',
        status: 'Active',
        grade: 'A-'
      }
    ];
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
  }

  // Departments
  if (!localStorage.getItem('departments')) {
    const departments = [
      {
        id: generateId(),
        name: 'Computer Science',
        head: 'Dr. Alan Turing',
        established: '1985',
        description: 'Department focused on computer science and programming.'
      },
      {
        id: generateId(),
        name: 'Business Administration',
        head: 'Dr. Peter Drucker',
        established: '1970',
        description: 'Department focused on business management and administration.'
      },
      {
        id: generateId(),
        name: 'Electrical Engineering',
        head: 'Dr. Nikola Tesla',
        established: '1962',
        description: 'Department focused on electrical systems and engineering.'
      },
      {
        id: generateId(),
        name: 'Mathematics',
        head: 'Dr. Katherine Johnson',
        established: '1950',
        description: 'Department focused on pure and applied mathematics.'
      }
    ];
    localStorage.setItem('departments', JSON.stringify(departments));
  }

  // Announcements
  if (!localStorage.getItem('announcements')) {
    const announcements = [
      {
        id: generateId(),
        title: 'Fall Semester Registration',
        content: 'Registration for the Fall semester begins on August 1st. Please check your student portal for your registration time slot.',
        date: '2023-07-15',
        author: 'Registrar Office',
        department: 'All'
      },
      {
        id: generateId(),
        title: 'Computer Science Department Seminar',
        content: 'Dr. Jane Smith from Tech University will be giving a seminar on "Advances in Artificial Intelligence" on September 15th at 3:00 PM in Room 101.',
        date: '2023-09-01',
        author: 'Computer Science Department',
        department: 'Computer Science'
      },
      {
        id: generateId(),
        title: 'Campus Maintenance Notice',
        content: 'The main library will be closed for renovations from October 5th to October 10th. Alternative study spaces will be available in the Student Union Building.',
        date: '2023-09-20',
        author: 'Facilities Management',
        department: 'All'
      }
    ];
    localStorage.setItem('announcements', JSON.stringify(announcements));
  }

  // Attendance
  if (!localStorage.getItem('attendance')) {
    const attendance = [
      {
        id: generateId(),
        studentId: 'ST10001',
        courseCode: 'CS101',
        date: '2023-09-10',
        status: 'Present'
      },
      {
        id: generateId(),
        studentId: 'ST10001',
        courseCode: 'CS101',
        date: '2023-09-12',
        status: 'Present'
      },
      {
        id: generateId(),
        studentId: 'ST10001',
        courseCode: 'MATH101',
        date: '2023-09-11',
        status: 'Absent'
      },
      {
        id: generateId(),
        studentId: 'ST10002',
        courseCode: 'BUS202',
        date: '2023-09-12',
        status: 'Present'
      }
    ];
    localStorage.setItem('attendance', JSON.stringify(attendance));
  }

  // Fees
  if (!localStorage.getItem('fees')) {
    const fees = [
      {
        id: generateId(),
        studentId: 'ST10001',
        semester: 'Fall 2023',
        tuitionFee: 5000,
        libraryFee: 100,
        activityFee: 200,
        totalAmount: 5300,
        amountPaid: 2650,
        dueDate: '2023-10-15',
        status: 'Partially Paid'
      },
      {
        id: generateId(),
        studentId: 'ST10002',
        semester: 'Fall 2023',
        tuitionFee: 5000,
        libraryFee: 100,
        activityFee: 200,
        totalAmount: 5300,
        amountPaid: 5300,
        dueDate: '2023-10-15',
        status: 'Paid'
      },
      {
        id: generateId(),
        studentId: 'ST10003',
        semester: 'Fall 2023',
        tuitionFee: 5000,
        libraryFee: 100,
        activityFee: 200,
        totalAmount: 5300,
        amountPaid: 0,
        dueDate: '2023-10-15',
        status: 'Unpaid'
      }
    ];
    localStorage.setItem('fees', JSON.stringify(fees));
  }
};

// Data access functions
export const getStudents = () => {
  return JSON.parse(localStorage.getItem('students') || '[]');
};

export const getStudent = (id) => {
  const students = getStudents();
  return students.find(student => student.id === id || student.studentId === id);
};

export const addStudent = (student) => {
  const students = getStudents();
  const newStudent = {
    ...student,
    id: generateId()
  };
  students.push(newStudent);
  localStorage.setItem('students', JSON.stringify(students));
  return newStudent;
};

export const updateStudent = (id, updatedStudent) => {
  const students = getStudents();
  const index = students.findIndex(student => student.id === id);
  if (index !== -1) {
    students[index] = { ...students[index], ...updatedStudent };
    localStorage.setItem('students', JSON.stringify(students));
    return students[index];
  }
  return null;
};

export const deleteStudent = (id) => {
  const students = getStudents();
  const filteredStudents = students.filter(student => student.id !== id);
  localStorage.setItem('students', JSON.stringify(filteredStudents));
};

export const getCourses = () => {
  return JSON.parse(localStorage.getItem('courses') || '[]');
};

export const getCourse = (id) => {
  const courses = getCourses();
  return courses.find(course => course.id === id || course.code === id);
};

export const addCourse = (course) => {
  const courses = getCourses();
  const newCourse = {
    ...course,
    id: generateId()
  };
  courses.push(newCourse);
  localStorage.setItem('courses', JSON.stringify(courses));
  return newCourse;
};

export const updateCourse = (id, updatedCourse) => {
  const courses = getCourses();
  const index = courses.findIndex(course => course.id === id);
  if (index !== -1) {
    courses[index] = { ...courses[index], ...updatedCourse };
    localStorage.setItem('courses', JSON.stringify(courses));
    return courses[index];
  }
  return null;
};

export const deleteCourse = (id) => {
  const courses = getCourses();
  const filteredCourses = courses.filter(course => course.id !== id);
  localStorage.setItem('courses', JSON.stringify(filteredCourses));
};

export const getEnrollments = () => {
  return JSON.parse(localStorage.getItem('enrollments') || '[]');
};

export const getStudentEnrollments = (studentId) => {
  const enrollments = getEnrollments();
  return enrollments.filter(enrollment => enrollment.studentId === studentId);
};

export const getCourseEnrollments = (courseCode) => {
  const enrollments = getEnrollments();
  return enrollments.filter(enrollment => enrollment.courseCode === courseCode);
};

export const addEnrollment = (enrollment) => {
  const enrollments = getEnrollments();
  const newEnrollment = {
    ...enrollment,
    id: generateId(),
    enrollmentDate: new Date().toISOString().split('T')[0],
    status: 'Active'
  };
  enrollments.push(newEnrollment);
  localStorage.setItem('enrollments', JSON.stringify(enrollments));
  
  // Update course enrollment count
  const courses = getCourses();
  const courseIndex = courses.findIndex(course => course.code === enrollment.courseCode);
  if (courseIndex !== -1) {
    courses[courseIndex].enrolled = (courses[courseIndex].enrolled || 0) + 1;
    localStorage.setItem('courses', JSON.stringify(courses));
  }
  
  return newEnrollment;
};

export const updateEnrollment = (id, updatedEnrollment) => {
  const enrollments = getEnrollments();
  const index = enrollments.findIndex(enrollment => enrollment.id === id);
  if (index !== -1) {
    enrollments[index] = { ...enrollments[index], ...updatedEnrollment };
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
    return enrollments[index];
  }
  return null;
};

export const deleteEnrollment = (id) => {
  const enrollments = getEnrollments();
  const enrollment = enrollments.find(e => e.id === id);
  const filteredEnrollments = enrollments.filter(e => e.id !== id);
  localStorage.setItem('enrollments', JSON.stringify(filteredEnrollments));
  
  // Update course enrollment count if enrollment exists
  if (enrollment) {
    const courses = getCourses();
    const courseIndex = courses.findIndex(course => course.code === enrollment.courseCode);
    if (courseIndex !== -1 && courses[courseIndex].enrolled > 0) {
      courses[courseIndex].enrolled -= 1;
      localStorage.setItem('courses', JSON.stringify(courses));
    }
  }
};

export const getDepartments = () => {
  return JSON.parse(localStorage.getItem('departments') || '[]');
};

export const getAnnouncements = () => {
  return JSON.parse(localStorage.getItem('announcements') || '[]');
};

export const addAnnouncement = (announcement) => {
  const announcements = getAnnouncements();
  const newAnnouncement = {
    ...announcement,
    id: generateId(),
    date: new Date().toISOString().split('T')[0]
  };
  announcements.push(newAnnouncement);
  localStorage.setItem('announcements', JSON.stringify(announcements));
  return newAnnouncement;
};

export const getAttendance = (studentId, courseCode) => {
  const attendance = JSON.parse(localStorage.getItem('attendance') || '[]');
  return attendance.filter(a => 
    (!studentId || a.studentId === studentId) && 
    (!courseCode || a.courseCode === courseCode)
  );
};

export const addAttendance = (attendance) => {
  const attendanceRecords = JSON.parse(localStorage.getItem('attendance') || '[]');
  const newAttendance = {
    ...attendance,
    id: generateId()
  };
  attendanceRecords.push(newAttendance);
  localStorage.setItem('attendance', JSON.stringify(attendanceRecords));
  return newAttendance;
};

export const getFees = (studentId) => {
  const fees = JSON.parse(localStorage.getItem('fees') || '[]');
  return studentId ? fees.filter(fee => fee.studentId === studentId) : fees;
};

export const updateFee = (id, updatedFee) => {
  const fees = JSON.parse(localStorage.getItem('fees') || '[]');
  const index = fees.findIndex(fee => fee.id === id);
  if (index !== -1) {
    fees[index] = { ...fees[index], ...updatedFee };
    localStorage.setItem('fees', JSON.stringify(fees));
    return fees[index];
  }
  return null;
};
