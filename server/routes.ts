import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInfluencerSchema, insertCompanySchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { sendInfluencerFormEmail, sendCompanyFormEmail } from "./emailService";

export async function registerRoutes(app: Express): Promise<Server> {
  // Route for handling influencer applications
  app.post('/api/influencers', async (req, res) => {
    try {
      // Validate request body against the schema
      const parsedData = insertInfluencerSchema.safeParse(req.body);
      
      if (!parsedData.success) {
        const errorMessage = fromZodError(parsedData.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      // Store the influencer data
      const influencer = await storage.createInfluencer(parsedData.data);
      
      // Send email notification
      await sendInfluencerFormEmail(influencer).catch(err => {
        console.error("Failed to send influencer email notification:", err);
      });
      
      // Return success response
      return res.status(201).json({ 
        message: "Application submitted successfully", 
        influencer 
      });
    } catch (error) {
      console.error("Error submitting influencer application:", error);
      return res.status(500).json({ 
        message: "An error occurred while submitting your application"
      });
    }
  });

  // Route for handling company campaign inquiries
  app.post('/api/companies', async (req, res) => {
    try {
      // Validate request body against the schema
      const parsedData = insertCompanySchema.safeParse(req.body);
      
      if (!parsedData.success) {
        const errorMessage = fromZodError(parsedData.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      // Store the company data
      const company = await storage.createCompany(parsedData.data);
      
      // Send email notification
      await sendCompanyFormEmail(company).catch(err => {
        console.error("Failed to send company email notification:", err);
      });
      
      // Return success response
      return res.status(201).json({ 
        message: "Campaign inquiry submitted successfully", 
        company 
      });
    } catch (error) {
      console.error("Error submitting company inquiry:", error);
      return res.status(500).json({ 
        message: "An error occurred while submitting your inquiry"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
