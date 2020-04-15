export enum Department {
  HR = "HR",
  IT = "IT",
  FIN = "FIN",
}
export interface EmployeeData {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  department: Department;
}
