# 🎨 Portfolio CMS API

Backend API responsible for managing an artistic portfolio platform.

This system allows an artist to manage artworks, document the creative process behind each piece, organize artworks with predefined tags, and control which artworks are highlighted on the homepage.

---

## 📌 Overview

The system works as a content management system (**CMS**) for an art portfolio.

Each artwork contains:

- General metadata
- Cover image
- Featured priority for homepage highlights
- Predefined tags
- Multiple creative process entries
- Each process entry links:
  - Image
  - Description
  - Optional title
  - Display order

---

## 🏗 System Architecture

```text
Portfolio CMS
│
├── Artworks
│   ├── Metadata
│   ├── Cover Image
│   ├── Featured Priority
│   ├── Tags
│   │
│   └── Process Entries
│       ├── Image
│       ├── Description
│       ├── Title
│       └── Order
│
├── Tags (System Controlled)
│
└── Admin Dashboard
    ├── Create Artwork
    ├── Edit Artwork
    ├── Delete Artwork
    ├── Upload Images
    ├── Manage Process Entries
    └── Select Tags
```

---

## 🗄 Database Schema

The system consists of four main tables.

```text
artworks
artwork_entries
tags
artwork_tags
```

---

# 1. Artworks

Main entity representing each artwork.

## Schema

```text
artworks
│
├── id
├── title
├── slug
├── summary
├── cover_image
├── featured_priority
├── medium
├── year_created
├── created_at
└── updated_at
```

## Example

```json
{
  "id": "art_001",
  "title": "Cyberpunk Samurai",
  "slug": "cyberpunk-samurai",
  "summary": "Character exploration inspired by futuristic Japan.",
  "coverImage": "/uploads/covers/samurai.webp",
  "featuredPriority": 1,
  "medium": "Digital Painting",
  "yearCreated": 2026
}
```

---

# 2. Featured Priority System

Instead of using a boolean flag (`is_featured`), the system uses priority-based ordering.

## Rules

```text
0 → Hidden from homepage

1 → Primary featured artwork

2 → Secondary featured artwork

3 → Third featured artwork
```

## Query Logic

```sql
SELECT *
FROM artworks
WHERE featured_priority > 0
ORDER BY featured_priority ASC;
```

---

# 3. Artwork Entries

Each artwork contains multiple creative process steps.

Each entry contains:

- Image
- Description
- Title
- Display order

## Schema

```text
artwork_entries
│
├── id
├── artwork_id
├── title
├── image_url
├── description
├── display_order
├── created_at
└── updated_at
```

## Relationship

```text
1 artwork → many entries
```

## Example

```json
{
  "id": "entry_001",
  "title": "Initial Sketch",
  "imageUrl": "/uploads/sketch.webp",
  "description": "Initial silhouette exploration.",
  "displayOrder": 1
}
```

---

# Why Entries Exist

The system intentionally binds image and description together.

Bad architecture:

```text
images
descriptions
```

Problem:

```text
Which description belongs to image_3?
```

Correct architecture:

```text
entry
├── image
└── description
```

Each process step is self-contained.

---

# 4. Tags

Tags are predefined by the system.

Administrators can:

✅ Associate tags with artworks

Administrators cannot:

❌ Create tags  
❌ Edit tags  
❌ Delete tags

## Schema

```text
tags
│
├── id
├── name
├── slug
└── created_at
```

## Example

```json
[
  {
    "id": "tag_001",
    "name": "Concept Art",
    "slug": "concept-art"
  },
  {
    "id": "tag_002",
    "name": "Character Design",
    "slug": "character-design"
  },
  {
    "id": "tag_003",
    "name": "Illustration",
    "slug": "illustration"
  }
]
```

---

# 5. Tags Seed Strategy

Tags are inserted once during project setup.

Example using Express + Prisma.

```ts
await prisma.tag.createMany({
  data: [
    { name: "Concept Art", slug: "concept-art" },
    { name: "Character Design", slug: "character-design" },
    { name: "Illustration", slug: "illustration" }
  ]
});
```

There are no mutation endpoints for tags.

These routes do not exist.

```text
POST /tags

PUT /tags/:id

DELETE /tags/:id
```

---

# 6. Artwork Tags

Many-to-many relationship connecting artworks and tags.

## Schema

```text
artwork_tags
│
├── artwork_id
└── tag_id
```

## Example

```text
Artwork: Cyberpunk Samurai

Tags:

Concept Art
Character Design
Digital Painting
```

Database representation.

