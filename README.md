# 🚌 Bus Booking Platform Development Prompt

You are an expert full-stack developer tasked with creating a comprehensive bus booking platform. Build a modern, scalable web application with the following specifications:

## 🎨 Design Requirements
**MANDATORY DESIGN THEME:**
- **Primary Colors**: Off-white/Cream (#F8F6F0, #FDF9F3)
- **Secondary Colors**: Browning Black (#27170fff)
- **Accent Colors**: Warm Brown (#b47c62ff)
- **UI Style**: Clean, minimalist design with warm earth tones
- **Typography**: Modern, readable fonts with proper hierarchy
- **Layout**: Mobile-first responsive design

## 🔧 Technical Stack Requirements
```
Forms: React Hook Form with Zod validation
Notifications: React Hot Toast
File Handling: Multer for uploads
PDF Generation: jsPDF or Puppeteer
WhatsApp Integration: WhatsApp Business API
```

## 🚌 Core Features to Implement

### 1. Bus Search & Discovery System

**Implementation Requirements:**
- Autocomplete search with debouncing
- Real-time availability checking
- Advanced filtering system
- Alternative route suggestions
- Search history for logged-in users

### 2. Bus Listings Display

**Display Requirements:**
- Grid/List view toggle
- Sort by price, duration, departure time, ratings
- Filter results dynamically
- Show bus amenities with icons
- Driver contact information display

### 3. Advanced Seat Selection Interface

**Features to Implement:**
- Interactive seat map with click selection
- Visual indicators for different seat states
- Gender-based seat restrictions
- Dynamic pricing based on seat position
- Group seat selection for multiple passengers
- Real-time seat status updates

### 4. Passenger Information Management

**Validation Rules:**
- Name: Required, minimum 2 characters
- Age: Required, between 1-120
- Mobile: Required, valid Indian mobile format
- Email: Optional but validate if provided
- Maximum 6 passengers per booking

### 5. Booking Confirmation System

**Post-Booking Actions:**
1. Generate PDF e-ticket using jsPDF
2. Send WhatsApp message with PDF attachment
3. Store booking in database
4. Update seat availability
5. Send booking confirmation to admin panel

### 6. WhatsApp Integration System

**WhatsApp Message Template:**
```
🎫 *Booking Confirmed!*

📋 Booking ID: {bookingReference}
🚌 Bus: {operatorName}
📅 Date: {journeyDate}
🕐 Departure: {departureTime}
📍 From: {boardingPoint}
📍 To: {droppingPoint}
💺 Seats: {seatNumbers}
👥 Passengers: {passengerCount}
💰 Total: ₹{totalFare}

📱 Driver Contact: {driverContact}

*E-ticket attached as PDF*
*Safe Journey! 🙏*
```

### 7. User Dashboard & Booking Management

**Dashboard Features:**
- View all bookings (online + offline synced)
- Download e-tickets
- View booking details
- Contact driver information
- Booking status tracking

### 8. Online & Offline Booking Sync System

**Sync Requirements:**
- Offline bookings made by agents/admins
- Real-time sync when online
- Conflict resolution for seat booking
- Unified booking display for users
- Automatic seat availability updates

### 9. Multi-Language Support System

**Implementation Requirements:**
- Language switcher in header
- Store language preference in localStorage
- Translate all UI text, messages, errors
- Support for RTL layout (Gujarati)
- Date/time localization

### 10. Role-Based Admin System

**Admin Panel Features:**

#### Super Admin Dashboard:
- Assign roles to admins
- Create/edit/delete admin accounts
- View system analytics
- Manage all modules
- System configuration

#### Admin Dashboard:
- View bookings (based on permissions)
- Manage bus operations
- Handle customer queries
- Generate reports
- Offline booking creation

## 🛡️ Critical Error Handling Requirements

### 3. Edge Cases to Handle
- **Concurrent Seat Booking**: Implement seat locking mechanism
- **Session Timeout**: Auto-save form data, graceful re-authentication
- **Network Issues**: Offline queue for bookings, retry mechanism
- **Database Failures**: Transaction rollbacks, data consistency
- **File Upload Errors**: Progress tracking, retry failed uploads
- **WhatsApp API Failures**: Fallback to SMS, queue retry system

### 4. Skeleton Loading Components
Implement skeleton loaders for:

**Loading States for:**
- Search results (6-8 bus card skeletons)
- Seat map loading animation
- Form submission progress
- Dashboard data loading
- Admin table data loading
- Image loading with blur placeholders

