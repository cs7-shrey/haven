# Haven

A hotel search and booking platform that uses LLMs and speech transcription to convert voice queries into structured search filters.

## Overview

The application integrates Google Gemini, Anthropic Claude, and Speechmatics speech recognition. Users can search using filters or speak their requirements, which are processed through LLMs to extract search parameters.

## Features

### Voice Search
WebSocket-based audio streaming sends user speech to Speechmatics for transcription, then to an LLM for extraction of search parameters including location, price range, amenities, and dates.

### Search and Filtering
Proximity-based searches using PostgreSQL with PostGIS extensions. Supports filtering by hotel ratings, property types, amenities, and price ranges.

### AI Assistant
CopilotKit integration provides functions for finding nearby places and calculating distances between locations.

### Hotel Details and Booking
Hotel pages display room types, rate plans, amenities, and user reviews. Database schema maintains relationships between hotels, rooms, rate plans, and bookings.

### Search History
Stores recent searches for authenticated users.

## Technology Stack

### Backend
- **Framework**: FastAPI with Python 3.13
- **Database**: PostgreSQL with PostGIS for geographic queries
- **ORM**: SQLAlchemy with GeoAlchemy2
- **AI Services**: 
  - Google Gemini (via langchain-google-genai)
  - Anthropic Claude (via langchain-anthropic)
  - OpenAI (via langchain-openai)
  - Speechmatics for real-time speech transcription
- **Authentication**: JWT-based authentication with OAuth2
- **Maps & Location**: Google Maps API for geocoding and place autocomplete
- **Deployment**: Docker, Gunicorn with uvicorn workers

### Frontend
- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **State Management**: Zustand
- **Maps**: @vis.gl/react-google-maps
- **Audio Visualization**: Audiomotion Analyzer
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios

## Project Structure

```
haven/
├── backend/                 # FastAPI backend application
│   ├── app/
│   │   ├── router/         # API route handlers
│   │   │   ├── auth/       # Authentication endpoints
│   │   │   ├── hotel_search/  # Hotel search functionality
│   │   │   ├── voice_search_exp/  # Voice search WebSocket
│   │   │   ├── booking/    # Booking management
│   │   │   └── cpkit.py    # CopilotKit integration
│   │   ├── services/       # Business logic layer
│   │   │   ├── ai/         # LLM integration (prompts, schemas)
│   │   │   ├── transcription/  # Speech-to-text services
│   │   │   ├── maps/       # Google Maps integration
│   │   │   ├── tools/      # AI agent tools
│   │   │   └── crud/       # Database operations
│   │   ├── models.py       # SQLAlchemy database models
│   │   ├── schemas.py      # Pydantic request/response schemas
│   │   ├── database.py     # Database connection setup
│   │   └── main.py         # FastAPI application entry point
│   ├── requirements.txt
│   └── pyproject.toml
│
└── haven/                  # Next.js frontend application
    ├── src/
    │   ├── app/           # Next.js app router pages
    │   │   ├── page.tsx   # Landing page
    │   │   ├── hotels/    # Search results page
    │   │   ├── hotel/[id]/ # Hotel detail page
    │   │   ├── booking/   # Booking flow
    │   │   └── profile/   # User profile
    │   ├── components/    # React components
    │   │   ├── auth/      # Authentication UI
    │   │   ├── search/    # Search bar and filters
    │   │   ├── voice-search/  # Voice input UI
    │   │   ├── booking/   # Booking components
    │   │   ├── chat/      # AI assistant chat
    │   │   └── ui/        # Shared UI components
    │   ├── hooks/         # Custom React hooks
    │   ├── store/         # Zustand state stores
    │   ├── context/       # React context providers
    │   └── lib/           # Utility functions
    └── package.json
```

## Getting Started

### Prerequisites
- Python 3.13+
- Node.js 20+
- PostgreSQL with PostGIS extension
- API keys for:
  - Google Maps API
  - Speechmatics API
  - At least one LLM provider (Google Gemini, Anthropic Claude, or OpenAI)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment and activate it:
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the backend directory with the following variables:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/haven
BASE_FRONTEND_URL=http://localhost:3000
BASE_FRONTEND_DOMAIN=localhost
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# API Keys
GOOGLE_MAPS_API_KEY=your-google-maps-key
SPEECHMATICS_API_KEY=your-speechmatics-key
GOOGLE_API_KEY=your-gemini-key  # For Gemini
ANTHROPIC_API_KEY=your-claude-key  # For Claude
OPENAI_API_KEY=your-openai-key  # For OpenAI

# Optional: Parent URL for health checks
PARENT_URL=http://localhost:3000
```

5. Run database migrations and seed initial data (if applicable).

6. Start the development server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the haven frontend directory:
```bash
cd haven
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the haven directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## API Endpoints

### Authentication
- `POST /auth/register` - Create new user account
- `POST /auth/login` - User authentication

### Hotel Search
- `POST /search/hotels` - Search hotels with filters
- `GET /search/suggestions` - Get location suggestions

### Voice Search
- `WS /ws/audio/{language}` - WebSocket endpoint for real-time voice search

### Hotel Details
- `GET /hotel/{hotel_id}` - Get hotel information
- `GET /hotel/{hotel_id}/rooms` - Get available rooms and rates

### Booking
- `POST /booking` - Create new booking
- `GET /booking/user/{user_id}` - Get user bookings

### CopilotKit Integration
- `POST /copilotkit_remote` - AI assistant actions endpoint

## Database Schema

The application uses a normalized relational schema with the following entities:

- **PlatformUser**: User accounts and authentication
- **Hotel**: Hotel properties with geographic coordinates
- **HotelAmenity**: Hotel amenities
- **RoomType**: Room configurations
- **RatePlan**: Pricing and payment options
- **Booking**: User reservations
- **UserReview**: Hotel reviews and ratings
- **City/Country**: Location taxonomy

Geographic queries use PostGIS geography types for proximity searches.

## Implementation Details

### Backend Architecture
The backend uses a layered architecture separating routing, business logic, and data access. The `services` directory contains business logic including AI model interactions, speech processing, and database operations.

### Voice Search Flow
1. Client establishes WebSocket connection with language parameter
2. Audio streams from browser to backend
3. Backend forwards audio to Speechmatics for transcription
4. Transcript is sent to LLM for filter extraction
5. Filters are processed and database query is executed
6. Results are sent back through WebSocket

### AI Integration
LangChain handles model orchestration across different LLM providers. The `services/ai` module contains prompts and schemas used to extract structured search filters from text.

### Frontend State Management
Zustand stores handle global state for authentication, search filters, and booking. React Context is used for authentication status.