```text
art_001 → tag_001

art_001 → tag_002

art_001 → tag_003
```

---

# Database Relationships

```text
                           ┌───────────────────────┐
                           │       artworks        │
                           ├───────────────────────┤
                           │ id                    │
                           │ title                 │
                           │ slug                  │
                           │ summary               │
                           │ cover_image           │
                           │ featured_priority     │
                           │ medium                │
                           └───────────┬───────────┘
                                       │
                                       │ 1:N
                                       │
                                       ▼

                         ┌──────────────────────────┐
                         │     artwork_entries      │
                         ├──────────────────────────┤
                         │ id                       │
                         │ artwork_id               │
                         │ title                    │
                         │ image_url                │
                         │ description              │
                         │ display_order            │
                         └──────────────────────────┘



                           ┌───────────────────────┐
                           │         tags          │
                           ├───────────────────────┤
                           │ id                    │
                           │ name                  │
                           │ slug                  │
                           └───────────┬───────────┘
                                       │
                                       │ many-to-many
                                       │
                          ┌────────────▼────────────┐
                          │      artwork_tags       │
                          ├─────────────────────────┤
                          │ artwork_id              │
                          │ tag_id                  │
                          └─────────────────────────┘
```

---

# 🌐 Public API

## Get all artworks

```http
GET /artworks
```

---

## Get artwork details

```http
GET /artworks/:slug
```

---

## Get featured artworks

```http
GET /artworks/featured
```

---

## Get available tags

```http
GET /tags
```

---

## Filter artworks by tag

```http
GET /artworks?tag=concept-art
```

---

# 🔒 Admin API

Authenticated routes.

## Create artwork

```http
POST /admin/artworks
```

---

## Update artwork

```http
PUT /admin/artworks/:id
```

---

## Delete artwork

```http
DELETE /admin/artworks/:id
```

---

## Create artwork entry

```http
POST /admin/artworks/:id/entries
```

---

## Update entry

```http
PUT /admin/entries/:id
```

---

## Delete entry

```http
DELETE /admin/entries/:id
```

---

# Create Artwork Example

## Request

```json
{
  "title": "Cyberpunk Samurai",
  "summary": "Character exploration inspired by futuristic Japan.",
  "featuredPriority": 1,
  "medium": "Digital Painting",

  "tagIds": [
    "tag_001",
    "tag_002"
  ]
}
```

Backend flow:

```text
Create artwork

↓

Insert into artworks

↓

Insert artwork_tags automatically
```

---

# Full Artwork Response Example

```json
{
  "id": "art_001",
  "title": "Cyberpunk Samurai",

  "featuredPriority": 1,

  "tags": [
    {
      "id": "tag_001",
      "name": "Concept Art",
      "slug": "concept-art"
    },
    {
      "id": "tag_002",
      "name": "Character Design",
      "slug": "character-design"
    }
  ],

  "entries": [
    {
      "id": "entry_001",
      "title": "Sketch",
      "imageUrl": "/uploads/sketch.webp",
      "description": "Initial silhouette exploration.",
      "displayOrder": 1
    },
    {
      "id": "entry_002",
      "title": "Color Pass",
      "imageUrl": "/uploads/colors.webp",
      "description": "Experimenting with colors.",
      "displayOrder": 2
    }
  ]
}
```

---

# 📁 Project Structure

Using :contentReference[oaicite:0]{index=0} + :contentReference[oaicite:1]{index=1}

```text
src
│
├── modules
│   │
│   ├── artworks
│   │    ├── artwork.controller.ts
│   │    ├── artwork.service.ts
│   │    ├── artwork.repository.ts
│   │    ├── artwork.routes.ts
│   │    └── artwork.schema.ts
│   │
│   ├── entries
│   │
│   ├── tags
│   │
│   └── auth
│
├── database
│   ├── migrations
│   └── seed.ts
│
├── middlewares
│
├── shared
│
└── app.ts
```

---

# Architecture Rules

```text
Tags:
- System predefined
- Admin cannot modify

Featured:
- Integer priority system
- 0 = hidden from homepage

Entries:
- Always bind image + description

Artworks:
- Main domain entity

No duplicated data

No separate images table
```

---

# Final Domain Model

```text
artworks
artwork_entries
tags
artwork_tags
```

---

## Design Goals

- Clean architecture
- Scalable database structure
- Predictable relationships
- Easy filtering by tags
- Flexible homepage featured system
- Narrative-oriented creative process documentation
- Production-ready backend structure
