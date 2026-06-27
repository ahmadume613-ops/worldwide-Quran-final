import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

export default defineConfig({
  name: 'default',
  title: 'worldwide Quran',

  projectId: '7z1epwzq',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: [
      {
        name: 'course',
        title: 'Courses',
        type: 'document',
        fields: [
          { name: 'title', title: 'Course Title', type: 'string' },
          { name: 'urduTitle', title: 'Urdu Subtitle', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'icon', title: 'Icon (lucide name)', type: 'string' },
          { name: 'order', title: 'Display Order', type: 'number' }
        ]
      },
      {
        name: 'pricing',
        title: 'Pricing Plans',
        type: 'document',
        fields: [
          { name: 'name', title: 'Plan Name', type: 'string' },
          { name: 'priceUSD', title: 'Price (USD)', type: 'string' },
          { name: 'pricePKR', title: 'Price (PKR)', type: 'string' },
          { name: 'billing', title: 'Billing Frequency', type: 'string' },
          { name: 'features', title: 'Features List', type: 'array', of: [{ type: 'string' }] },
          { name: 'isPopular', title: 'Is Popular Plan', type: 'boolean' }
        ]
      },
      {
        name: 'inquiry',
        title: 'Student Inquiries',
        type: 'document',
        fields: [
          { name: 'studentName', title: 'Student Name', type: 'string' },
          { name: 'parentName', title: 'Parent Name (optional)', type: 'string' },
          { name: 'phone', title: 'Phone Number', type: 'string' },
          { name: 'email', title: 'Email Address', type: 'string' },
          { name: 'ageGroup', title: 'Age Group', type: 'string' },
          { name: 'courseInterest', title: 'Course of Interest', type: 'string' },
          { name: 'preferredTime', title: 'Preferred Study Time', type: 'string' },
          { name: 'message', title: 'Additional Message', type: 'text' },
          { name: 'createdAt', title: 'Submitted At', type: 'datetime' }
        ]
      },
      {
        name: 'registrations',
        title: 'Student & Parent Registrations',
        type: 'document',
        fields: [
          { name: 'studentName', title: 'Student Name', type: 'string' },
          { name: 'parentName', title: 'Parent/Guardian Name (Optional)', type: 'string' },
          { name: 'phone', title: 'WhatsApp Number (with Country Code)', type: 'string' },
          { name: 'email', title: 'Email Address', type: 'string' },
          { name: 'ageGroup', title: 'Student Age Group', type: 'string' },
          { name: 'courseInterest', title: 'Course Interest', type: 'string' },
          { name: 'preferredFormat', title: 'Preferred Class Format', type: 'string' },
          { name: 'preferredDays', title: 'Preferred Days Per Week', type: 'string' },
          { name: 'preferredTime', title: 'Preferred Study Slot', type: 'string' },
          { name: 'message', title: 'Additional Message', type: 'text' },
          { name: 'createdAt', title: 'Submitted At', type: 'datetime' }
        ]
      },
      {
        name: 'testimonials',
        title: 'Testimonials',
        type: 'document',
        fields: [
          { name: 'name', title: 'Author Name', type: 'string' },
          { name: 'role', title: 'Role / Designation', type: 'string' },
          { name: 'quote', title: 'Quote text', type: 'text' },
          { name: 'rating', title: 'Star Rating (1-5)', type: 'number' }
        ]
      }
    ],
  },
});
