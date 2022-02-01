// const { createProxyMiddleware } = require('http-proxy-middleware');

// const BASE_URL = `http://localhost:3005`;

// module.exports = function(app) {

//     // fetching users
//     app.use(
//         '/users',
//         createProxyMiddleware({
//         target: BASE_URL,
//         changeOrigin: true,
//         })
//     );

//     // fetching experiences
//     app.use(
//         '/exps/:id',
//         createProxyMiddleware({
//           target: BASE_URL,
//           changeOrigin: true,
//         })
//     );

//     // fetching educations
//     app.use(
//       '/educs/:id',
//       createProxyMiddleware({
//         target: BASE_URL,
//         changeOrigin: true,
//       })
//   );

//     // fetching friendships
//     app.use(
//       '/friendship/:id',
//       createProxyMiddleware({
//         target: BASE_URL,
//         changeOrigin: true,
//       })
//   );

//   // fetching others
//   app.use(
//     '/users/others',
//     createProxyMiddleware({
//       target: BASE_URL,
//       changeOrigin: true,
//     })
// );
// };