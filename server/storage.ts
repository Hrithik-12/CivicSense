import { 
  users, 
  type User, 
  type InsertUser,
  type Announcement,
  type InsertAnnouncement,
  type BudgetData,
  type InsertBudgetData,
  type Project,
  type InsertProject,
  type RightsCategory,
  type InsertRightsCategory,
  type PolicyUpdate,
  type InsertPolicyUpdate,
  type PolicyExplanation,
  type InsertPolicyExplanation,
  type Feedback,
  type InsertFeedback
} from "@shared/schema";

// Storage interface with all CRUD methods needed for the application
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Announcement methods
  getAnnouncements(): Promise<Announcement[]>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  
  // Budget data methods
  getBudgetData(year?: string): Promise<BudgetData[]>;
  createBudgetData(budgetData: InsertBudgetData): Promise<BudgetData>;
  
  // Project methods
  getProjects(sector?: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Rights category methods
  getRightsCategories(): Promise<RightsCategory[]>;
  createRightsCategory(rightsCategory: InsertRightsCategory): Promise<RightsCategory>;
  
  // Policy update methods
  getPolicyUpdates(): Promise<PolicyUpdate[]>;
  createPolicyUpdate(policyUpdate: InsertPolicyUpdate): Promise<PolicyUpdate>;
  
  // Policy explanation methods
  getPolicyExplanations(): Promise<PolicyExplanation[]>;
  getPolicyExplanationByQuery(query: string): Promise<PolicyExplanation | undefined>;
  getOrCreatePolicyExplanation(query: string): Promise<PolicyExplanation>;
  createPolicyExplanation(policyExplanation: InsertPolicyExplanation): Promise<PolicyExplanation>;
  
  // Feedback methods
  getFeedback(): Promise<Feedback[]>;
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private announcements: Map<number, Announcement>;
  private budgetData: Map<number, BudgetData>;
  private projects: Map<number, Project>;
  private rightsCategories: Map<number, RightsCategory>;
  private policyUpdates: Map<number, PolicyUpdate>;
  private policyExplanations: Map<number, PolicyExplanation>;
  private feedback: Map<number, Feedback>;
  
  private userIdCounter: number;
  private announcementIdCounter: number;
  private budgetDataIdCounter: number;
  private projectIdCounter: number;
  private rightsCategoryIdCounter: number;
  private policyUpdateIdCounter: number;
  private policyExplanationIdCounter: number;
  private feedbackIdCounter: number;

  constructor() {
    // Initialize maps
    this.users = new Map();
    this.announcements = new Map();
    this.budgetData = new Map();
    this.projects = new Map();
    this.rightsCategories = new Map();
    this.policyUpdates = new Map();
    this.policyExplanations = new Map();
    this.feedback = new Map();
    
    // Initialize ID counters
    this.userIdCounter = 1;
    this.announcementIdCounter = 1;
    this.budgetDataIdCounter = 1;
    this.projectIdCounter = 1;
    this.rightsCategoryIdCounter = 1;
    this.policyUpdateIdCounter = 1;
    this.policyExplanationIdCounter = 1;
    this.feedbackIdCounter = 1;
    
    // Add some initial data
    this.seedData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Announcement methods
  async getAnnouncements(): Promise<Announcement[]> {
    return Array.from(this.announcements.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  async createAnnouncement(insertAnnouncement: InsertAnnouncement): Promise<Announcement> {
    const id = this.announcementIdCounter++;
    const announcement: Announcement = { ...insertAnnouncement, id };
    this.announcements.set(id, announcement);
    return announcement;
  }
  
  // Budget data methods
  async getBudgetData(year = "current"): Promise<BudgetData[]> {
    return Array.from(this.budgetData.values())
      .filter(data => year === "current" || data.year === year);
  }
  
  async createBudgetData(insertBudgetData: InsertBudgetData): Promise<BudgetData> {
    const id = this.budgetDataIdCounter++;
    const budgetData: BudgetData = { ...insertBudgetData, id };
    this.budgetData.set(id, budgetData);
    return budgetData;
  }
  
  // Project methods
  async getProjects(sector?: string): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => !sector || project.sector === sector);
  }
  
  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.projectIdCounter++;
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }
  
  // Rights category methods
  async getRightsCategories(): Promise<RightsCategory[]> {
    return Array.from(this.rightsCategories.values());
  }
  
  async createRightsCategory(insertRightsCategory: InsertRightsCategory): Promise<RightsCategory> {
    const id = this.rightsCategoryIdCounter++;
    const rightsCategory: RightsCategory = { ...insertRightsCategory, id };
    this.rightsCategories.set(id, rightsCategory);
    return rightsCategory;
  }
  
  // Policy update methods
  async getPolicyUpdates(): Promise<PolicyUpdate[]> {
    return Array.from(this.policyUpdates.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  async createPolicyUpdate(insertPolicyUpdate: InsertPolicyUpdate): Promise<PolicyUpdate> {
    const id = this.policyUpdateIdCounter++;
    const policyUpdate: PolicyUpdate = { ...insertPolicyUpdate, id };
    this.policyUpdates.set(id, policyUpdate);
    return policyUpdate;
  }
  
  // Policy explanation methods
  async getPolicyExplanations(): Promise<PolicyExplanation[]> {
    return Array.from(this.policyExplanations.values());
  }
  
  async getPolicyExplanationByQuery(query: string): Promise<PolicyExplanation | undefined> {
    return Array.from(this.policyExplanations.values())
      .find(explanation => explanation.query.toLowerCase() === query.toLowerCase());
  }
  
  async getOrCreatePolicyExplanation(query: string): Promise<PolicyExplanation> {
    const existing = await this.getPolicyExplanationByQuery(query);
    
    if (existing) {
      return existing;
    }
    
    // Create a mock explanation if nothing exists (used as fallback)
    const mockKeyPoints = [
      "This is a sample key point for demonstration purposes.",
      "The actual explanation would be generated by the Gemini API.",
      "This is placeholder content only.",
    ];
    
    return this.createPolicyExplanation({
      query,
      explanation: `This is a simplified explanation of ${query}. In a real implementation, this would be generated by the AI service based on the actual content of the policy or law.`,
      summary: `Summary of ${query}`,
      keyPoints: mockKeyPoints
    });
  }
  
  async createPolicyExplanation(insertPolicyExplanation: InsertPolicyExplanation): Promise<PolicyExplanation> {
    const id = this.policyExplanationIdCounter++;
    const policyExplanation: PolicyExplanation = { ...insertPolicyExplanation, id };
    this.policyExplanations.set(id, policyExplanation);
    return policyExplanation;
  }
  
  // Feedback methods
  async getFeedback(): Promise<Feedback[]> {
    return Array.from(this.feedback.values())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }
  
  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const id = this.feedbackIdCounter++;
    const timestamp = new Date().toISOString();
    const feedback: Feedback = { ...insertFeedback, id, timestamp };
    this.feedback.set(id, feedback);
    return feedback;
  }
  
  // Seed the storage with some initial data
  private seedData() {
    // Seed budget data
    const sectors = ["Education", "Healthcare", "Defense", "Infrastructure", "Agriculture", "Technology"];
    const percentages = [18, 24, 15, 20, 12, 11];
    
    sectors.forEach((sector, index) => {
      this.createBudgetData({
        year: "2023-2024",
        sector,
        amount: percentages[index] * 1000,
        percentage: percentages[index]
      });
    });
    
    // Seed projects
    const projectNames = [
      "National Highway Development Program",
      "Smart City Mission",
      "Rural Electrification Project",
      "Digital India Initiative",
      "National Health Mission",
      "School Education Quality Improvement"
    ];
    
    const projectSectors = ["Infrastructure", "Technology", "Infrastructure", "Technology", "Healthcare", "Education"];
    const projectBudgets = ["₹12,000 Cr", "₹8,500 Cr", "₹6,200 Cr", "₹4,800 Cr", "₹9,700 Cr", "₹5,300 Cr"];
    const projectTimelines = ["2022-2025", "2023-2026", "2021-2024", "2022-2024", "2023-2025", "2022-2024"];
    const projectStatuses = ["On Track", "Delayed", "Completed", "On Track", "At Risk", "On Track"];
    const projectProgress = [65, 32, 100, 48, 25, 70];
    
    projectNames.forEach((name, index) => {
      this.createProject({
        name,
        sector: projectSectors[index],
        budget: projectBudgets[index],
        timeline: projectTimelines[index],
        status: projectStatuses[index],
        progress: projectProgress[index]
      });
    });
    
    // Seed rights categories
    const rightsTitles = [
      "Consumer Protection Rights",
      "Digital Privacy Rights",
      "Right to Information",
      "Right to Education",
      "Environmental Rights",
      "Labor Rights"
    ];
    
    const rightsDescriptions = [
      "Understand your rights as a consumer against unfair business practices",
      "Learn about your data privacy rights and online protections",
      "Access information held by public authorities",
      "Ensure access to free and compulsory education",
      "Protect the environment and natural resources",
      "Fair wages, safe working conditions, and protection against exploitation"
    ];
    
    rightsTitles.forEach((title, index) => {
      this.createRightsCategory({
        title,
        description: rightsDescriptions[index]
      });
    });
    
    // Seed policy updates
    const policyTitles = [
      "Digital Personal Data Protection Act",
      "New Education Policy Updates",
      "Healthcare Accessibility Guidelines"
    ];
    
    const policyDescriptions = [
      "New regulations governing the collection and processing of personal data",
      "Updated framework for education system focusing on skill development",
      "Guidelines to ensure healthcare services are accessible to all citizens"
    ];
    
    const policyDates = [
      new Date(2023, 7, 15).toISOString(),
      new Date(2023, 5, 22).toISOString(),
      new Date(2023, 3, 8).toISOString()
    ];
    
    policyTitles.forEach((title, index) => {
      this.createPolicyUpdate({
        title,
        description: policyDescriptions[index],
        date: policyDates[index],
        isNew: index === 0
      });
    });
    
    // Seed announcements
    const announcementTitles = [
      "Important Changes to Digital Privacy Laws",
      "New Tax Filing Deadline Announced"
    ];
    
    const announcementContents = [
      "The Digital Personal Data Protection Act will come into effect starting next month. Learn about how it affects your online privacy.",
      "The last date for filing income tax returns has been extended to September 30, 2023."
    ];
    
    const announcementDates = [
      new Date(2023, 7, 25).toISOString(),
      new Date(2023, 6, 18).toISOString()
    ];
    
    announcementTitles.forEach((title, index) => {
      this.createAnnouncement({
        title,
        content: announcementContents[index],
        date: announcementDates[index],
        isActive: true
      });
    });
  }
}

export const storage = new MemStorage();
