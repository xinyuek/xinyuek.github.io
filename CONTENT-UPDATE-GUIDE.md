# 🎯 Easy Content Update Guide

**No HTML knowledge needed!** This guide shows you exactly how to update your website content by editing simple text files.

## 📁 Quick Overview

Your website content is stored in 5 simple files in the `data/` folder:
- `personal.json` - Your basic info, bio, skills
- `experience.json` - Your work history
- `projects.json` - Current projects
- `events.json` - Events and exhibitions
- `blog.json` - Blog posts

## 🔧 How to Update Content

### ⚠️ IMPORTANT: Before You Start
1. **Always make a backup** of the file before editing
2. **Don't remove commas, quotes, or brackets** - they're important
3. **Keep the same structure** - only change the text inside quotes
4. **Save the file** after making changes

---

## 📝 Updating Your Personal Information

**File to edit: `data/personal.json`**

### Changing Your Bio
Look for this section:
```json
"aboutParagraphs": [
  "I am currently pursuing...",
  "My work spans from...",
  "Based in Melbourne..."
]
```

**How to update:**
- Replace the text inside the quotes with your new bio
- Keep each paragraph in separate quotes
- Don't remove the square brackets `[ ]` or commas

### Updating Skills
Look for:
```json
"skills": [
  "Exhibition Planning",
  "Curatorial Writing",
  "Visitor Studies"
]
```

**How to update:**
- Replace skill names inside quotes
- Add new skills: `"New Skill Name",`
- Remove skills: delete the entire line including the comma

### Changing Contact Info
Look for:
```json
"contact": {
  "email": "your.email@example.com",
  "phone": "(61) 483224271",
  "linkedin": "https://linkedin.com/in/yourprofile",
  "location": "Melbourne, VIC, Australia"
}
```

**How to update:** Simply replace the text inside quotes

### Updating CV Files
Look for:
```json
"cvFiles": {
  "english": "cv_pdf/CV_Anita_Kang_EN.pdf",
  "chinese": "cv_pdf/CV_Anita_kang_ZH.pdf"
}
```

**How to update:**
- Replace your CV files in the `cv_pdf/` folder
- Update the filenames in the JSON if you change the file names
- You can remove the "chinese" line if you only have an English CV

---

## 💼 Adding New Work Experience

**File to edit: `data/experience.json`**

### To Add a New Job:
1. Find the end of the last job entry (look for `}`)
2. Add a comma after the `}`
3. Copy this template:

```json
{
  "id": "exp-3",
  "position": "Your Job Title",
  "company": "Company Name",
  "location": "City, Country",
  "period": "Month Year - Present",
  "description": "Brief description of what you did and achieved.",
  "current": true
}
```

**Replace:**
- `exp-3` with next number (exp-4, exp-5, etc.)
- Job details with your information
- `"current": true` for current job, `"current": false` for past jobs

---

## 🎨 Adding New Events

**File to edit: `data/events.json`**

### To Add a New Event:
1. Find the end of the last event (look for `}`)
2. Add a comma after the `}`
3. Copy this template:

```json
{
  "id": "event-4",
  "title": "Your Event Name",
  "date": "Month Year",
  "location": "City, Country",
  "description": "Detailed description of your event or exhibition.",
  "image": "images/your-event-photo.jpg",
  "status": "upcoming",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "highlights": [
    "Key achievement 1",
    "Key achievement 2"
  ]
}
```

**Replace:**
- `event-4` with next number
- All text with your event details
- Status options: `"upcoming"`, `"current"`, `"research"`, or `"past"`
- Add your photo to the `images/` folder first

**To remove highlights section** (if not needed):
Delete the entire highlights section:
```json
"highlights": [
  "Key achievement 1",
  "Key achievement 2"
],
```

---

## 📰 Adding New Blog Posts

**File to edit: `data/blog.json`**

### To Add a New Blog Post:
1. Find the end of the last blog post
2. Add a comma after the `}`
3. Copy this template:

```json
{
  "id": "blog-7",
  "title": "Your Blog Post Title",
  "date": "Month Day, Year",
  "category": "Your Category",
  "readTime": "5 min read",
  "excerpt": "Brief summary of your blog post that appears on the blog page.",
  "image": "images/your-blog-image.jpg",
  "tags": ["Tag1", "Tag2"],
  "featured": false,
  "published": true,
  "content": ""
}
```

**Replace:**
- All text with your blog post details
- `"featured": true` to make it the main featured post
- `"published": true` to show it, `"published": false` to hide it

---

## 🎯 Quick Tips

### ✅ Do This:
- Always use double quotes `"` around text
- Keep commas between items
- Save the file after editing
- Add images to the `images/` folder first

### ❌ Don't Do This:
- Remove brackets `[ ]` or braces `{ }`
- Forget commas between items
- Use single quotes `'` instead of double quotes `"`
- Delete the `id` field

---

## 🆘 If Something Goes Wrong

### Website Shows "Error Loading Content"?
1. Check your last edit
2. Make sure you didn't remove any commas, quotes, or brackets
3. Restore from your backup
4. Try editing again more carefully

### Common Mistakes:
- **Missing comma** after adding new item
- **Removed quotes** around text
- **Broken brackets** `[ ]` or braces `{ }`

---

## 📱 Testing Your Changes

1. Save your edited file
2. Open your website in a browser
3. Refresh the page (Ctrl+F5 or Cmd+Shift+R)
4. Check if your changes appear

---

## 🎨 Adding Images

1. **Prepare your image:**
   - Use JPG or PNG format
   - Recommended size: 800x600 pixels or larger
   - Keep file size under 2MB

2. **Add to website:**
   - Put image file in the `images/` folder
   - Use descriptive filename: `my-exhibition-2024.jpg`
   - Reference in JSON: `"image": "images/my-exhibition-2024.jpg"`

---

## 💡 Pro Tips

- **Keep it organized:** Use descriptive IDs like `event-2024-exhibition` instead of `event-4`
- **Regular backups:** Copy your `data/` folder weekly
- **Preview changes:** Always check the website after updates
- **Small changes:** Make one change at a time to avoid errors

---

## 📞 Need Help?

If you're stuck:
1. **Double-check the format** - compare with existing entries
2. **Use a JSON validator** online to check your file
3. **Ask for help** from someone technical
4. **Restore backup** and try again

**Remember:** Take your time, make backups, and test changes one at a time!