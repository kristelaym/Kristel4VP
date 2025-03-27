document.addEventListener("DOMContentLoaded", async () => {
    const postsContainer = document.getElementById("posts");

    // List of blog posts
    const posts = ["campaign-intro.md"];

    for (let post of posts) {
        try {
            let response = await fetch(`posts/${post}`);
            if (!response.ok) throw new Error(`Failed to fetch ${post}`);
            let text = await response.text();
            let html = marked.parse(text); // Convert Markdown to HTML
            let postDiv = document.createElement("div");
            postDiv.classList.add("blog-post");
            postDiv.innerHTML = html;
            postsContainer.appendChild(postDiv);
        } catch (error) {
            console.error(error);
        }
    }
});
