document.addEventListener("DOMContentLoaded", async () => {
    const postsContainer = document.getElementById("posts");

    // List of blog posts
    const posts = ["campaign-intro.md", "tif-question1.md", "tif-question2.md", "tif-question3.md", "tif-question4.md", "tif-question5.md", "tif-question6.md"];

    for (let post of posts) {
        try {
            let response = await fetch(`posts/${post}`);
            if (!response.ok) throw new Error(`Failed to fetch ${post}`);
            let text = await response.text();
            let html = marked.parse(text); // Convert Markdown to HTML
            let postDiv = document.createElement("div");
            postDiv.classList.add("blog-post");
            postDiv.dataset.content = text.toLowerCase(); // Store the text content in a data attribute for filtering
            postDiv.innerHTML = html;
            postsContainer.appendChild(postDiv);
        } catch (error) {
            console.error(error);
        }
    }
});

function searchPosts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const postsContainer = document.getElementById("posts");
    const posts = postsContainer.getElementsByClassName("blog-post");

    for (let post of posts) {
        if (post.dataset.content.includes(query)) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    }
}
