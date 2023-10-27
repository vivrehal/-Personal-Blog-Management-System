# Personal Blog Management System

This Personal Blog Management System is a simple, elegant web application designed for creating, managing, and viewing personal blogs. The system allows users to create blogs with titles, custom rich text content using a custom-built text editor, and cover images. It utilizes a moderation API to filter out NSFW words, ensuring a safe environment for users.

## Problem Statement

Managing personal blogs efficiently while ensuring content moderation to maintain a safe environment for users.

## Tech Stack Used

- HTML
- CSS
- JavaScript
- [Moderation API](https://example-moderation-api.com) - API used for content moderation to filter out NSFW words.

## Custom Text Editor

The system features a custom-built text editor that provides basic functions in the toolbar, including font styles and font color, to enhance the blog writing experience.

## Requirements

- Modern web browser with JavaScript enabled.
- Internet connection to access the moderation API (if online moderation is enabled).

## Solution Description

This Personal Blog Management System allows users to create blogs with titles, custom rich text content using the built-in text editor, and cover images. The system utilizes a moderation API to automatically filter out NSFW words, ensuring a safe environment for users.

## How to Run

1. Clone this repository to your local machine using the following command:
   ```
   git clone https://github.com/vivrehal/Personal-Blog-Management-System.git
   ```

2. Navigate to the project directory:
   ```
   cd Personal-Blog-Management-System
   ```

3. Open `index.html` in your web browser to access the home page where blog previews are displayed. Click on "Create Blog" to add a new blog or update an existing one.

4. Use the custom-built text editor to format your blog content. The toolbar provides options for font styles and font color.

5. Fill in the blog title, content using the custom text editor, and upload a cover image. The moderation API will automatically filter out NSFW words.

6. Click "Save" to save your blog. Blogs are stored using `localStorage`.

## Folder Structure

- **css**: Contains stylesheets for the project.
- **js**: Contains JavaScript files, including `script.js` for project logic.
- **libs**: External libraries or plugins if used.
- **img**: Images and media files used in the project.
- **index.html**: Home page displaying blog previews.
- **blog.html**: Page for creating and updating blogs.
- **README.md**: Documentation file (you're reading it!).

**Note**: Due to the limitations of `localStorage`, blogs will be saved locally and may not persist across different sessions or devices.

**Deployed here** : https://vivrehal.github.io/-Personal-Blog-Management-System/ 
