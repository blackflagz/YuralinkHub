import {
  type Influencer,
  type InsertInfluencer,
  type Company,
  type InsertCompany
} from "@shared/schema";

// Storage interface for our application
export interface IStorage {
  // Influencer methods
  createInfluencer(influencer: InsertInfluencer): Promise<Influencer>;
  getInfluencer(id: number): Promise<Influencer | undefined>;
  getAllInfluencers(): Promise<Influencer[]>;
  
  // Company methods
  createCompany(company: InsertCompany): Promise<Company>;
  getCompany(id: number): Promise<Company | undefined>;
  getAllCompanies(): Promise<Company[]>;
}

export class MemStorage implements IStorage {
  private influencers: Map<number, Influencer>;
  private companies: Map<number, Company>;
  private influencerId: number;
  private companyId: number;

  constructor() {
    this.influencers = new Map();
    this.companies = new Map();
    this.influencerId = 1;
    this.companyId = 1;
  }

  // Influencer methods
  async createInfluencer(insertInfluencer: InsertInfluencer): Promise<Influencer> {
    const id = this.influencerId++;
    const influencer: Influencer = { 
      ...insertInfluencer, 
      id,
      additionalInfo: insertInfluencer.additionalInfo || null 
    };
    this.influencers.set(id, influencer);
    return influencer;
  }

  async getInfluencer(id: number): Promise<Influencer | undefined> {
    return this.influencers.get(id);
  }

  async getAllInfluencers(): Promise<Influencer[]> {
    return Array.from(this.influencers.values());
  }
  
  // Company methods
  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const id = this.companyId++;
    const company: Company = { 
      ...insertCompany, 
      id,
      additionalNotes: insertCompany.additionalNotes || null 
    };
    this.companies.set(id, company);
    return company;
  }

  async getCompany(id: number): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async getAllCompanies(): Promise<Company[]> {
    return Array.from(this.companies.values());
  }
}

export const storage = new MemStorage();
