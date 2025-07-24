# Xinyue (Anita) Kang - Personal Website

A modern, data-driven personal website that's **extremely easy to update** without touching HTML code!

## 🎯 Key Features

✅ **Super Easy Updates** - Edit simple JSON files instead of HTML  
✅ **No Coding Required** - Just change text in data files  
✅ **Automatic Content Loading** - Website updates instantly  
✅ **Bilingual Instructions** - English and Chinese guides included  
✅ **Professional Design** - Clean, modern, responsive layout  
✅ **Error Handling** - Built-in validation and error messages  

## 📁 Project Structure

```
Resume/
├── index.html              # About page (auto-generated)
├── events.html             # Events page (auto-generated)  
├── blog.html              # Blog page (auto-generated)
├── styles.css             # Website styling
├── script.js              # Interactive features
├── content-loader.js      # Magic that loads your content
├── data/                  # 📝 YOUR CONTENT FILES (edit these!)
│   ├── personal.json      # Your info, bio, skills, contact
│   ├── experience.json    # Work history
│   ├── projects.json      # Current projects
│   ├── events.json        # Events and exhibitions
│   └── blog.json          # Blog posts
├── images/                # Your photos and images
├── CONTENT-UPDATE-GUIDE.md    # 📖 English instructions
├── 内容更新指南.md            # 📖 Chinese instructions (中文指导)
└── README.md              # This file
```

## 🚀 How It Works

**Traditional websites:** You edit HTML code (complicated!)  
**Your new website:** You edit simple text files (easy!)

1. **Your content** lives in 5 simple JSON files in the `data/` folder
2. **JavaScript automatically** reads these files and builds your website
3. **You just edit** the text files when you want to update content
4. **Website updates** instantly without touching any code!

## 📖 Update Instructions

### English Instructions:
👉 **Read: `CONTENT-UPDATE-GUIDE.md`**

### 中文指导:
👉 **阅读: `内容更新指南.md`**

Both guides show you **exactly** how to:
- ✏️ Update your bio and skills
- 💼 Add new work experience  
- 🎨 Add new events and exhibitions
- 📰 Add new blog posts
- 🖼️ Add new photos

## 🎯 Quick Start

### 1. Add Your Photos
Put these images in the `images/` folder:
- `profile-photo.jpg` - Your professional headshot
- `sensitive-being-exhibition.jpg` - Your exhibition photo
- `creative-collective.jpg` - Workshop photo
- `night-museum.jpg` - Research photo

### 2. Update Your Content
Edit the files in the `data/` folder:
- `personal.json` - Your basic info
- `events.json` - Add/remove events
- `blog.json` - Add/remove blog posts
- etc.

### 3. View Your Website
Open `index.html` in a web browser to see your updates!

## 💡 Why This Approach is Better

**Old way (HTML editing):**
- ❌ Need to learn HTML
- ❌ Easy to break the website  
- ❌ Hard to find where to make changes
- ❌ Risk of corrupting the design

**New way (JSON editing):**
- ✅ Just edit simple text files
- ✅ Built-in error handling
- ✅ Clear structure and organization
- ✅ Can't accidentally break the design
- ✅ Easy to backup and restore

## 🛠️ Technical Details

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Data:** JSON files for content management
- **Features:** Responsive design, lazy loading, error handling
- **No Backend Required:** Pure client-side solution

## 🔧 For Developers

The website uses a custom `ContentLoader` class that:
- Fetches all JSON data files asynchronously
- Dynamically generates HTML content
- Handles errors gracefully
- Provides loading states
- Validates data structure

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎨 Customization

Want to change the design? Edit:
- `styles.css` - Colors, fonts, layout
- `content-loader.js` - How content is displayed
- JSON files in `data/` - All your content

## 🆘 Troubleshooting

**Website shows "Error Loading Content"?**
1. Check your JSON files for syntax errors
2. Use an online JSON validator
3. Restore from backup
4. Follow the update guides carefully

**Content not updating?**
1. Hard refresh the page (Ctrl+F5)
2. Check file was saved properly
3. Verify JSON syntax

## 📞 Support

For questions about updating content:
- Read the update guides first
- Check the JSON file structure
- Compare with existing entries
- Make small changes and test

**Remember:** Always backup your files before editing!

---

*This website was designed to be as easy as possible to update. You've got this! 🌟*