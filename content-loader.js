// Content Loader - Dynamically loads content from JSON files
class ContentLoader {
    constructor() {
        this.personalData = null;
        this.experienceData = null;
        this.projectsData = null;
        this.eventsData = null;
        this.blogData = null;
    }

    async loadAllData() {
        try {
            const [personal, experience, projects, events, blog] = await Promise.all([
                this.fetchJSON('data/personal.json'),
                this.fetchJSON('data/experience.json'),
                this.fetchJSON('data/projects.json'),
                this.fetchJSON('data/events.json'),
                this.fetchJSON('data/blog.json')
            ]);

            this.personalData = personal;
            this.experienceData = experience;
            this.projectsData = projects;
            this.eventsData = events;
            this.blogData = blog;

            // Load content based on current page
            this.loadCurrentPageContent();
        } catch (error) {
            console.error('Error loading data:', error);
            this.showErrorMessage();
        }
    }

    async fetchJSON(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    async fetchMarkdown(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    }

    // Simple markdown to HTML parser
    parseMarkdown(markdown) {
        let html = markdown;
        
        // Headers
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        
        // Bold and italic
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Paragraphs (split by double newlines)
        html = html.split('\n\n').map(paragraph => {
            paragraph = paragraph.trim();
            if (paragraph.startsWith('<h') || paragraph === '') {
                return paragraph;
            }
            return `<p>${paragraph.replace(/\n/g, ' ')}</p>`;
        }).join('\n');
        
        return html;
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        if (filename === 'events.html') return 'events';
        if (filename === 'blog.html') return 'blog';
        return 'index'; // default to index for home page
    }

    loadCurrentPageContent() {
        const currentPage = this.getCurrentPage();
        
        // Load common elements (navigation, footer) for all pages
        this.loadCommonElements();
        
        // Load page-specific content
        switch (currentPage) {
            case 'index':
                this.loadIndexPage();
                break;
            case 'events':
                this.loadEventsPage();
                break;
            case 'blog':
                this.loadBlogPage();
                break;
        }
    }

    loadCommonElements() {
        if (!this.personalData) return;

        // Update navigation name
        const navName = document.getElementById('nav-name');
        if (navName) {
            navName.textContent = `${this.personalData.name} ${this.personalData.emoji}`;
        }

        // Update page title
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) {
            const currentPage = this.getCurrentPage();
            const pageTitles = {
                'index': `${this.personalData.name} - ${this.personalData.title}`,
                'events': `Events - ${this.personalData.name}`,
                'blog': `Blog - ${this.personalData.name}`
            };
            pageTitle.textContent = pageTitles[currentPage] || this.personalData.name;
        }

        // Update footer
        const footerText = document.getElementById('footer-text');
        if (footerText) {
            const year = new Date().getFullYear();
            footerText.textContent = `© ${year} ${this.personalData.name}. All rights reserved.`;
        }
    }

    loadIndexPage() {
        if (!this.personalData) return;

        // Hero section
        const heroGreeting = document.getElementById('hero-greeting');
        const heroSubtitle = document.getElementById('hero-subtitle');
        const heroDescription = document.getElementById('hero-description');
        const profileImage = document.getElementById('profile-image');
        const cvDownloadEn = document.getElementById('cv-download-en');
        const cvDownloadZh = document.getElementById('cv-download-zh');

        if (heroGreeting) heroGreeting.textContent = `Hello, I'm ${this.personalData.name}`;
        if (heroSubtitle) heroSubtitle.textContent = this.personalData.title;
        if (heroDescription) heroDescription.textContent = this.personalData.heroDescription;
        if (profileImage) {
            profileImage.src = this.personalData.profileImage;
            profileImage.alt = this.personalData.name;
        }
        
        // Set up CV download links
        if (this.personalData.cvFiles) {
            if (cvDownloadEn && this.personalData.cvFiles.english) {
                cvDownloadEn.href = this.personalData.cvFiles.english;
            }
            if (cvDownloadZh && this.personalData.cvFiles.chinese) {
                cvDownloadZh.href = this.personalData.cvFiles.chinese;
            }
        }

        // About section
        this.loadAboutSection();
        
        // Projects section
        this.loadProjectsSection();

        // Experience section
        this.loadExperienceSection();

        // Contact section
        this.loadContactSection();
    }

    loadAboutSection() {
        if (!this.personalData) return;

        const aboutParagraphs = document.getElementById('about-paragraphs');
        const skillsContainer = document.getElementById('skills-container');

        if (aboutParagraphs) {
            aboutParagraphs.innerHTML = this.personalData.aboutParagraphs
                .map(paragraph => `<p>${paragraph}</p>`)
                .join('');
        }

        if (skillsContainer) {
            skillsContainer.innerHTML = this.personalData.skills
                .map(skill => `<span class="tag">${skill}</span>`)
                .join('');
        }
    }

    loadProjectsSection() {
        if (!this.projectsData) return;

        const projectsContainer = document.getElementById('projects-container');
        if (!projectsContainer) return;

        projectsContainer.innerHTML = this.projectsData
            .map(project => `
                <div class="project-card">
                    <h3>${project.title}</h3>
                    <p class="project-date">${project.date}</p>
                    <p>${project.description}</p>
                </div>
            `).join('');
    }

    loadExperienceSection() {
        if (!this.experienceData) return;

        const experienceContainer = document.getElementById('experience-container');
        if (!experienceContainer) return;

        experienceContainer.innerHTML = this.experienceData
            .map((exp, index) => `
                <div class="timeline-item">
                    <div class="timeline-content">
                        <div class="timeline-period">${exp.period}</div>
                        <h3>${exp.position}</h3>
                        <h4>${exp.company}${exp.location ? `, ${exp.location}` : ''}</h4>
                        <p>${exp.description}</p>
                    </div>
                </div>
            `).join('');
    }

