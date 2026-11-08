// HubSpot Integration Utilities
// Portal ID: 146669350

const HUBSPOT_PORTAL_ID = "146669350";
const HUBSPOT_API_BASE = "https://api.hubapi.com";

// Form GUIDs - Add your form IDs here
export const HUBSPOT_FORMS = {
  AI_READINESS: "48dfa41b-54b7-4298-83b5-98476252f525", // Operations Diagnostic Form GUID (2026)
  CONTACT: "2dc2a672-5057-476c-9326-5f4be49eb6af",        // Verified Contact Form GUID (2026)
  WEBSITE_AUDIT: "",   // Add your Website Audit form GUID
} as const;

interface HubSpotFormData {
  [key: string]: string | number | boolean;
}

interface HubSpotContext {
  hutk?: string;      // HubSpot tracking cookie
  pageUri?: string;
  pageName?: string;
}

export interface HubSpotContact {
  email: string;
  firstname?: string;
  lastname?: string;
  company?: string;
  website?: string;
  phone?: string;
  lead_score_predictor?: number;
  pipeline_leak_score?: number;
  proposal_generated?: boolean;
  tech_audit_score?: number;
  assessment_count?: number;
  last_assessment_date?: string;
}

/**
 * Create or update a contact in HubSpot via API
 */
export async function createOrUpdateContact(
  contactData: HubSpotContact
): Promise<{ success: boolean; contactId?: string; message: string }> {
  const apiKey = process.env.HUBSPOT_API_KEY;
  
  if (!apiKey) {
    console.error('HubSpot API key not configured');
    return { success: false, message: 'HubSpot API not configured' };
  }

  // Format properties for HubSpot API
  const properties = Object.entries(contactData).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key] = String(value);
    }
    return acc;
  }, {} as Record<string, string>);

  try {
    // Try to find existing contact first
    const searchResponse = await fetch(
      `${HUBSPOT_API_BASE}/crm/v3/objects/contacts/search`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          filterGroups: [{
            filters: [{
              propertyName: 'email',
              operator: 'EQ',
              value: contactData.email,
            }]
          }],
          properties: ['email', 'firstname', 'lastname'],
        }),
      }
    );

    const searchData = await searchResponse.json();
    
    if (searchData.results && searchData.results.length > 0) {
      // Update existing contact
      const contactId = searchData.results[0].id;
      const updateResponse = await fetch(
        `${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${contactId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ properties }),
        }
      );

      if (updateResponse.ok) {
        return { success: true, contactId, message: 'Contact updated successfully' };
      }
    } else {
      // Create new contact
      const createResponse = await fetch(
        `${HUBSPOT_API_BASE}/crm/v3/objects/contacts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ properties }),
        }
      );

      if (createResponse.ok) {
        const createData = await createResponse.json();
        return { 
          success: true, 
          contactId: createData.id, 
          message: 'Contact created successfully' 
        };
      }
    }

    return { success: false, message: 'Failed to create/update contact' };
  } catch (error) {
    console.error('HubSpot API error:', error);
    return { success: false, message: 'HubSpot API error' };
  }
}

/**
 * Submit form data to HubSpot Forms API
 * @param formGuid - The HubSpot form GUID
 * @param fields - Form field data as key-value pairs
 * @param context - Optional page context
 */
export async function submitToHubSpot(
  formGuid: string,
  fields: HubSpotFormData,
  context?: HubSpotContext
): Promise<{ success: boolean; message: string }> {
  if (!formGuid) {
    console.error("HubSpot form GUID is required");
    return { success: false, message: "Form configuration error" };
  }

  // Get HubSpot tracking cookie if available
  const hutk = typeof document !== "undefined" 
    ? document.cookie.split("; ").find((row) => row.startsWith("hubspotutk="))?.split("=")[1]
    : undefined;

  // Build the fields array for HubSpot API
  const formattedFields = Object.entries(fields).map(([name, value]) => ({
    objectTypeId: "0-1", // Contact object type
    name,
    value: String(value),
  }));

  const payload = {
    fields: formattedFields,
    context: {
      hutk: hutk || context?.hutk,
      pageUri: context?.pageUri || (typeof window !== "undefined" ? window.location.href : ""),
      pageName: context?.pageName || (typeof document !== "undefined" ? document.title : ""),
    },
  };

  try {
    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${formGuid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      return { success: true, message: "Form submitted successfully" };
    } else {
      const errorData = await response.json();
      console.error("HubSpot submission error:", errorData);
      return { 
        success: false, 
        message: errorData.message || "Failed to submit form" 
      };
    }
  } catch (error) {
    console.error("HubSpot submission error:", error);
    return { 
      success: false, 
      message: "Network error. Please try again." 
    };
  }
}

/**
 * Track a custom event in HubSpot
 * @param eventName - Name of the event to track
 * @param properties - Event properties
 */
export function trackHubSpotEvent(
  eventName: string,
  properties?: Record<string, string | number | boolean>
): void {
  if (typeof window !== "undefined" && (window as unknown as { _hsq?: unknown[] })._hsq) {
    const _hsq = (window as unknown as { _hsq: unknown[] })._hsq;
    _hsq.push([
      "trackCustomBehavioralEvent",
      {
        name: eventName,
        properties: properties || {},
      },
    ]);
  }
}

/**
 * Identify a visitor in HubSpot
 * @param email - Contact's email
 * @param properties - Additional contact properties
 */
export function identifyHubSpotContact(
  email: string,
  properties?: Record<string, string | number | boolean>
): void {
  if (typeof window !== "undefined" && (window as unknown as { _hsq?: unknown[] })._hsq) {
    const _hsq = (window as unknown as { _hsq: unknown[] })._hsq;
    _hsq.push([
      "identify",
      {
        email,
        ...properties,
      },
    ]);
  }
}

export { HUBSPOT_PORTAL_ID };
