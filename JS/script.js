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


    const oldblogId = getQueryParam('id');
    const oldblog = getBlogById(oldblogId);
    if(oldblog){
        document.getElementById("editor").innerHTML=oldblog.content;
        document.getElementById("title").value=oldblog.title; 
    }

    const saveBtn=document.getElementById("saveblogbtn");
    saveBtn.addEventListener("click",saveBlog)


        const url = 'https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '613e5f48b5mshb5bc8c987ced152p1c6567jsnd24e699e5ec5',
                'X-RapidAPI-Host': 'neutrinoapi-bad-word-filter.p.rapidapi.com'
            },
            body: new URLSearchParams({
                content: "",
                'censor-character': '*'
            })
        };
        

        
    


async function saveBlog(){

    const title = document.getElementById("title").value; 
    console.log(title)
    options.body=new URLSearchParams({
        content: title,
        'censor-character': '*'
    })
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result["is-bad"]);
        const flag=(result["is-bad"]);
        if(flag){
            alert("Nsfw content found in Title");
            return;
        }
    } catch (error) {
        console.error(error);
        return null;
    }



    const content = document.getElementById("editor").innerHTML; 
    const contentText=document.getElementById("editor").textContent;
    console.log(contentText)
    options.body=new URLSearchParams({
        content: contentText,
        'censor-character': '*'
    });
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result["is-bad"]);
        const flag=(result["is-bad"]);
        if(flag){
            alert("Nsfw content found in Content");
            return;
        }
    } catch (error) {
        console.error(error);
        return null;
    }


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
        // console.log(img.url)
        });
    }
    // console.log(img.url)
    if(oldblog){
        deleteBlog(oldblog.id)
    }
    window.location.href = "../index.html";
    }

}


else if (window.location.href.includes('index.html')){
    const blogsContainer = document.getElementById("blogs");
    function displayBlogs() {
        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        console.log(blogs)
        blogsContainer.innerHTML = "";
        blogs.forEach(blog => {
            const blogDiv = document.createElement("div");
            const btnsDiv = document.createElement("div");
            blogDiv.className = "blogCards";
            btnsDiv.className = "blogCardsbtns";
    
            // Create a clickable link for each blog card
            const blogLink = document.createElement("a");
            blogLink.href = `../HTML/view.html?id=${blog.id}`;
            blogLink.target="blank";
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
        window.location.href = '../index.html';
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
    window.location.href = `HTML/blog.html?id=${blogId}`;
    // Redirect the user to blog.html with the specific blogId in the URL for editing

}


