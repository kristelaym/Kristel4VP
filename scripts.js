document.addEventListener("DOMContentLoaded", async () => {
    const postsContainer = document.getElementById("posts");

    // List of blog posts
    const posts = ["campaign-intro.md", "tif-question1.md","tif-question2.md","tif-question3.md","tif-question4.md","tif-question5.md","tif-question6.md"];

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

async function searchPosts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const posts = ["campaign-intro.md", "tif-question1.md","tif-question2.md","tif-question3.md","tif-question4.md","tif-question5.md","tif-question6.md"];
    for (const post of posts) {
        const response = await fetch(post);
        const text = await response.text();
        if (text.toLowerCase().includes(query)) {
            const resultItem = document.createElement('div');
            resultItem.innerHTML = `<p>Found in: <a href="${post}">${post}</a></p>`;
            resultsDiv.appendChild(resultItem);
        }
    }
}
