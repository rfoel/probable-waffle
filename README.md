<img src="static/favicon.png" style="display: block; margin: 0 auto; width: 200px;" />

# Probable Waffle

The live project can be accessed here: https://probable-waffle.herokuapp.com

## Goal

This project is part of the front-end test assignment from Gympass. The goal is to connect to the GitHub API and fetch user and repositories data and display to the viewer. Also, there were a few bonus tasks like: use some modern css solution, endless scrolling for the commits page, make it possible to change the order the repositories are shown, component library, and server side rendering.

## Techlonogies used

These are the main frameworks/packages used in the project:

- [React](https://github.com/facebook/react);
- [Next.js](https://github.com/zeit/next.js) for server side rendeing;
- [styled-components](https://github.com/styled-components/styled-components) for modern css solution;
- [Rematch](https://github.com/rematch/rematch) for state management;
- [Rebase](https://github.com/rebasejs/rebase) for component library;
- [GraphQL](https://graphql.org/) for accessing the GitHub API;

## Tasks

The main tasks were completed using GraphQL to access the GitHub API. The commits are being displayed within the user/repository page and the search is being done with a simple array filter. I tried to fetch the commits with GraphQL but I guess it's not possible. So the filter will work for the fetched commits only.

I've completed all the bonus tasks. The component library I used for the project ([Rebase](https://github.com/rebasejs/rebase)) is my own and the documentation for it can be found here: [https://rebasejs.com](https://rebasejs.com).

The endless scrolling was added for user repositories and the commits for a single repository.

The repositories can be rearranged by last updated or stars. They can be filtered by a term.

The ES6 features used don't need to be mentioned because they are all around the project like: default parameters, template literals, multi-line strings, let and const, array mapping and filtering, arrow functions, etc.

I did not write unit tests because I'm not really used to and the component library I used ([Rebase](https://github.com/rebasejs/rebase)) has unit tests, so I kinda wrote but not for this project.

## Running locally

It is a simple Express server, so basically run:

```sh
    yarn install
```

and then

```sh
    yarn start
```

The project will be available at `http://localhost:7777`.
