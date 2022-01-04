'use strict';

const { Ordered } = require( './ordered.js' );

class Project {
    constructor() {
        this.features  = new Ordered();
        this.artifacts = new Ordered();
    }
    addFeature(opt={}) {
        const item = new Feature(opt);
        this.features.set( item, opt.index );
        return this;
    }
    addArtifact(opt={}) {
        const item = new Artifact(opt);
        this.artifacts.set( item, opt.index );
        return this;
    }
    getFeatures() {
        return this.features.list();
    }
    getArtifacts() {
        return this.artifacts.list();
    }
    link(feature, artifact, remove=false) {
        const f = this.features.get(feature);
        const a = this.artifacts.get(artifact);
        if (f && a)
            a.addFeature(f, remove);
    }
}


/* create independent uniq id sequences for stuffs */
function autoInc (n=0) {
    return function(seed) {
        if (!seed)
            return ++n;
        if (seed > n)
            n = seed;
        return seed;
    }
}

const featSeq = autoInc();
class Feature {
    constructor(opt = {}) {
        this.id    = featSeq(opt.id);
        this.name  = opt.name;
        this.cost  = opt.cost || 1;
        this.deps  = {};
        this.arts  = {}; // used by
    }
}

const artSeq = autoInc();
class Artifact {
    constructor(opt = {}) {
        this.id    = artSeq(opt.id);
        this.name  = opt.name;
        this.feats = {};
    }
    cost() {
        return Object.values(this.feats).reduce( (a,b) => a + b.cost, 0 );
    }
    addFeature(feat, remove=false) {
        if (remove) {
            delete feat.arts[this.id];
            delete this.feats[feat.id];
        } else {
            feat.arts[this.id] = this;
            this.feats[feat.id] = feat;
        };
        return this;
    }
}

module.exports = { Project, Feature, Artifact };

