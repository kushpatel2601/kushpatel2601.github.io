
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

// Helper function to generate a random ID
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

// Format date to readable string
export function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Calculate GPA from grades
export function calculateGPA(grades) {
  if (!grades || grades.length === 0) return 0;
  
  const gradePoints = {
    'A+': 4.0,
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'F': 0.0
  };
  
  let totalPoints = 0;
  let totalCredits = 0;
  
  grades.forEach(grade => {
    if (grade.grade && grade.credits) {
      totalPoints += gradePoints[grade.grade] * grade.credits;
      totalCredits += grade.credits;
    }
  });
  
  return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
}
