import { trainingPrograms, trainingSessions, enrollments } from '@/lib/db/schema';

// Mock Data Types matching Schema
export type TrainingProgram = typeof trainingPrograms.$inferSelect;
export type TrainingSession = typeof trainingSessions.$inferSelect;

export const MOCK_TRAINING_PROGRAMS = [
  {
    id: "TP-2026-001",
    title: "Advanced Tactical Leadership",
    department: "Operations",
    durationHours: 40,
    type: "Workshop",
    status: "Active",
    description: "Core leadership principles for tactical environments.",
    createdAt: new Date()
  },
  {
    id: "TP-2026-002",
    title: "Cyber-Security Protocols v9",
    department: "IT",
    durationHours: 12,
    type: "Online Course",
    status: "Active",
    description: "Latest protocols for network defense.",
    createdAt: new Date()
  },
  {
    id: "TP-2026-003",
    title: "Heavy Machinery Safety",
    department: "Production",
    durationHours: 6,
    type: "Seminar",
    status: "Active",
    description: "Mandatory safety training for floor staff.",
    createdAt: new Date()
  },
  {
    id: "TP-2026-004",
    title: "Quantum Supply Chain Management",
    department: "Logistics",
    durationHours: 24,
    type: "Workshop",
    status: "Planning",
    description: "Optimization techniques for quantum logistics.",
    createdAt: new Date()
  }
];

export const MOCK_SESSIONS = [
  {
    id: "TS-2026-001-A",
    programId: "TP-2026-001",
    trainerName: "Cmdr. Sarah Vance",
    startDate: new Date("2026-02-10T09:00:00"),
    endDate: new Date("2026-02-14T17:00:00"),
    location: "Briefing Room Delta",
    status: "Scheduled",
    maxCapacity: 15,
    createdAt: new Date()
  },
  {
    id: "TS-2026-002-B",
    programId: "TP-2026-002",
    trainerName: "AI Instructor Unit 7",
    startDate: new Date("2026-01-20T00:00:00"),
    endDate: new Date("2026-01-20T23:59:00"),
    location: "Virtual Learning Hub",
    status: "In Progress",
    maxCapacity: 100,
    createdAt: new Date()
  },
  {
    id: "TS-2026-003-C",
    programId: "TP-2026-003",
    trainerName: "Foreman J. Miller",
    startDate: new Date("2026-01-15T08:00:00"),
    endDate: new Date("2026-01-15T14:00:00"),
    location: "Floor Sector 4",
    status: "Completed",
    maxCapacity: 30,
    createdAt: new Date()
  }
];

export async function getTrainingOverview() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    programs: MOCK_TRAINING_PROGRAMS,
    sessions: MOCK_SESSIONS,
    stats: {
      activePrograms: MOCK_TRAINING_PROGRAMS.filter(p => p.status === 'Active').length,
      upcomingSessions: MOCK_SESSIONS.filter(s => s.status === 'Scheduled').length,
      trainedStaff: 142,
      completionRate: 88
    }
  };
}
