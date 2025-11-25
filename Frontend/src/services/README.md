# Services Architecture

## 📁 Structure Overview

```
services/
├── index.ts              # Main exports for all services
├── types.ts              # Common TypeScript interfaces
├── api.ts                # Base API client configuration
├── categoryService.ts    # Spotify categories API
├── releaseService.ts     # New releases API
├── recommendationService.ts # Curated recommendations API
└── homeApi.ts           # Legacy API (backward compatibility)
```

## 🔧 Individual Services

### CategoryService (`categoryService.ts`)
- **Purpose**: Handle Spotify music categories
- **Methods**:
  - `getCategories(limit)` - Fetch music categories
  - `getCategoryDetails(id)` - Get category info
  - `getCategoryPlaylists(id, limit)` - Get playlists in category

### ReleaseService (`releaseService.ts`)
- **Purpose**: Handle new music releases
- **Methods**:
  - `getNewReleases(limit)` - Fetch latest releases
  - `getAlbumDetails(id)` - Get album information
  - `getAlbumTracks(id, limit, offset)` - Get album tracks

### RecommendationService (`recommendationService.ts`)
- **Purpose**: Provide curated music recommendations
- **Methods**:
  - `getCuratedRecommendations(limit, fallback)` - Get random recommendations
  - `getRecommendationsByGenre(genre, limit)` - Genre-specific recommendations
  - `getRandomCuratedQuery()` - Get random search query
  - `getAllCuratedQueries()` - Get all available queries

## 🎯 Usage Examples

```typescript
import { categoryService, releaseService, recommendationService } from '../services'

// Get categories
const categories = await categoryService.getCategories(12)

// Get new releases
const releases = await releaseService.getNewReleases(20)

// Get recommendations
const recommendations = await recommendationService.getCuratedRecommendations(24)
```

## 🪝 Custom Hooks

### useHomeData (`hooks/useHomeData.ts`)
- **Purpose**: React hook for homepage data management
- **Features**:
  - Automatic data fetching on mount
  - Loading states for each data type
  - Refresh functionality
  - Error handling with fallbacks

```typescript
const {
  categories,
  newReleases,
  recommendations,
  loadingCategories,
  loadingNewReleases,
  loadingRecommendations,
  refreshAllData
} = useHomeData(tracks)
```

## ✅ Benefits

1. **Separation of Concerns**: Each service handles one specific domain
2. **Testability**: Individual services can be unit tested independently
3. **Maintainability**: Changes to one service don't affect others
4. **Reusability**: Services can be used across different components
5. **Type Safety**: Strong TypeScript typing throughout
6. **Error Handling**: Centralized error handling per service
7. **Scalability**: Easy to add new services or extend existing ones

## 🔄 Migration Guide

### From Old Structure
```typescript
// Old way
import { fetchCategories } from '../services/homeApi'
const data = await fetchCategories()
```

### To New Structure
```typescript
// New way
import { categoryService } from '../services'
const data = await categoryService.getCategories(12)
```

## 📝 Best Practices

1. **Use appropriate service** for each data type
2. **Handle errors** at component level or service level
3. **Use custom hooks** for complex data fetching logic
4. **Keep services focused** on single responsibilities
5. **Test services** independently from components
6. **Use TypeScript** interfaces for type safety