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
        return item;
    }
    addArtifact(opt={}) {
        const item = new Artifact(opt);
        this.artifacts.set( item, opt.index );
        return item;
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
    indexOf(item) {
        if (item instanceof Feature) {
            return this.features.indexOf(item);
        }
        if (item instanceof Artifact) {
            return this.artifacts.indexOf(item);
        }
        throw new Error('Don\'t know how to look for '+item);
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
        this.name  = opt.name ?? 'Feature #'+this.id;
        this.cost  = opt.cost || 1;
        this.deps  = {};
        this.arts  = {}; // used by
        this.elem  = opt.elem;
    }
}

const artSeq = autoInc();
class Artifact {
    constructor(opt = {}) {
        this.id    = artSeq(opt.id);
        this.name  = opt.name ?? 'Artifact #'+this.id;
        this.feats = {};
        this.elem  = opt.elem;
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
    hasFeature(feat) {
        return this.feats[ feat.id ] === feat;
    }
}

module.exports = { Project, Feature, Artifact };

