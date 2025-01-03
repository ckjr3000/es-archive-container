# Electric Spring Festival Archive

This website was created to contain the archive of Huddersfield University's Electric Spring Festival.

It was built with Eleventy Static Site Generator, and is hosted on GitHub Pages.

## Data

The current latest version of the festival archive is stored as a MySQL database.

The 'data' folder in this repository contains scripts needed to transform the data into Markdown files, stored as 'posts' in the site repo, and rendered to HTML at build time.

    - 'query.sql' when run on the db pulls out every *performance* and its associated fields. The results of this query can be exported as csv ('all_performances.csv').
    - 'script.py' takes 'all_performances.csv' and outputs each performance as a numbered .md file in the 'output folder'.
    - These are manually copied across to 'posts' in 'src' folder.

## Eleventy

### Developing

#### Add new posts

#### Add css

### Pushing Changes
