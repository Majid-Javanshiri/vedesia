export type ProjectNature = 'ONE_TIME' | 'PERIODIC' | 'CONTINUOUS';

export const LIFECYCLE_STAGES = [
  'STRATEGY',      // سند
  'CONTENT',       // محتوا
  'INFRASTRUCTURE', // ساخت
  'TRAINING',      // آموزش
  'EXECUTION',     // اجرا
  'INTELLIGENCE'   // هوشمندی
] as const;

export type LifecycleStage = typeof LIFECYCLE_STAGES[number];

export type Priority = 'P0' | 'P1' | 'P2' | 'P3';

export interface TaskItem {
  id: string;
  level: 1 | 2 | 3 | 4;
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  status: 'pending' | 'in-progress' | 'done' | 'approved' | 'completed';
  nature?: ProjectNature;
  lifecycleStage?: LifecycleStage;
  assetId?: AssetId; // برای اتصال تسک‌های مربوط به یک موضوع واحد (نخ تسبیح استراتژیک)
  tasks?: TaskItem[]; // برای حمایت از ساختار درختی در صورت نیاز
  
  // فیلدهای مدیریت پروژه جدید
  assignee?: string;      // مسئول
  dueDate?: string;       // تاریخ سررسید
  priority?: Priority;    // اولویت
  isMilestone?: boolean;   // مایلستون است؟
  dependencies?: string[]; // وابستگی‌ها (شناسه تسک‌های پیش‌نیاز)
  durationDays?: number;  // مدت زمان تخمینی
}

export type AssetId = 
  | 'ARCHITECT_TOOLS'
  | 'MARKET_INTELLIGENCE'
  | 'WEBSITE_SYSTEM'
  | 'CATALOG_SYSTEM'
  | 'CRM_SYSTEM'
  | 'BRAND_IDENTITY'
  | 'PRODUCT_STANDARDS'
  | 'EXHIBITION_SYSTEM'
  | 'SAMPLES_SYSTEM'
  | 'MILAN_SHOWROOM'
  | 'PR_SYSTEM'
  | 'GLOBAL_EXPANSION'
  | 'MARKETING_OPERATIONS'
  | 'SEO_GROWTH'
  | 'CONTENT_ENGINE'
  | 'TRAINING_SYSTEM'
  | 'DATA_INFRASTRUCTURE'
  | 'SALES_ENABLEMENT';

export interface StrategicAsset {
  id: AssetId;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon?: string;
}

export interface Deficiency {
  id: string;
  title: string;
  titleEn: string;
  severity: 'HIGH' | 'MEDIUM';
  reason: string;
  reasonEn: string;
}

export interface Layer {
  id: string;
  name: string;
  nameEn: string;
  description?: string;
  descriptionEn?: string;
  tasks: TaskItem[];
}

export interface Phase {
  id: string;
  name: string;
  nameEn: string;
  description?: string;
  descriptionEn?: string;
  layers: Layer[];
}
