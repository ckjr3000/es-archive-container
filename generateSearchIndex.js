const fs = require("fs");
const path = require("path");

function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach(function (file) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      filelist = walkSync(filePath, filelist);
    } else {
      filelist.push(filePath);
    }
  });
  return filelist;
}

function extractBodyContent(html) {
  const bodyMatch = html.match(/<h2[^>]*>((.|[\n\r])*)<\/h2>/im);
  return bodyMatch ? bodyMatch[1].replace(/<[^>]+>/g, "") : "";
}

function generateSearchIndex() {
  const postsDir = path.join(__dirname, "_site", "posts"); // Target only the _site/posts directory
  const htmlFiles = walkSync(postsDir).filter((file) =>
    file.endsWith("index.html")
  ); // Filter HTML files in _site/posts
  const searchData = [];

  htmlFiles.forEach((file) => {
    const content = fs.readFileSync(file, "utf8");
    const bodyContent = extractBodyContent(content);
    const relativeUrl = path.relative(postsDir, file);
    const url = `/posts/${relativeUrl}`.replace(/index\.html$/, ""); // Construct the URL relative to /posts/

    searchData.push({
      title: path.basename(path.dirname(file)), // Use the directory name as the title
      url: url,
      performance: bodyContent,
    });
  });

  const outputFilePath = path.join(__dirname, "_site", "search.json");
  fs.writeFileSync(outputFilePath, JSON.stringify(searchData, null, 2));
}

generateSearchIndex();
