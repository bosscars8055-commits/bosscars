# Images Folder

## 📸 Copy Your Images Here

### Required Images:

1. **Logo** (`logo.png`, `logo.svg`, or `logo.jpg`)
   - Place directly in this folder: `frontend/public/images/logo.png`
   - Recommended size: 200x60px or similar aspect ratio
   - Supported formats: PNG (with transparency), SVG, or JPG

2. **Background Image** (`background.jpg` or `background.png`)
   - Place directly in this folder: `frontend/public/images/background.jpg`
   - Recommended size: 1920x1080px or larger
   - Should be a high-quality image of a car or road
   - Format: JPG for photos, PNG if you need transparency

3. **Car Fleet Images** (Place in the `cars/` subfolder)
   - `swift-dzire.jpg` → `frontend/public/images/cars/swift-dzire.jpg`
   - `innova.jpg` → `frontend/public/images/cars/innova.jpg`
   - `honda-city.jpg` → `frontend/public/images/cars/honda-city.jpg`
   
   **Specifications:**
   - Recommended size: 800x600px or 1200x800px
   - Format: JPG (better for photos)
   - Make sure images are optimized (not too large in file size)
   - Ideal file size: Under 500KB each

## 📂 Final Structure Should Look Like:

```
frontend/public/images/
├── logo.png (or .svg, .jpg)
├── background.jpg
└── cars/
    ├── swift-dzire.jpg
    ├── innova.jpg
    └── honda-city.jpg
```

## 🔧 After Copying Images:

1. **Update file extensions** if needed in:
   `frontend/src/config/imagePaths.js`

2. **Restart the dev server** if it's running:
   - Stop the terminal (Ctrl+C)
   - Run: `npm run dev`

3. **For deployment**, these images will automatically work on Vercel!

## ✅ Verification:

Once you copy the images, they should be accessible at:
- http://localhost:3000/images/logo.png
- http://localhost:3000/images/background.jpg
- http://localhost:3000/images/cars/swift-dzire.jpg

## 💡 Tips:

- Use JPG for photographs (smaller file size)
- Use PNG for logos with transparency
- Use SVG for logos (best quality, smallest size)
- Optimize images before uploading (use tools like TinyPNG)
- Keep total image size reasonable for faster loading

## 🚀 Deployment Note:

When you deploy to Vercel, all files in the `public` folder are automatically served as static assets. The paths will work exactly the same way as localhost!
