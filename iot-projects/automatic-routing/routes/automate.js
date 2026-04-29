// first line
const express = require("express");

function createRouter(rootResource) {
  let router = express.Router();
  // call generateRoute here
  generateRoute(router, rootResource);
  return router;
}

function generateRoute(router, resource) {
  if (resource.link) {
    router.route(resource.link).get(function (req, res, next) {
      // callback function content here
      var links = populateLinks(resource);
      res.links(links);
      req.links = links;
      req.result = resource;
      next();
    });
  }
  for (var key in resource) {
    var value = resource[key];
    if (typeof value === "object") {
      generateRoute(router, value);
    }
  }
}

function populateLinks(resource) {
  var linkObject = {};
  for (key in resource) {
    if (typeof resource.key === "object") {
      var subResource = resource.key;
      if (subResource.link) {
        linkObject.subResource.name = subResource.link;
      }
    }
  }
  return linkObject;
}

// last line
module.exports = createRouter;
