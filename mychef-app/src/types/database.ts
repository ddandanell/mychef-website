export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// ─── Enums / Lookup Types ───────────────────────────────────────

export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'staff'
  | 'financial_viewer'
  | 'partner';

export type BookingStatus =
  | 'draft'
  | 'offer_sent'
  | 'offer_viewed'
  | 'offer_accepted'
  | 'awaiting_payment'
  | 'payment_submitted'
  | 'payment_confirmed'
  | 'confirmed'
  | 'completed'
  | 'cancelled';

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'offer_sent'
  | 'offer_viewed'
  | 'offer_accepted'
  | 'awaiting_payment'
  | 'payment_submitted'
  | 'payment_confirmed'
  | 'confirmed'
  | 'completed'
  | 'lost'
  | 'cancelled';

export type PartnerStatus =
  | 'invited'
  | 'pending'
  | 'approved'
  | 'active'
  | 'suspended';

export type ProspectStatus =
  | 'prospect'
  | 'contacted'
  | 'interested'
  | 'onboarding_sent'
  | 'converted';

// ─── Database Interface ─────────────────────────────────────────

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          role: UserRole;
          whatsapp: string | null;
          is_active: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id: string;
          full_name: string;
          role?: UserRole;
          whatsapp?: string | null;
          is_active?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          full_name?: string;
          role?: UserRole;
          whatsapp?: string | null;
          is_active?: boolean | null;
          created_at?: string | null;
        };
      };

      audit_logs: {
        Row: {
          id: string;
          user_id: string | null;
          user_name: string;
          action: 'created' | 'updated' | 'deleted';
          entity_type: string;
          entity_id: string | null;
          old_value: Json | null;
          new_value: Json | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          user_name: string;
          action: 'created' | 'updated' | 'deleted';
          entity_type: string;
          entity_id?: string | null;
          old_value?: Json | null;
          new_value?: Json | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          user_name?: string;
          action?: 'created' | 'updated' | 'deleted';
          entity_type?: string;
          entity_id?: string | null;
          old_value?: Json | null;
          new_value?: Json | null;
          created_at?: string | null;
        };
      };

      notifications: {
        Row: {
          id: string;
          user_id: string | null;
          entity_type: string | null;
          entity_id: string | null;
          message: string;
          is_read: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          entity_type?: string | null;
          entity_id?: string | null;
          message: string;
          is_read?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          entity_type?: string | null;
          entity_id?: string | null;
          message?: string;
          is_read?: boolean | null;
          created_at?: string | null;
        };
      };

      customers: {
        Row: {
          id: string;
          name: string;
          phone: string | null;
          email: string | null;
          whatsapp: string | null;
          preferred_menu: '7_course' | '11_course' | null;
          is_returning: boolean | null;
          is_vip: boolean | null;
          data_deletion_requested: boolean | null;
          source_lead_id: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          phone?: string | null;
          email?: string | null;
          whatsapp?: string | null;
          preferred_menu?: '7_course' | '11_course' | null;
          is_returning?: boolean | null;
          is_vip?: boolean | null;
          data_deletion_requested?: boolean | null;
          source_lead_id?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string | null;
          email?: string | null;
          whatsapp?: string | null;
          preferred_menu?: '7_course' | '11_course' | null;
          is_returning?: boolean | null;
          is_vip?: boolean | null;
          data_deletion_requested?: boolean | null;
          source_lead_id?: string | null;
          created_at?: string | null;
        };
      };

      leads: {
        Row: {
          id: string;
          name: string;
          phone: string | null;
          email: string | null;
          whatsapp: string | null;
          source: 'villa_partner' | 'direct' | 'referral' | 'other' | null;
          status: LeadStatus;
          waiting_on: 'us' | 'customer' | null;
          assigned_to: string | null;
          follow_up_date: string | null;
          estimated_value: number | null;
          event_date: string | null;
          is_hot: boolean | null;
          is_surprise_booking: boolean | null;
          customer_id: string | null;
          converted_at: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          phone?: string | null;
          email?: string | null;
          whatsapp?: string | null;
          source?: 'villa_partner' | 'direct' | 'referral' | 'other' | null;
          status?: LeadStatus;
          waiting_on?: 'us' | 'customer' | null;
          assigned_to?: string | null;
          follow_up_date?: string | null;
          estimated_value?: number | null;
          event_date?: string | null;
          is_hot?: boolean | null;
          is_surprise_booking?: boolean | null;
          customer_id?: string | null;
          converted_at?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string | null;
          email?: string | null;
          whatsapp?: string | null;
          source?: 'villa_partner' | 'direct' | 'referral' | 'other' | null;
          status?: LeadStatus;
          waiting_on?: 'us' | 'customer' | null;
          assigned_to?: string | null;
          follow_up_date?: string | null;
          estimated_value?: number | null;
          event_date?: string | null;
          is_hot?: boolean | null;
          is_surprise_booking?: boolean | null;
          customer_id?: string | null;
          converted_at?: string | null;
          created_at?: string | null;
        };
      };

      lead_notes: {
        Row: {
          id: string;
          lead_id: string;
          user_id: string | null;
          note: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          lead_id: string;
          user_id?: string | null;
          note: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          lead_id?: string;
          user_id?: string | null;
          note?: string;
          created_at?: string | null;
        };
      };

      customer_notes: {
        Row: {
          id: string;
          customer_id: string;
          user_id: string | null;
          note: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          customer_id: string;
          user_id?: string | null;
          note: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          customer_id?: string;
          user_id?: string | null;
          note?: string;
          created_at?: string | null;
        };
      };

      b2b_customers: {
        Row: {
          id: string;
          company_name: string;
          contact_name: string;
          phone: string | null;
          email: string | null;
          whatsapp: string | null;
          commission_rate: number | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          company_name: string;
          contact_name: string;
          phone?: string | null;
          email?: string | null;
          whatsapp?: string | null;
          commission_rate?: number | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          company_name?: string;
          contact_name?: string;
          phone?: string | null;
          email?: string | null;
          whatsapp?: string | null;
          commission_rate?: number | null;
          created_at?: string | null;
        };
      };

      partner_prospects: {
        Row: {
          id: string;
          company_name: string;
          contact_name: string | null;
          phone: string | null;
          whatsapp: string | null;
          email: string | null;
          area: string | null;
          status: ProspectStatus;
          assigned_to: string | null;
          follow_up_date: string | null;
          last_activity_at: string | null;
          is_cold: boolean | null;
          exclusivity_zone: string | null;
          notes: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          company_name: string;
          contact_name?: string | null;
          phone?: string | null;
          whatsapp?: string | null;
          email?: string | null;
          area?: string | null;
          status?: ProspectStatus;
          assigned_to?: string | null;
          follow_up_date?: string | null;
          last_activity_at?: string | null;
          is_cold?: boolean | null;
          exclusivity_zone?: string | null;
          notes?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          company_name?: string;
          contact_name?: string | null;
          phone?: string | null;
          whatsapp?: string | null;
          email?: string | null;
          area?: string | null;
          status?: ProspectStatus;
          assigned_to?: string | null;
          follow_up_date?: string | null;
          last_activity_at?: string | null;
          is_cold?: boolean | null;
          exclusivity_zone?: string | null;
          notes?: string | null;
          created_at?: string | null;
        };
      };

      prospect_contacts: {
        Row: {
          id: string;
          prospect_id: string;
          name: string;
          title: string | null;
          whatsapp: string | null;
          email: string | null;
          is_primary: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          prospect_id: string;
          name: string;
          title?: string | null;
          whatsapp?: string | null;
          email?: string | null;
          is_primary?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          prospect_id?: string;
          name?: string;
          title?: string | null;
          whatsapp?: string | null;
          email?: string | null;
          is_primary?: boolean | null;
          created_at?: string | null;
        };
      };

      prospect_activities: {
        Row: {
          id: string;
          prospect_id: string;
          contact_id: string | null;
          user_id: string | null;
          type: 'call' | 'meeting' | 'whatsapp' | 'email';
          notes: string | null;
          next_step: string | null;
          next_step_date: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          prospect_id: string;
          contact_id?: string | null;
          user_id?: string | null;
          type: 'call' | 'meeting' | 'whatsapp' | 'email';
          notes?: string | null;
          next_step?: string | null;
          next_step_date?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          prospect_id?: string;
          contact_id?: string | null;
          user_id?: string | null;
          type?: 'call' | 'meeting' | 'whatsapp' | 'email';
          notes?: string | null;
          next_step?: string | null;
          next_step_date?: string | null;
          created_at?: string | null;
        };
      };

      partners: {
        Row: {
          id: string;
          company_name: string;
          contact_name: string;
          whatsapp: string | null;
          email: string | null;
          villa_name: string | null;
          villa_count: number | null;
          address: string | null;
          area: string | null;
          parent_company: string | null;
          has_kitchen: boolean | null;
          has_equipment: boolean | null;
          bank_account: string | null;
          bank_name: string | null;
          commission_rate: number | null;
          onboarding_token: string | null;
          onboarding_submitted_at: string | null;
          status: PartnerStatus;
          contract_accepted_at: string | null;
          contract_accepted_ip: string | null;
          contract_accepted_useragent: string | null;
          contract_accepted_typed_name: string | null;
          approved_by: string | null;
          approved_at: string | null;
          exclusivity_zone: string | null;
          exclusivity_expires_at: string | null;
          show_in_directory: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          company_name: string;
          contact_name: string;
          whatsapp?: string | null;
          email?: string | null;
          villa_name?: string | null;
          villa_count?: number | null;
          address?: string | null;
          area?: string | null;
          parent_company?: string | null;
          has_kitchen?: boolean | null;
          has_equipment?: boolean | null;
          bank_account?: string | null;
          bank_name?: string | null;
          commission_rate?: number | null;
          onboarding_token?: string | null;
          onboarding_submitted_at?: string | null;
          status?: PartnerStatus;
          contract_accepted_at?: string | null;
          contract_accepted_ip?: string | null;
          contract_accepted_useragent?: string | null;
          contract_accepted_typed_name?: string | null;
          approved_by?: string | null;
          approved_at?: string | null;
          exclusivity_zone?: string | null;
          exclusivity_expires_at?: string | null;
          show_in_directory?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          company_name?: string;
          contact_name?: string;
          whatsapp?: string | null;
          email?: string | null;
          villa_name?: string | null;
          villa_count?: number | null;
          address?: string | null;
          area?: string | null;
          parent_company?: string | null;
          has_kitchen?: boolean | null;
          has_equipment?: boolean | null;
          bank_account?: string | null;
          bank_name?: string | null;
          commission_rate?: number | null;
          onboarding_token?: string | null;
          onboarding_submitted_at?: string | null;
          status?: PartnerStatus;
          contract_accepted_at?: string | null;
          contract_accepted_ip?: string | null;
          contract_accepted_useragent?: string | null;
          contract_accepted_typed_name?: string | null;
          approved_by?: string | null;
          approved_at?: string | null;
          exclusivity_zone?: string | null;
          exclusivity_expires_at?: string | null;
          show_in_directory?: boolean | null;
          created_at?: string | null;
        };
      };

      partner_contacts: {
        Row: {
          id: string;
          partner_id: string;
          name: string;
          title: string | null;
          whatsapp: string | null;
          email: string | null;
          is_primary: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          partner_id: string;
          name: string;
          title?: string | null;
          whatsapp?: string | null;
          email?: string | null;
          is_primary?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          partner_id?: string;
          name?: string;
          title?: string | null;
          whatsapp?: string | null;
          email?: string | null;
          is_primary?: boolean | null;
          created_at?: string | null;
        };
      };

      partner_notes: {
        Row: {
          id: string;
          partner_id: string;
          user_id: string | null;
          note: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          partner_id: string;
          user_id?: string | null;
          note: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          partner_id?: string;
          user_id?: string | null;
          note?: string;
          created_at?: string | null;
        };
      };

      partner_activities: {
        Row: {
          id: string;
          partner_id: string;
          contact_id: string | null;
          user_id: string | null;
          type: 'call' | 'meeting' | 'whatsapp' | 'email';
          notes: string | null;
          next_step: string | null;
          next_step_date: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          partner_id: string;
          contact_id?: string | null;
          user_id?: string | null;
          type: 'call' | 'meeting' | 'whatsapp' | 'email';
          notes?: string | null;
          next_step?: string | null;
          next_step_date?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          partner_id?: string;
          contact_id?: string | null;
          user_id?: string | null;
          type?: 'call' | 'meeting' | 'whatsapp' | 'email';
          notes?: string | null;
          next_step?: string | null;
          next_step_date?: string | null;
          created_at?: string | null;
        };
      };

      partner_payouts: {
        Row: {
          id: string;
          partner_id: string;
          booking_id: string | null;
          amount: number;
          due_date: string;
          status: 'pending' | 'paid' | 'overdue';
          paid_at: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          partner_id: string;
          booking_id?: string | null;
          amount: number;
          due_date: string;
          status?: 'pending' | 'paid' | 'overdue';
          paid_at?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          partner_id?: string;
          booking_id?: string | null;
          amount?: number;
          due_date?: string;
          status?: 'pending' | 'paid' | 'overdue';
          paid_at?: string | null;
          created_at?: string | null;
        };
      };

      partner_certificates: {
        Row: {
          id: string;
          partner_id: string;
          certificate_number: string;
          token: string;
          is_preview: boolean | null;
          is_active: boolean | null;
          issued_at: string | null;
          view_count: number | null;
          last_viewed_at: string | null;
        };
        Insert: {
          id?: string;
          partner_id: string;
          certificate_number?: string;
          token?: string;
          is_preview?: boolean | null;
          is_active?: boolean | null;
          issued_at?: string | null;
          view_count?: number | null;
          last_viewed_at?: string | null;
        };
        Update: {
          id?: string;
          partner_id?: string;
          certificate_number?: string;
          token?: string;
          is_preview?: boolean | null;
          is_active?: boolean | null;
          issued_at?: string | null;
          view_count?: number | null;
          last_viewed_at?: string | null;
        };
      };

      suppliers: {
        Row: {
          id: string;
          company_name: string;
          contact_name: string | null;
          phone: string | null;
          email: string | null;
          address: string | null;
          payment_type: 'cash' | 'invoice' | null;
          has_minimum: boolean | null;
          minimum_amount: number | null;
          has_delivery: boolean | null;
          delivery_notes: string | null;
          is_active: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          company_name: string;
          contact_name?: string | null;
          phone?: string | null;
          email?: string | null;
          address?: string | null;
          payment_type?: 'cash' | 'invoice' | null;
          has_minimum?: boolean | null;
          minimum_amount?: number | null;
          has_delivery?: boolean | null;
          delivery_notes?: string | null;
          is_active?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          company_name?: string;
          contact_name?: string | null;
          phone?: string | null;
          email?: string | null;
          address?: string | null;
          payment_type?: 'cash' | 'invoice' | null;
          has_minimum?: boolean | null;
          minimum_amount?: number | null;
          has_delivery?: boolean | null;
          delivery_notes?: string | null;
          is_active?: boolean | null;
          created_at?: string | null;
        };
      };

      supplier_notes: {
        Row: {
          id: string;
          supplier_id: string;
          user_id: string | null;
          note: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          supplier_id: string;
          user_id?: string | null;
          note: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          supplier_id?: string;
          user_id?: string | null;
          note?: string;
          created_at?: string | null;
        };
      };

      supplier_products: {
        Row: {
          id: string;
          supplier_id: string;
          name: string;
          description: string | null;
          category: 'furniture' | 'glassware' | 'bar' | 'staff' | 'other' | null;
          cost_price: number;
          unit: string | null;
          is_active: boolean | null;
          last_updated_at: string | null;
          last_updated_by: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          supplier_id: string;
          name: string;
          description?: string | null;
          category?: 'furniture' | 'glassware' | 'bar' | 'staff' | 'other' | null;
          cost_price?: number;
          unit?: string | null;
          is_active?: boolean | null;
          last_updated_at?: string | null;
          last_updated_by?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          supplier_id?: string;
          name?: string;
          description?: string | null;
          category?: 'furniture' | 'glassware' | 'bar' | 'staff' | 'other' | null;
          cost_price?: number;
          unit?: string | null;
          is_active?: boolean | null;
          last_updated_at?: string | null;
          last_updated_by?: string | null;
          created_at?: string | null;
        };
      };

      products: {
        Row: {
          id: string;
          name: string;
          category: 'menu' | 'food' | 'drink' | 'service' | 'rental';
          description: string | null;
          cost_price: number;
          sales_price: number;
          unit: 'per_person' | 'per_bottle' | 'per_item' | 'per_night' | 'per_event' | null;
          is_food: boolean | null;
          is_active: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          category: 'menu' | 'food' | 'drink' | 'service' | 'rental';
          description?: string | null;
          cost_price?: number;
          sales_price?: number;
          unit?: 'per_person' | 'per_bottle' | 'per_item' | 'per_night' | 'per_event' | null;
          is_food?: boolean | null;
          is_active?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          category?: 'menu' | 'food' | 'drink' | 'service' | 'rental';
          description?: string | null;
          cost_price?: number;
          sales_price?: number;
          unit?: 'per_person' | 'per_bottle' | 'per_item' | 'per_night' | 'per_event' | null;
          is_food?: boolean | null;
          is_active?: boolean | null;
          created_at?: string | null;
        };
      };

      menus: {
        Row: {
          id: string;
          name: string;
          type: '7_course' | '11_course' | 'custom';
          description: string | null;
          prep_time_home: number | null;
          prep_time_venue: number | null;
          total_event_time: number | null;
          external_link: string | null;
          standard_invitation_text: string | null;
          min_guests: number | null;
          price_per_person: number;
          cost_per_person: number;
          is_active: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          type: '7_course' | '11_course' | 'custom';
          description?: string | null;
          prep_time_home?: number | null;
          prep_time_venue?: number | null;
          total_event_time?: number | null;
          external_link?: string | null;
          standard_invitation_text?: string | null;
          min_guests?: number | null;
          price_per_person?: number;
          cost_per_person?: number;
          is_active?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          type?: '7_course' | '11_course' | 'custom';
          description?: string | null;
          prep_time_home?: number | null;
          prep_time_venue?: number | null;
          total_event_time?: number | null;
          external_link?: string | null;
          standard_invitation_text?: string | null;
          min_guests?: number | null;
          price_per_person?: number;
          cost_per_person?: number;
          is_active?: boolean | null;
          created_at?: string | null;
        };
      };

      menu_images: {
        Row: {
          id: string;
          menu_id: string;
          storage_path: string;
          display_order: number | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          menu_id: string;
          storage_path: string;
          display_order?: number | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          menu_id?: string;
          storage_path?: string;
          display_order?: number | null;
          created_at?: string | null;
        };
      };

      staff_profiles: {
        Row: {
          id: string;
          profile_id: string;
          role_type: 'chef' | 'waiter' | 'coordinator' | null;
          total_events: number | null;
          avg_score: number | null;
          last_event_date: string | null;
          low_score_alert: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          profile_id: string;
          role_type?: 'chef' | 'waiter' | 'coordinator' | null;
          total_events?: number | null;
          avg_score?: number | null;
          last_event_date?: string | null;
          low_score_alert?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          profile_id?: string;
          role_type?: 'chef' | 'waiter' | 'coordinator' | null;
          total_events?: number | null;
          avg_score?: number | null;
          last_event_date?: string | null;
          low_score_alert?: boolean | null;
          created_at?: string | null;
        };
      };

      bookings: {
        Row: {
          id: string;
          reference: string;
          lead_id: string | null;
          customer_id: string | null;
          b2b_customer_id: string | null;
          partner_id: string | null;
          is_b2b: boolean | null;
          is_surprise: boolean | null;
          event_date: string | null;
          event_time: string | null;
          event_end_time: string | null;
          guests: number | null;
          min_guests: number | null;
          venue_name: string | null;
          venue_address: string | null;
          venue_area: string | null;
          venue_contact_name: string | null;
          venue_contact_phone: string | null;
          assigned_chef: string | null;
          status: BookingStatus;
          offer_token: string | null;
          offer_version: number | null;
          offer_sent_at: string | null;
          offer_viewed_count: number | null;
          offer_last_viewed_at: string | null;
          offer_expires_at: string | null;
          offer_question: string | null;
          offer_accepted_at: string | null;
          payment_method: 'local_bank' | 'international' | 'wise' | null;
          payment_deadline: string | null;
          payment_deadline_override: boolean | null;
          payment_submitted_at: string | null;
          payment_screenshot_url: string | null;
          payment_confirmed_at: string | null;
          payment_confirmed_by: string | null;
          cancellation_fee_applicable: boolean | null;
          cancellation_fee_amount: number | null;
          cancellation_fee_invoice_sent: boolean | null;
          survey_sent_at: string | null;
          survey_token: string | null;
          event_summary_generated: boolean | null;
          notes: string | null;
          created_by: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          reference?: string;
          lead_id?: string | null;
          customer_id?: string | null;
          b2b_customer_id?: string | null;
          partner_id?: string | null;
          is_b2b?: boolean | null;
          is_surprise?: boolean | null;
          event_date?: string | null;
          event_time?: string | null;
          event_end_time?: string | null;
          guests?: number | null;
          min_guests?: number | null;
          venue_name?: string | null;
          venue_address?: string | null;
          venue_area?: string | null;
          venue_contact_name?: string | null;
          venue_contact_phone?: string | null;
          assigned_chef?: string | null;
          status?: BookingStatus;
          offer_token?: string | null;
          offer_version?: number | null;
          offer_sent_at?: string | null;
          offer_viewed_count?: number | null;
          offer_last_viewed_at?: string | null;
          offer_expires_at?: string | null;
          offer_question?: string | null;
          offer_accepted_at?: string | null;
          payment_method?: 'local_bank' | 'international' | 'wise' | null;
          payment_deadline?: string | null;
          payment_deadline_override?: boolean | null;
          payment_submitted_at?: string | null;
          payment_screenshot_url?: string | null;
          payment_confirmed_at?: string | null;
          payment_confirmed_by?: string | null;
          cancellation_fee_applicable?: boolean | null;
          cancellation_fee_amount?: number | null;
          cancellation_fee_invoice_sent?: boolean | null;
          survey_sent_at?: string | null;
          survey_token?: string | null;
          event_summary_generated?: boolean | null;
          notes?: string | null;
          created_by?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          reference?: string;
          lead_id?: string | null;
          customer_id?: string | null;
          b2b_customer_id?: string | null;
          partner_id?: string | null;
          is_b2b?: boolean | null;
          is_surprise?: boolean | null;
          event_date?: string | null;
          event_time?: string | null;
          event_end_time?: string | null;
          guests?: number | null;
          min_guests?: number | null;
          venue_name?: string | null;
          venue_address?: string | null;
          venue_area?: string | null;
          venue_contact_name?: string | null;
          venue_contact_phone?: string | null;
          assigned_chef?: string | null;
          status?: BookingStatus;
          offer_token?: string | null;
          offer_version?: number | null;
          offer_sent_at?: string | null;
          offer_viewed_count?: number | null;
          offer_last_viewed_at?: string | null;
          offer_expires_at?: string | null;
          offer_question?: string | null;
          offer_accepted_at?: string | null;
          payment_method?: 'local_bank' | 'international' | 'wise' | null;
          payment_deadline?: string | null;
          payment_deadline_override?: boolean | null;
          payment_submitted_at?: string | null;
          payment_screenshot_url?: string | null;
          payment_confirmed_at?: string | null;
          payment_confirmed_by?: string | null;
          cancellation_fee_applicable?: boolean | null;
          cancellation_fee_amount?: number | null;
          cancellation_fee_invoice_sent?: boolean | null;
          survey_sent_at?: string | null;
          survey_token?: string | null;
          event_summary_generated?: boolean | null;
          notes?: string | null;
          created_by?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };

      booking_notes: {
        Row: {
          id: string;
          booking_id: string;
          user_id: string | null;
          note: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          booking_id: string;
          user_id?: string | null;
          note: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          booking_id?: string;
          user_id?: string | null;
          note?: string;
          created_at?: string | null;
        };
      };

      booking_items: {
        Row: {
          id: string;
          booking_id: string;
          product_id: string | null;
          supplier_product_id: string | null;
          name: string;
          quantity: number;
          unit_price: number;
          unit_cost: number;
          is_food: boolean | null;
          subtotal: number;
          locked_at: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          booking_id: string;
          product_id?: string | null;
          supplier_product_id?: string | null;
          name: string;
          quantity?: number;
          unit_price: number;
          unit_cost?: number;
          is_food?: boolean | null;
          subtotal?: number;
          locked_at?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          booking_id?: string;
          product_id?: string | null;
          supplier_product_id?: string | null;
          name?: string;
          quantity?: number;
          unit_price?: number;
          unit_cost?: number;
          is_food?: boolean | null;
          subtotal?: number;
          locked_at?: string | null;
          created_at?: string | null;
        };
      };

      booking_adhoc_costs: {
        Row: {
          id: string;
          booking_id: string;
          description: string;
          amount: number;
          requires_approval: boolean | null;
          approved_by: string | null;
          approved_at: string | null;
          created_by: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          booking_id: string;
          description: string;
          amount: number;
          requires_approval?: boolean | null;
          approved_by?: string | null;
          approved_at?: string | null;
          created_by?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          booking_id?: string;
          description?: string;
          amount?: number;
          requires_approval?: boolean | null;
          approved_by?: string | null;
          approved_at?: string | null;
          created_by?: string | null;
          created_at?: string | null;
        };
      };

      guests: {
        Row: {
          id: string;
          booking_id: string;
          name: string;
          email: string | null;
          dietary_requirements: string | null;
          invitation_sent: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          booking_id: string;
          name: string;
          email?: string | null;
          dietary_requirements?: string | null;
          invitation_sent?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          booking_id?: string;
          name?: string;
          email?: string | null;
          dietary_requirements?: string | null;
          invitation_sent?: boolean | null;
          created_at?: string | null;
        };
      };

      booking_calculations: {
        Row: {
          booking_id: string;
          total_revenue: number | null;
          food_revenue: number | null;
          drink_revenue: number | null;
          other_revenue: number | null;
          ingredients_cost: number | null;
          staff_cost: number | null;
          partner_commission: number | null;
          adhoc_costs: number | null;
          total_costs: number | null;
          gross_profit: number | null;
          team1_split: number | null;
          team2_split: number | null;
          confirmed_at: string | null;
          confirmed_by: string | null;
          last_calculated_at: string | null;
        };
        Insert: {
          booking_id: string;
          total_revenue?: number | null;
          food_revenue?: number | null;
          drink_revenue?: number | null;
          other_revenue?: number | null;
          ingredients_cost?: number | null;
          staff_cost?: number | null;
          partner_commission?: number | null;
          adhoc_costs?: number | null;
          total_costs?: number | null;
          gross_profit?: number | null;
          team1_split?: number | null;
          team2_split?: number | null;
          confirmed_at?: string | null;
          confirmed_by?: string | null;
          last_calculated_at?: string | null;
        };
        Update: {
          booking_id?: string;
          total_revenue?: number | null;
          food_revenue?: number | null;
          drink_revenue?: number | null;
          other_revenue?: number | null;
          ingredients_cost?: number | null;
          staff_cost?: number | null;
          partner_commission?: number | null;
          adhoc_costs?: number | null;
          total_costs?: number | null;
          gross_profit?: number | null;
          team1_split?: number | null;
          team2_split?: number | null;
          confirmed_at?: string | null;
          confirmed_by?: string | null;
          last_calculated_at?: string | null;
        };
      };

      team_payouts: {
        Row: {
          id: string;
          team: 'team1' | 'team2';
          period: string;
          amount: number;
          status: 'pending' | 'paid';
          paid_at: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          team: 'team1' | 'team2';
          period: string;
          amount?: number;
          status?: 'pending' | 'paid';
          paid_at?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          team?: 'team1' | 'team2';
          period?: string;
          amount?: number;
          status?: 'pending' | 'paid';
          paid_at?: string | null;
          created_at?: string | null;
        };
      };

      survey_templates: {
        Row: {
          id: string;
          name: string;
          is_active: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          is_active?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          is_active?: boolean | null;
          created_at?: string | null;
        };
      };

      survey_questions: {
        Row: {
          id: string;
          template_id: string;
          question_text: string;
          type: 'score_1_5' | 'open_text';
          display_order: number;
          is_locked: boolean | null;
          is_required: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          template_id: string;
          question_text: string;
          type: 'score_1_5' | 'open_text';
          display_order?: number;
          is_locked?: boolean | null;
          is_required?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          template_id?: string;
          question_text?: string;
          type?: 'score_1_5' | 'open_text';
          display_order?: number;
          is_locked?: boolean | null;
          is_required?: boolean | null;
          created_at?: string | null;
        };
      };

      survey_responses: {
        Row: {
          id: string;
          booking_id: string;
          token: string;
          token_used: boolean | null;
          respondent_name: string | null;
          respondent_type: 'customer' | 'b2b_partner' | null;
          is_new: boolean | null;
          submitted_at: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          booking_id: string;
          token?: string;
          token_used?: boolean | null;
          respondent_name?: string | null;
          respondent_type?: 'customer' | 'b2b_partner' | null;
          is_new?: boolean | null;
          submitted_at?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          booking_id?: string;
          token?: string;
          token_used?: boolean | null;
          respondent_name?: string | null;
          respondent_type?: 'customer' | 'b2b_partner' | null;
          is_new?: boolean | null;
          submitted_at?: string | null;
          created_at?: string | null;
        };
      };

      survey_answers: {
        Row: {
          id: string;
          response_id: string;
          question_id: string;
          score: number | null;
          text_answer: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          response_id: string;
          question_id: string;
          score?: number | null;
          text_answer?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          response_id?: string;
          question_id?: string;
          score?: number | null;
          text_answer?: string | null;
          created_at?: string | null;
        };
      };

      resources: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          file_path: string;
          public_token: string;
          view_count: number | null;
          last_viewed_at: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          file_path: string;
          public_token?: string;
          view_count?: number | null;
          last_viewed_at?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          file_path?: string;
          public_token?: string;
          view_count?: number | null;
          last_viewed_at?: string | null;
          created_at?: string | null;
        };
      };

      whatsapp_templates: {
        Row: {
          id: string;
          name: string;
          body: string;
          variables: string[] | null;
          category: 'offer' | 'payment' | 'confirmation' | 'survey' | 'partner' | 'outreach' | null;
          is_active: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          body: string;
          variables?: string[] | null;
          category?: 'offer' | 'payment' | 'confirmation' | 'survey' | 'partner' | 'outreach' | null;
          is_active?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          body?: string;
          variables?: string[] | null;
          category?: 'offer' | 'payment' | 'confirmation' | 'survey' | 'partner' | 'outreach' | null;
          is_active?: boolean | null;
          created_at?: string | null;
        };
      };

      app_settings: {
        Row: {
          key: string;
          value: Json;
          updated_by: string | null;
          updated_at: string | null;
        };
        Insert: {
          key: string;
          value: Json;
          updated_by?: string | null;
          updated_at?: string | null;
        };
        Update: {
          key?: string;
          value?: Json;
          updated_by?: string | null;
          updated_at?: string | null;
        };
      };
    };

    Views: {
      [_ in never]: never;
    };

    Functions: {
      [_ in never]: never;
    };

    Enums: {
      [_ in never]: never;
    };
  };
}

// ─── Helper Types ───────────────────────────────────────────────

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];
