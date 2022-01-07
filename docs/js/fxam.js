/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nconst { Project } = __webpack_require__( /*! ./project.js */ \"./lib/project.js\" );\n\nwindow.Project = Project;\n\n\n//# sourceURL=webpack://fxam/./lib/index.js?");

/***/ }),

/***/ "./lib/ordered.js":
/*!************************!*\
  !*** ./lib/ordered.js ***!
  \************************/
/***/ ((module) => {

eval("\n/* a set if items with ids that preserves order */\nclass Ordered {\n    constructor() {\n        this.data = {};\n        this.index = [];\n    }\n    set(item, place) {\n        // figure out moving\n        if (place !== undefined) {\n            // known, place      => delete + insert\n            if (this.data[item.id])\n                this.index.splice(this.index.indexOf(item.id), 1);\n            // unknown, place    => insert\n            this.index.splice(place, 0, item.id);\n        } else if( !this.data[item.id] ) {\n            // unknown, no place => place = last\n            this.index.push( item.id );\n        } else {\n            // known, no place   => do nothing\n        }\n\n        // easy part\n        this.data[item.id] = item;\n        return this;\n    }\n    get(id) {\n        return this.data[id];\n    }\n    list() {\n        return this.index.map( n => this.data[n] );\n    }\n    remove(id) {\n        if( this.data[id] ) {\n            this.index.splice( this.index.indexOf(id), 1 );\n            delete this.data[id];\n        }\n        return this;\n    }\n    indexOf(item) {\n        for( let i = 0; i<this.index.length; i++ )\n            if( this.data[ this.index[ i ]] === item )\n                return i;\n        return -1;\n    }\n    nth(n) {\n        // TODO name!\n        return this.data[ this.index[ n ]];\n    }\n    length() {\n        return this.index.length;\n    }\n}\n\nmodule.exports = { Ordered };\n\n\n//# sourceURL=webpack://fxam/./lib/ordered.js?");

/***/ }),

/***/ "./lib/project.js":
/*!************************!*\
  !*** ./lib/project.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nconst { Ordered } = __webpack_require__( /*! ./ordered.js */ \"./lib/ordered.js\" );\n\nclass Project {\n    constructor() {\n        this.features  = new Ordered();\n        this.artifacts = new Ordered();\n    }\n    addFeature(opt={}) {\n        const item = new Feature(opt);\n        this.features.set( item, opt.index );\n        return item;\n    }\n    addArtifact(opt={}) {\n        const item = new Artifact(opt);\n        this.artifacts.set( item, opt.index );\n        return item;\n    }\n    getFeatures() {\n        return this.features.list();\n    }\n    getArtifacts() {\n        return this.artifacts.list();\n    }\n    link(feature, artifact, remove=false) {\n        const f = this.features.get(feature);\n        const a = this.artifacts.get(artifact);\n        if (f && a)\n            a.addFeature(f, remove);\n    }\n    indexOf(item) {\n        if (item instanceof Feature) {\n            return this.features.indexOf(item);\n        }\n        if (item instanceof Artifact) {\n            return this.artifacts.indexOf(item);\n        }\n        throw new Error('Don\\'t know how to look for '+item);\n    }\n}\n\n\n/* create independent uniq id sequences for stuffs */\nfunction autoInc (n=0) {\n    return function(seed) {\n        if (!seed)\n            return ++n;\n        if (seed > n)\n            n = seed;\n        return seed;\n    }\n}\n\nconst featSeq = autoInc();\nclass Feature {\n    constructor(opt = {}) {\n        this.id    = featSeq(opt.id);\n        this.name  = opt.name ?? 'Feature #'+this.id;\n        this.cost  = opt.cost || 1;\n        this.deps  = {};\n        this.arts  = {}; // used by\n        this.elem  = opt.elem;\n    }\n}\n\nconst artSeq = autoInc();\nclass Artifact {\n    constructor(opt = {}) {\n        this.id    = artSeq(opt.id);\n        this.name  = opt.name ?? 'Artifact #'+this.id;\n        this.feats = {};\n        this.elem  = opt.elem;\n    }\n    cost() {\n        return Object.values(this.feats).reduce( (a,b) => a + b.cost, 0 );\n    }\n    addFeature(feat, remove=false) {\n        if (remove) {\n            delete feat.arts[this.id];\n            delete this.feats[feat.id];\n        } else {\n            feat.arts[this.id] = this;\n            this.feats[feat.id] = feat;\n        };\n        return this;\n    }\n    hasFeature(feat) {\n        return this.feats[ feat.id ] === feat;\n    }\n}\n\nmodule.exports = { Project, Feature, Artifact };\n\n\n\n//# sourceURL=webpack://fxam/./lib/project.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./lib/index.js");
/******/ 	
/******/ })()
;