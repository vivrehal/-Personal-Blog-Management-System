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



function saveBlog(){
    const title = quill.getText(0, 50); 
    const content = quill.root.innerHTML; 
    const cover=document.getElementById("cover");
    const reader = new FileReader();
    const img={url:"https://images.pexels.com/photos/18786198/pexels-photo-18786198/free-photo-of-a-ladder-is-leaning-against-a-wall-in-the-sun.jpeg"};
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const blog = { title, content, ...img};
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


    // window.location.href = "index.html";
}
}
else if (window.location.href.includes('index.html')){
    const blogsContainer = document.getElementById("blogs");
    function displayBlogs() {
        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        blogsContainer.innerHTML = "";
        blogs.forEach(blog => {
            const blogDiv = document.createElement("div");
            blogDiv.className="blogCards"
            blogDiv.innerHTML = `<h2>${blog.title}</h2><img src=${blog.url}><p>${blog.content}</p>`;
            blogsContainer.appendChild(blogDiv);
        });
    }
    
    displayBlogs();
}
