# Clarifi AI MVP Requirements

## Overview
Basic implementation of Clarifi AI for Snap Spectacles focusing on two core features:
1. AI-powered zoom for stage performer detection
2. Swipeable lyrics overlay

## Technical Requirements

### Hardware Requirements
- Snap Spectacles (2024)
- Camera with minimum 1080p resolution
- Gyroscope for head tracking
- Touch-sensitive side panel for swipe gestures

### Software Components

#### 1. Core Camera System
- Access to Spectacles camera feed
- Real-time video processing capability
- Minimum 30 FPS processing rate
- Field of view: Standard Spectacles FOV

#### 2. AI Detection System (Mock Implementation)
- Mock AI service for performer detection
- Simulated confidence scores (0.0 - 1.0)
- Predefined stage areas for testing
- Response time < 100ms

#### 3. Zoom System
- Digital zoom capability up to 4x
- Smooth zoom transitions (500ms duration)
- Zoom level adjustment based on detection confidence
- Stabilization for head movement

#### 4. Lyrics System
- Mock lyrics database (JSON format)
- Basic timing synchronization
- Simple text overlay system
- Swipe gesture detection

### MVP Features

#### Stage Performer Detection & Zoom
```typescript
interface DetectionResult {
  confidence: number;      // 0.0 to 1.0
  boundingBox: {          // normalized coordinates
    x: number;            // 0.0 to 1.0
    y: number;            // 0.0 to 1.0
    width: number;        // 0.0 to 1.0
    height: number;       // 0.0 to 1.0
  };
  isPerformer: boolean;   // true if main performer
}
```

#### Lyrics Display
```typescript
interface LyricsData {
  songId: string;
  timestamp: number;      // ms from start
  text: string;
  duration: number;       // ms to display
}
```

### Mock API Structure
```typescript
// Mock API endpoints (not to be committed)
const MOCK_API = {
  DETECTION: '/api/v1/detect',
  LYRICS: '/api/v1/lyrics'
};

// Mock response times (ms)
const MOCK_LATENCY = {
  DETECTION: 50,
  LYRICS: 30
};
```

## Implementation Guidelines

### 1. Detection System
- Create mock detection data for testing
- Implement basic performer tracking
- Use predefined stage areas
- Simulate detection latency

### 2. Zoom Implementation
- Start with fixed zoom levels (1x, 2x, 3x, 4x)
- Implement smooth transitions
- Add basic stabilization
- Optimize for performance

### 3. Lyrics System
- Implement basic text overlay
- Add swipe gesture detection
- Create mock lyrics database
- Implement simple timing system

### 4. Testing Requirements
- Test on actual Spectacles hardware
- Verify frame rate > 25 FPS
- Confirm gesture recognition
- Validate zoom smoothness

## Development Phases

### Phase 1: Basic Setup (Week 1)
- Project structure setup
- Mock API implementation
- Basic camera access
- Simple UI framework

### Phase 2: Core Features (Week 2)
- Performer detection integration
- Basic zoom functionality
- Simple lyrics display
- Gesture detection

### Phase 3: Integration (Week 3)
- Feature integration
- Performance optimization
- Basic testing
- Bug fixes

## Mock Data Structure
```typescript
// To be stored in separate non-committed file
interface MockData {
  performers: Array<{
    id: string;
    position: {
      x: number;
      y: number;
    };
    confidence: number;
  }>;
  lyrics: Array<{
    songId: string;
    lines: Array<{
      text: string;
      timestamp: number;
    }>;
  }>;
}
```

## Performance Requirements
- Camera feed: 30 FPS minimum
- Detection latency: < 100ms
- Zoom transition: 500ms
- Gesture recognition: < 200ms
- Memory usage: < 512MB
- Battery impact: < 20% per hour

## Security Notes
- Mock API keys should be stored in .env file
- Add .gitignore rules for mock data
- Implement basic error handling
- Log sensitive data appropriately

## Limitations
- Fixed zoom levels only
- Basic gesture recognition
- Simplified performer detection
- Mock timing system
- Limited error handling

## Future Considerations
- Real AI integration
- Advanced gesture support
- Multiple performer detection
- Enhanced stabilization
- Battery optimization
- Error recovery
- Real lyrics API integration 