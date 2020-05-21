// exports.onCreatePage = async ({ page, actions }) => {
//   const { createPage } = actions
//   console.log("I got");
//   console.log(page.path);
  
//   // Only update the `/app` page.
//   if (page.path.match(/^\/app/)) {
//     // page.matchPath is a special key that's used for matching pages
//     // with corresponding routes only on the client.
//     page.matchPath = "/app/*"
//     // Update the page.
//     createPage(page)
//   }
// }
