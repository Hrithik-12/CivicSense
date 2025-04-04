import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertAnnouncementSchema, 
  insertBudgetDataSchema, 
  insertProjectSchema, 
  insertRightsCategorySchema, 
  insertPolicyUpdateSchema,
  insertPolicyExplanationSchema,
  insertFeedbackSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - prefix all routes with /api
  const apiRouter = express.Router();

  // Announcements endpoints
  apiRouter.get("/announcements", async (req, res) => {
    try {
      const announcements = await storage.getAnnouncements();
      res.json(announcements);
    } catch (error) {
      res.status(500).json({ message: "Failed to get announcements" });
    }
  });

  apiRouter.post("/announcements", async (req, res) => {
    try {
      const announcement = insertAnnouncementSchema.parse(req.body);
      const newAnnouncement = await storage.createAnnouncement(announcement);
      res.status(201).json(newAnnouncement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid announcement data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create announcement" });
      }
    }
  });

  // Budget data endpoints
  apiRouter.get("/budget", async (req, res) => {
    try {
      const year = req.query.year as string || "current";
      const budgetData = await storage.getBudgetData(year);
      res.json(budgetData);
    } catch (error) {
      res.status(500).json({ message: "Failed to get budget data" });
    }
  });

  apiRouter.post("/budget", async (req, res) => {
    try {
      const budgetData = insertBudgetDataSchema.parse(req.body);
      const newBudgetData = await storage.createBudgetData(budgetData);
      res.status(201).json(newBudgetData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid budget data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create budget data" });
      }
    }
  });

  // Projects endpoints
  apiRouter.get("/projects", async (req, res) => {
    try {
      const sector = req.query.sector as string;
      const projects = await storage.getProjects(sector);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to get projects" });
    }
  });

  apiRouter.post("/projects", async (req, res) => {
    try {
      const project = insertProjectSchema.parse(req.body);
      const newProject = await storage.createProject(project);
      res.status(201).json(newProject);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid project data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create project" });
      }
    }
  });

  // Rights categories endpoints
  apiRouter.get("/rights", async (req, res) => {
    try {
      const rights = await storage.getRightsCategories();
      res.json(rights);
    } catch (error) {
      res.status(500).json({ message: "Failed to get rights categories" });
    }
  });

  apiRouter.post("/rights", async (req, res) => {
    try {
      const rightsCategory = insertRightsCategorySchema.parse(req.body);
      const newRightsCategory = await storage.createRightsCategory(rightsCategory);
      res.status(201).json(newRightsCategory);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid rights category data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create rights category" });
      }
    }
  });

  // Policy updates endpoints
  apiRouter.get("/policy-updates", async (req, res) => {
    try {
      const policyUpdates = await storage.getPolicyUpdates();
      res.json(policyUpdates);
    } catch (error) {
      res.status(500).json({ message: "Failed to get policy updates" });
    }
  });

  apiRouter.post("/policy-updates", async (req, res) => {
    try {
      const policyUpdate = insertPolicyUpdateSchema.parse(req.body);
      const newPolicyUpdate = await storage.createPolicyUpdate(policyUpdate);
      res.status(201).json(newPolicyUpdate);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid policy update data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create policy update" });
      }
    }
  });

  // AI Policy Explainer endpoint with Gemini
  apiRouter.post("/explain-policy", async (req, res) => {
    try {
      const { query } = req.body;
      if (!query) {
        return res.status(400).json({ message: "Query is required" });
      }

      // Check if we already have an explanation for this query
      let explanation = await storage.getPolicyExplanationByQuery(query);
      
      if (!explanation) {
        // If not found in storage, use Gemini API to generate one
        try {
          const { explainLegalText } = await import('./gemini');
          explanation = await explainLegalText(query);
          
          // Store the generated explanation for future use
          await storage.createPolicyExplanation({
            query,
            explanation: explanation.explanation,
            summary: explanation.summary,
            keyPoints: explanation.keyPoints
          });
        } catch (aiError) {
          console.error('Gemini API error:', aiError);
          
          // Fallback to mock data if Gemini API fails or is not configured
          explanation = await storage.getOrCreatePolicyExplanation(query);
        }
      }
      
      res.json(explanation);
    } catch (error) {
      console.error('Error in explain-policy endpoint:', error);
      res.status(500).json({ message: "Failed to explain policy" });
    }
  });

  // Feedback endpoint
  apiRouter.post("/feedback", async (req, res) => {
    try {
      const feedback = insertFeedbackSchema.parse(req.body);
      const newFeedback = await storage.createFeedback(feedback);
      res.status(201).json(newFeedback);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid feedback data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to submit feedback" });
      }
    }
  });

  // Register the API router
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
