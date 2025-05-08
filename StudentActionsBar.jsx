
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, UserPlus } from "lucide-react";

const StudentActionsBar = ({ searchTerm, onSearchChange, onAddStudentClick }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search students..."
          className="pl-8 w-full sm:w-[300px]"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Button variant="outline" size="sm" className="h-9">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline" size="sm" className="h-9">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button size="sm" className="h-9" onClick={onAddStudentClick}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>
    </div>
  );
};

export default StudentActionsBar;
