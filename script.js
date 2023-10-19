function getQueryParam(param) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(param);
}

function getBlogById(blogId) {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    return blogs.find(blog => blog.id === parseInt(blogId));
}


if(window.location.href.includes('blog.html'))
{
    const quill = new Quill('#editor', {
        theme: 'snow', // Specify the theme ('snow' or 'bubble')
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],
              
                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction
              
                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],
              
                ['clean']
            ]
        },
        placeholder: 'Write your blog here...',
    });

    const oldblogId = getQueryParam('id');
    const oldblog = getBlogById(oldblogId);
    if(oldblog){
        document.getElementById("cover")
        quill.root.innerHTML=oldblog.content; 
    }



function saveBlog(){
    if(oldblog){
        deleteBlog(oldblog.id)
    }
    const title = document.getElementById("title").value; 
    console.log(title)
    const content = quill.root.innerHTML; 
    const cover=document.getElementById("cover");
    const reader = new FileReader();
    const img={url:"https://images.pexels.com/photos/18786198/pexels-photo-18786198/free-photo-of-a-ladder-is-leaning-against-a-wall-in-the-sun.jpeg"};
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const blog = {id:Date.now(), title, content, ...img};
    blogs.push(blog);
    localStorage.setItem("blogs", JSON.stringify(blogs));
    if(cover.files){
        reader.readAsDataURL(cover.files[0]);
        reader.addEventListener("load",()=>{
        let blogsc = JSON.parse(localStorage.getItem("blogs")) || [];
        blogsc[blogsc.length-1].url=reader.result;
        localStorage.setItem("blogs", JSON.stringify(blogsc));
        console.log(img.url)
        });
    }
    console.log(img.url)


    window.location.href = "index.html";
}
}
else if (window.location.href.includes('index.html')){
    const blogsContainer = document.getElementById("blogs");
    function displayBlogs() {
        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        blogsContainer.innerHTML = "";
        blogs.forEach(blog => {
            const blogDiv = document.createElement("div");
            const btnsDiv = document.createElement("div");
            blogDiv.className = "blogCards";
            btnsDiv.className = "blogCardsbtns";
    
            // Create a clickable link for each blog card
            const blogLink = document.createElement("a");
            blogLink.href = `view.html?id=${blog.id}`;
            blogLink.innerHTML = `
                <h2 class="cardTitle">${blog.title.toUpperCase()}</h2>
                <img src=${blog.url}>
            `;
            btnsDiv.innerHTML=`
            <button class="updateBtn" onclick="updateBlog(${blog.id})">Update Blog</button>
            <button class="deleteBtn" onclick="deleteBlog(${blog.id})">Delete Blog</button>
            `;

    
            // Append the clickable link and buttons to the blog card container
            blogDiv.appendChild(blogLink);
            blogDiv.appendChild(btnsDiv);
            
            // Append the blog card to the container
            blogsContainer.appendChild(blogDiv);
        });
    }
   
    
    displayBlogs();
}

else if(window.location.href.includes('view.html')){
    const blogId = getQueryParam('id');
    const blog = getBlogById(blogId);

    const blogTitle = document.getElementById('blogTitle');
    const blogImage = document.getElementById('blogImage');
    const blogContent = document.getElementById('blogContent');

    if (blog) {
        blogTitle.textContent = blog.title;
        blogImage.src = blog.url;
        blogContent.innerHTML = blog.content;
    } else {
        // Handle blog not found
        window.location.href = 'index.html';
    }

    
}


function deleteBlog(blogId) {
    // Get blogs from local storage
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    // Find the index of the blog with the given ID
    const blogIndex = blogs.findIndex(blog => blog.id === blogId);

    if (blogIndex !== -1) {
        // Remove the blog from the array
        blogs.splice(blogIndex, 1);

        // Update local storage with the modified blogs array
        localStorage.setItem("blogs", JSON.stringify(blogs));

        // Reload the page to reflect the changes
        window.location.reload();
    } else {
        console.error("Blog not found.");
    }
}

function updateBlog(blogId) {
    window.location.href = `blog.html?id=${blogId}`;
    // Redirect the user to blog.html with the specific blogId in the URL for editing

}