    loadContactSection() {
        if (!this.personalData || !this.personalData.contact) return;

        const contactContainer = document.getElementById('contact-container');
        if (!contactContainer) return;

        const contact = this.personalData.contact;
        contactContainer.innerHTML = `
            <div class="contact-item">
                <h3>Email</h3>
                <p>${contact.email}</p>
            </div>
            <div class="contact-item">
                <h3>LinkedIn</h3>
                <p><a href="${contact.linkedin}" target="_blank">${contact.linkedin.replace('https://', '')}</a></p>
            </div>
            <div class="contact-item">
                <h3>Location</h3>
                <p>${contact.location}</p>
            </div>
            <div class="contact-item">
                <h3>Phone</h3>
                <p>${contact.phone}</p>
            </div>
        `;
    }

    loadEventsPage() {
        if (!this.eventsData) return;

        const eventsContainer = document.getElementById('events-container');
        if (!eventsContainer) return;

        eventsContainer.innerHTML = this.eventsData
            .map(event => `
                <div class="event-card ${event.status}">
                    <div class="event-image">
                        <img src="${event.image}" alt="${event.title}" class="event-img">
                        <div class="event-status">${this.getStatusLabel(event.status)}</div>
                    </div>
                    <div class="event-content">
                        <div class="event-date">${event.date}</div>
                        <h3>${event.title}</h3>
                        <p class="event-location">${event.location}</p>
                        <p class="event-description">${event.description}</p>
                        ${event.highlights && event.highlights.length > 0 ? `
                            <div class="event-highlights">
                                <ul>
                                    ${event.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        <div class="event-tags">
                            ${event.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `).join('');
    }

    loadBlogPage() {
        if (!this.blogData) return;

        const blogContainer = document.getElementById('blog-container');
        if (!blogContainer) return;

        // Filter only published posts
        const publishedPosts = this.blogData.filter(post => post.published);

        blogContainer.innerHTML = publishedPosts
            .map(post => `
                <article class="blog-post ${post.featured ? 'featured' : ''}">
                    <div class="post-image">
                        <img src="${post.image}" alt="${post.title}" class="post-img">
                        <div class="post-category">${post.category}</div>
                    </div>
                    <div class="post-content">
                        <div class="post-meta">
                            <span class="post-date">${post.date}</span>
                            <span class="post-read-time">${post.readTime}</span>
                        </div>
                        ${post.featured ? `<h2>${post.title}</h2>` : `<h3>${post.title}</h3>`}
                        <p class="post-excerpt">${post.excerpt}</p>
                        <div class="post-tags">
                            ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        ${post.contentFile ? `<a href="#" class="read-more" onclick="contentLoader.openBlogPost('${post.id}')">Read More →</a>` : `<span class="read-more disabled">Coming Soon</span>`}
                    </div>
                </article>
            `).join('');
    }

    async openBlogPost(postId) {
        const post = this.blogData.find(p => p.id === postId);
        if (!post || !post.contentFile) return;

        try {
            const markdownContent = await this.fetchMarkdown(post.contentFile);
            const htmlContent = this.parseMarkdown(markdownContent);
            
            this.showBlogModal(post, htmlContent);
        } catch (error) {
            console.error('Error loading blog post:', error);
            alert('Error loading blog post content.');
        }
    }

    showBlogModal(post, content) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('blog-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'blog-modal';
            modal.className = 'blog-modal';
            modal.innerHTML = `
                <div class="blog-modal-content">
                    <div class="blog-modal-header">
                        <button class="blog-modal-close">&times;</button>
                    </div>
                    <div class="blog-modal-body">
                        <div class="blog-post-header">
                            <div class="post-category"></div>
                            <h1 class="post-title"></h1>
                            <div class="post-meta">
                                <span class="post-date"></span>
                                <span class="post-read-time"></span>
                            </div>
                            <div class="post-tags"></div>
                        </div>
                        <div class="blog-post-content"></div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            // Add close functionality
            modal.querySelector('.blog-modal-close').onclick = () => {
                modal.style.display = 'none';
            };
            modal.onclick = (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            };
        }

        // Populate modal content
        modal.querySelector('.post-category').textContent = post.category;
        modal.querySelector('.post-title').textContent = post.title;
        modal.querySelector('.post-date').textContent = post.date;
        modal.querySelector('.post-read-time').textContent = post.readTime;
        modal.querySelector('.post-tags').innerHTML = post.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        modal.querySelector('.blog-post-content').innerHTML = content;

        // Show modal
        modal.style.display = 'flex';
    }

    getStatusLabel(status) {
        const labels = {
            'upcoming': 'Upcoming',
            'current': 'Ongoing',
            'research': 'Research',
            'past': 'Past'
        };
        return labels[status] || status;
    }

    showErrorMessage() {
        const body = document.body;
        body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; font-family: Arial, sans-serif;">
                <h1 style="color: #e74c3c;">Error Loading Content</h1>
                <p>There was an error loading the website content. Please check that all JSON files are properly formatted and accessible.</p>
                <button onclick="location.reload()" style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 20px;">Retry</button>
            </div>
        `;
    }
}

// Initialize content loader when DOM is ready
let contentLoader;
document.addEventListener('DOMContentLoaded', function() {
    contentLoader = new ContentLoader();
    contentLoader.loadAllData();
});

// Make ContentLoader available globally for debugging
window.ContentLoader = ContentLoader;