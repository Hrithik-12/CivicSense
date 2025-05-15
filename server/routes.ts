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
    if (req.method !== 'POST') {
      return res.status(405).json({ error: true, message: 'Method not allowed' });
    }

    try {
      console.log('Request body:', req.body); // Debug log
      
      const { text, type = 'policy', language = 'en', format = 'detailed' } = req.body;
      
      // Input validation - check for required field
      if (!text) {
        console.error('Missing required field: text');
        return res.status(400).json({ 
          message: 'Query is required',
          details: "Please provide 'text' in the request body"
        });
      }

      console.log(`Processing ${type} explanation request for: ${text.substring(0, 50)}...`);

      try {
        // Generate new explanation using Gemini
        const { explainLegalText } = await import('./gemini');
        const explanation = await explainLegalText(text, type, language);
        
        // Validate Gemini response
        if (!explanation?.explanation || !explanation?.summary || !explanation?.keyPoints) {
          throw new Error('Invalid response from AI model');
        }

        console.log('Successfully generated explanation');
        
        // Return response in the exact format expected by the frontend
        return res.status(200).json({
          id: explanation.id,
          query: explanation.query,
          explanation: explanation.explanation,
          summary: explanation.summary,
          keyPoints: explanation.keyPoints
        });

      } catch (aiError) {
        console.error('Gemini API error:', aiError);
        return res.status(500).json({
          error: true,
          message: "AI service error",
          details: aiError instanceof Error ? aiError.message : 'Unknown error'
        });
      }

    } catch (error) {
      console.error('Error in explain-policy endpoint:', error);
      return res.status(500).json({
        error: true,
        message: "Failed to explain policy",
        details: error instanceof Error ? error.message : 'Unknown error'
      });
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

  // Fact-check endpoint
  apiRouter.post("/fact-check", async (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: true, message: 'Method not allowed' });
    }

    try {
      const { text, type = 'claim', language = 'en' } = req.body;
      
      if (!text) {
        return res.status(400).json({ 
          error: true,
          message: "Text content is required"
        });
      }

      // Import and use the Gemini service
      const { explainLegalText } = await import('./gemini');
      
      try {
        const aiResponse = await explainLegalText(text, type);
        
        // Transform AI response to FactCheck format
        const factCheckResult = {
          id: Date.now(),
          claim: text.slice(0, 200) + (text.length > 200 ? '...' : ''),
          analysis: aiResponse.explanation,
          conclusion: aiResponse.summary,
          factRating: determineFactRating(aiResponse),
          sources: aiResponse.keyPoints,
          confidence: 0.85 // Example confidence score
        };

        return res.status(200).json(factCheckResult);

      } catch (aiError) {
        console.error('AI service error:', aiError);
        return res.status(500).json({
          error: true,
          message: "Failed to analyze content",
          details: aiError.message
        });
      }

    } catch (error) {
      console.error('Error in fact-check endpoint:', error);
      return res.status(500).json({
        error: true,
        message: "Failed to process fact-check request",
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Helper function to determine fact rating from AI response
  function determineFactRating(aiResponse: any): "true" | "mostly-true" | "mixed" | "mostly-false" | "false" {
    // Implement logic to determine rating based on AI response
    // This is a simplified example
    const text = aiResponse.explanation.toLowerCase();
    
    if (text.includes('false') || text.includes('incorrect')) return 'false';
    if (text.includes('misleading') || text.includes('partially false')) return 'mostly-false';
    if (text.includes('mixed') || text.includes('partially true')) return 'mixed';
    if (text.includes('mostly true') || text.includes('generally accurate')) return 'mostly-true';
    if (text.includes('true') || text.includes('accurate')) return 'true';
    
    return 'mixed';
  }

  // Register the API router
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
