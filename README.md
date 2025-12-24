# Stacked bar chart, horizontal

https://observablehq.com/@d3/stacked-horizontal-bar-chart/2@630

View this notebook in your browser by running a web server in this folder. For
example:

~~~sh
npx http-server
~~~

Or, use the [Observable Runtime](https://github.com/observablehq/runtime) to
import this module directly into your application. To npm install:

~~~sh
npm install @observablehq/runtime@5
npm install https://api.observablehq.com/d/d259645c21da6532@630.tgz?v=3
~~~

Then, import your notebook and the runtime as:

~~~js
import {Runtime, Inspector} from "@observablehq/runtime";
import define from "@d3/stacked-horizontal-bar-chart/2";
~~~

To log the value of the cell named “foo”:

~~~js
const runtime = new Runtime();
const main = runtime.module(define);
main.value("foo").then(value => console.log(value));
~~~

## Deploying to GitHub Pages

This repository includes a GitHub Actions workflow that publishes the static files in this folder to GitHub Pages whenever changes are pushed to the `main` or `work` branches.

1. In your repository settings, enable **Pages** with the **GitHub Actions** source.
2. Push to `main` (or `work`) to trigger the deployment workflow.
3. The workflow uploads the contents of the repository root as the site artifact and deploys it to GitHub Pages.
