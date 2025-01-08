# Electric Spring Festival Archive

This website was created to contain the archive of [Huddersfield University's Electric Spring Festival]('https://electricspring.co.uk/').

It was built with [Eleventy Static Site Generator]('https://www.11ty.dev/'), and can be hosted for free via GitHub Pages.

## Data

The current latest version of the festival archive is stored as a MySQL database.

The 'data' folder in this repository contains scripts needed to transform the data into Markdown files, stored as 'posts' in the site repo, and rendered to HTML at build time.

- 'query.sql' when run on the db pulls out every **performance** and its associated fields. The results of this query can be exported as csv ('all_performances.csv').
- 'script.py' takes 'all_performances.csv' and outputs each performance as a numbered .md file in the 'output folder'.
- These are manually copied across to 'posts' in 'src' folder.

## Eleventy

### Prerequisites

- Eleventy requires Node.js 18
- Node Package Manager (npm) is required to install and manage dependencies

### Developing

To initialise the project, in the directory root, run:

    'npm init'

To start a development server run:

    'npm run serve'

To build the site run:

    'npm run build'

#### Add new posts

To add a new entry to the archive, create a new .md file in src/posts/

The content of every post is set in the **front matter**, rather than the **body** of each post.

The front matter is everything between the two dashed lines at the top of the page.

    Example:

    ---
    performance: "Sylvain Pohu - L'identité"
    isPremiere: null
    concert: "Percussion and Electronics - Damien Harron"
    work: "L'identité"
    isCommission: false
    isResidency: true
    work_year: "2007"
    ensemble: null
    season: "GEMDays 2008"
    venue: "St-Paul's Hall"
    person: null
    country: null
    ---

'null' fields do not need to be explicitly included.

#### Styling

The website is currently completely unstyled. To apply css follow these steps:

    1. Create CSS file(s)

        - inside a dedicated folder in 'src' create your required .css files

    2. Add pass through

        - in .eleventy.js, inside the module.exports function, add a pass through copy directed to the location of the .css files
        - the method looks in the src folder first, so just the css folder name is necessary

            module.exports = function(eleventyConfig) {

                eleventyConfig.addCollection("searchIndex", function(collectionApi) {
                return collectionApi.getAll();
                });

                eleventyConfig.addPassthroughCopy('css');

                return {
                dir: {
                    input: "src",
                    output: "_site"
                }
                }
            };

    3. Import

        - Go to the global layout file
            - src/_includes/layout.njk
        - Link all css files with a link tag inside the document head, this will apply styles globally across the site

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Electric Spring Archive</title>
                <link rel="stylesheet" href="/css/global.css">
                <script src="https://unpkg.com/lunr/lunr.js"></script>
            </head>

You will probably want to add ids/classes to the site HTML for styling purposes.
The HTML in this project is broken up 4 njk files:

    - src/_includes/layout.njk contains the head of every page, plus a navigation header, and a <main></main> that wraps around all other content.
    - src/_includes/post.njk describes the layout of individual posts
    - src/index.njk describes the layout of the home page
    - src/search.njk controls the layout of the search page

### Deployment

Eleventy builds to a completely static site that can be hosted for free on GitHub Pages, Netflify, or similiar services.
