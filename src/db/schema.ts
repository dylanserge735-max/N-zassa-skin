import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb, varchar, uuid } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password'),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  gender: varchar('gender', { length: 20 }),
  age: integer('age'),
  country: varchar('country', { length: 100 }),
  city: varchar('city', { length: 100 }),
  profileImage: text('profile_image'),
  authProvider: varchar('auth_provider', { length: 20 }).default('email'),
  referralCode: varchar('referral_code', { length: 20 }).unique(),
  referredBy: integer('referred_by'),
  loyaltyPoints: integer('loyalty_points').default(0),
  isAdmin: boolean('is_admin').default(false),
  isVendor: boolean('is_vendor').default(false),
  emailVerified: boolean('email_verified').default(false),
  consentDataProcessing: boolean('consent_data_processing').default(false),
  consentAiTraining: boolean('consent_ai_training').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Subscriptions table
export const subscriptions = pgTable('subscriptions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  plan: varchar('plan', { length: 50 }).notNull(), // free_trial, monthly, quarterly, annual
  status: varchar('status', { length: 20 }).notNull(), // active, expired, cancelled
  startDate: timestamp('start_date').defaultNow(),
  endDate: timestamp('end_date'),
  autoRenew: boolean('auto_renew').default(true),
  paymentMethod: varchar('payment_method', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow(),
});

// Skin Analyses table
export const skinAnalyses = pgTable('skin_analyses', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  photoFront: text('photo_front'),
  photoLeftProfile: text('photo_left_profile'),
  photoRightProfile: text('photo_right_profile'),
  photoForehead: text('photo_forehead'),
  
  // Analysis results
  acneScore: integer('acne_score'),
  activeBreakouts: integer('active_breakouts'),
  postAcneMarks: integer('post_acne_marks'),
  hyperpigmentation: integer('hyperpigmentation'),
  brownSpots: integer('brown_spots'),
  redness: integer('redness'),
  oilyZones: jsonb('oily_zones'),
  dryZones: jsonb('dry_zones'),
  darkCircles: integer('dark_circles'),
  skinToneUniformity: integer('skin_tone_uniformity'),
  skinTexture: integer('skin_texture'),
  globalRadiance: integer('global_radiance'),
  
  // Global scores (0-100)
  overallHealth: integer('overall_health'),
  hydrationScore: integer('hydration_score'),
  uniformityScore: integer('uniformity_score'),
  imperfectionsScore: integer('imperfections_score'),
  irritationRisk: integer('irritation_risk'),
  
  // AI recommendations
  morningRoutine: jsonb('morning_routine'),
  eveningRoutine: jsonb('evening_routine'),
  nutritionAdvice: jsonb('nutrition_advice'),
  
  analysisDate: timestamp('analysis_date').defaultNow(),
});

// Nutrition Questionnaire
export const nutritionProfiles = pgTable('nutrition_profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  dailyWaterIntake: integer('daily_water_intake'), // glasses
  fruitsPerDay: integer('fruits_per_day'),
  vegetablesPerDay: integer('vegetables_per_day'),
  sleepHours: decimal('sleep_hours'),
  physicalActivity: varchar('physical_activity', { length: 50 }),
  stressLevel: integer('stress_level'), // 1-10
  recommendations: jsonb('recommendations'),
  hydrationGoal: integer('hydration_goal'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Progress Tracking
export const progressPhotos = pgTable('progress_photos', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  photo: text('photo').notNull(),
  dayNumber: integer('day_number').notNull(), // 1, 30, 60, 90
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Products (Marketplace)
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  vendorId: integer('vendor_id').references(() => users.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 100 }), // cleanser, moisturizer, sunscreen, serum, supplement
  skinTypes: jsonb('skin_types'), // ['oily', 'dry', 'combination', 'normal']
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 10 }).default('XOF'),
  images: jsonb('images'),
  ingredients: text('ingredients'),
  benefits: text('benefits'),
  inStock: boolean('in_stock').default(true),
  stockQuantity: integer('stock_quantity').default(0),
  countries: jsonb('countries'), // available countries
  isSponsored: boolean('is_sponsored').default(false),
  averageRating: decimal('average_rating', { precision: 3, scale: 2 }),
  reviewCount: integer('review_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Product Reviews
export const productReviews = pgTable('product_reviews', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => products.id).notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),
  rating: integer('rating').notNull(), // 1-5
  comment: text('comment'),
  beforePhoto: text('before_photo'),
  afterPhoto: text('after_photo'),
  isVerifiedPurchase: boolean('is_verified_purchase').default(false),
  isReported: boolean('is_reported').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// Orders
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  status: varchar('status', { length: 50 }).notNull(), // pending, paid, shipped, delivered, cancelled
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 10 }).default('XOF'),
  paymentMethod: varchar('payment_method', { length: 50 }),
  paymentStatus: varchar('payment_status', { length: 50 }),
  shippingAddress: jsonb('shipping_address'),
  items: jsonb('items'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// AI Chat Messages
export const chatMessages = pgTable('chat_messages', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  role: varchar('role', { length: 20 }).notNull(), // user, assistant
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Notifications
export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message'),
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// Referrals
export const referrals = pgTable('referrals', {
  id: serial('id').primaryKey(),
  referrerId: integer('referrer_id').references(() => users.id).notNull(),
  referredId: integer('referred_id').references(() => users.id).notNull(),
  rewardGiven: boolean('reward_given').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// Vendor Applications
export const vendorApplications = pgTable('vendor_applications', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  businessName: varchar('business_name', { length: 255 }).notNull(),
  businessType: varchar('business_type', { length: 100 }),
  description: text('description'),
  status: varchar('status', { length: 50 }).default('pending'),
  documents: jsonb('documents'),
  createdAt: timestamp('created_at').defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type SkinAnalysis = typeof skinAnalyses.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
